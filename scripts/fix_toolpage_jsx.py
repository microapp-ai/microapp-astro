"""
fix_toolpage_jsx.py

Replaces the <ToolPage ...props...> JSX wrapper with a simple div wrapper
in all tool component files. This handles the case where the import was
removed but the JSX still references <ToolPage>.

Strategy:
- Find the opening <ToolPage tag and replace the entire opening tag 
  (which may span multiple lines) with <div className="tool-widget-content">
- Replace </ToolPage> with </div>
- Also add a ToolPage shim import if the component still uses ToolPage props

This is the correct approach because:
1. In Astro island mode, the tool widget only needs to render its interactive UI
2. All layout/SEO/breadcrumb/FAQ is handled by ToolLayout.astro
3. The ToolPage props (title, description, etc.) are now in Supabase
"""
import re
from pathlib import Path

TOOLS_DIR = Path("/home/ubuntu/microapp-astro/src/components/tools")

def fix_file(path: Path) -> bool:
    content = path.read_text(encoding='utf-8')
    
    if '<ToolPage' not in content:
        return False  # Nothing to fix
    
    # Step 1: Remove any remaining ToolPage import lines
    content = re.sub(r'^import ToolPage.*?;\n', '', content, flags=re.MULTILINE)
    content = re.sub(r'^import \{ type RelatedTool[^}]*\} from.*?;\n', '', content, flags=re.MULTILINE)
    
    # Step 2: Replace the <ToolPage opening tag (may span multiple lines)
    # Pattern: <ToolPage followed by any props until the closing >
    # We need to handle multi-line prop spreading
    
    lines = content.split('\n')
    result_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this line starts a <ToolPage tag
        if re.search(r'<ToolPage[\s>]', line):
            # Find the end of the opening tag
            # Collect lines until we find the closing >
            tag_lines = [line]
            j = i + 1
            
            # Check if the opening tag is closed on this line
            # Need to handle: <ToolPage ... > (not self-closing)
            # and: <ToolPage ... /> (self-closing, no children)
            
            # Accumulate lines until we find > or />
            combined = line
            while '>' not in combined and j < len(lines):
                tag_lines.append(lines[j])
                combined += '\n' + lines[j]
                j += 1
            
            # Check if it's self-closing
            if '/>' in combined:
                # Self-closing ToolPage - replace with empty div
                result_lines.append('    <div className="tool-widget-content">')
                result_lines.append('    </div>')
                i = j
            else:
                # Opening tag with children - replace with div
                result_lines.append('    <div className="tool-widget-content">')
                i = j
        elif '</ToolPage>' in line:
            # Replace closing tag
            result_lines.append(line.replace('</ToolPage>', '</div>'))
            i += 1
        else:
            result_lines.append(line)
            i += 1
    
    new_content = '\n'.join(result_lines)
    
    # Step 3: Clean up any remaining ToolPage references (e.g., type annotations)
    new_content = re.sub(r'ToolPage\.propTypes.*?\n', '', new_content)
    
    # Step 4: Remove useSEO calls that might still be there
    new_content = re.sub(r'\s*useSEO\([^)]*\);?\n', '\n', new_content)
    
    # Step 5: Remove useTrack declarations
    new_content = re.sub(r'\s*const track = useTrack\(\);?\n', '\n', new_content)
    
    if new_content != path.read_text(encoding='utf-8'):
        path.write_text(new_content, encoding='utf-8')
        return True
    return False

fixed = 0
for tsx_file in sorted(TOOLS_DIR.glob("*.tsx")):
    if fix_file(tsx_file):
        fixed += 1
        print(f"  ✓ Fixed {tsx_file.name}")

print(f"\nFixed {fixed} files")

# Verify no more ToolPage JSX references
remaining = []
for tsx_file in TOOLS_DIR.glob("*.tsx"):
    content = tsx_file.read_text()
    if '<ToolPage' in content or '</ToolPage>' in content:
        remaining.append(tsx_file.name)

if remaining:
    print(f"\nWARNING: {len(remaining)} files still have ToolPage JSX:")
    for f in remaining:
        print(f"  - {f}")
else:
    print("\n✓ No remaining ToolPage JSX references")
