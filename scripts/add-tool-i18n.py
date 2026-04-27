#!/usr/bin/env python3
"""
add-tool-i18n.py — Generate toolList translations for all 96 tools in all 6 locales
and insert them into each locale's common.ts file.

Usage:
  python3 scripts/add-tool-i18n.py
"""
import os, re, json, time
import urllib.request, urllib.error

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCALES_DIR = os.path.join(BASE, "src/i18n/locales")

# All 96 tools: slug -> { label, desc }
TOOLS = [
    ("word-counter", "Word Counter", "Count words, characters & reading time"),
    ("case-converter", "Case Converter", "UPPER, lower, Title, camelCase & more"),
    ("lorem-ipsum", "Lorem Ipsum", "Generate placeholder text instantly"),
    ("sentence-counter", "Sentence Counter", "Count sentences, paragraphs & more"),
    ("line-break-removal-tool", "Line Break Remover", "Remove or clean up line breaks in text"),
    ("character-counter", "Character Counter", "Count characters with and without spaces"),
    ("palindrome-checker", "Palindrome Checker", "Check if a word or phrase is a palindrome"),
    ("vowel-counter", "Vowel Counter", "Count vowels and consonants in any text"),
    ("text-repeater", "Text Repeater", "Repeat any text N times instantly"),
    ("remove-duplicate-lines", "Remove Duplicate Lines", "Remove duplicate lines from any text"),
    ("sort-lines", "Sort Lines", "Sort lines alphabetically or numerically"),
    ("whitespace-remover", "Whitespace Remover", "Remove extra spaces, tabs, and blank lines"),
    ("reverse-text-generator", "Reverse Text", "Reverse any text or sentence instantly"),
    ("tiny-text-generator", "Tiny Text Generator", "Convert text to tiny Unicode characters"),
    ("text-diff-checker", "Text Diff Checker", "Compare two texts and highlight differences"),
    ("reading-time-calculator", "Reading Time Calculator", "Estimate how long it takes to read any text"),
    ("readability-checker", "Readability Checker", "Check Flesch-Kincaid readability score"),
    ("merge-words", "Merge Words", "Combine two lists of words together"),
    ("word-frequency-counter", "Word Frequency Counter", "Count how often each word appears"),
    ("morse-code", "Morse Code Converter", "Convert text to Morse code and back"),
    ("signature-generator", "Signature Generator", "Create stylish text-based signatures"),
    ("percentage-calculator", "Percentage Calculator", "Calculate percentages, discounts & more"),
    ("unit-converter", "Unit Converter", "Convert between any units of measurement"),
    ("tip-calculator", "Tip Calculator", "Calculate tips and split bills"),
    ("bmi-calculator", "BMI Calculator", "Calculate your Body Mass Index"),
    ("calorie-calculator", "Calorie Calculator", "Estimate daily calorie needs"),
    ("gpa-calculator", "GPA Calculator", "Calculate your Grade Point Average"),
    ("salary-to-hourly", "Salary to Hourly", "Convert annual salary to hourly rate"),
    ("loan-calculator", "Loan Calculator", "Calculate monthly payments and total interest"),
    ("compound-interest-calculator", "Compound Interest Calculator", "Calculate compound interest over time"),
    ("discount-calculator", "Discount Calculator", "Find sale price after discount"),
    ("random-number-generator", "Random Number Generator", "Generate random numbers in any range"),
    ("number-to-words", "Number to Words", "Convert numbers to written words"),
    ("roman-numeral-converter", "Roman Numeral Converter", "Convert between numbers and Roman numerals"),
    ("binary-to-decimal", "Binary to Decimal", "Convert binary, decimal, hex & octal"),
    ("geometric-mean-calculator", "Geometric Mean Calculator", "Calculate the geometric mean of numbers"),
    ("mass-calculator", "Mass Calculator", "Calculate mass from density and volume"),
    ("fuel-cost-calculator", "Fuel Cost Calculator", "Estimate trip fuel costs"),
    ("army-body-fat-calculator", "Army Body Fat Calculator", "Calculate body fat using Army method"),
    ("histogram-maker", "Histogram Maker", "Create histograms from your data"),
    ("temperature-converter", "Temperature Converter", "Convert between Celsius, Fahrenheit & Kelvin"),
    ("weight-converter", "Weight Converter", "Convert between weight units"),
    ("length-converter", "Length Converter", "Convert between length and distance units"),
    ("date-time-calculator", "Date & Time Calculator", "Add or subtract dates and times"),
    ("age-calculator", "Age Calculator", "Calculate exact age in years, months & days"),
    ("days-between", "Days Between Dates", "Count days between two dates"),
    ("age-difference-calculator", "Age Difference Calculator", "Find the age difference between two people"),
    ("countdown-timer", "Countdown Timer", "Count down to any date or event"),
    ("stopwatch", "Stopwatch", "Precise online stopwatch with lap times"),
    ("pomodoro-timer", "Pomodoro Timer", "Focus timer using the Pomodoro technique"),
    ("color-converter", "Color Converter", "Convert between HEX, RGB, HSL & more"),
    ("hex-to-rgb", "HEX to RGB", "Convert HEX color codes to RGB values"),
    ("hex-color-picker", "HEX Color Picker", "Pick and explore hex color codes"),
    ("color-palette-generator", "Color Palette Generator", "Generate beautiful color palettes"),
    ("gradient-generator", "Gradient Generator", "Create CSS gradient backgrounds"),
    ("base64", "Base64 Encoder/Decoder", "Encode and decode Base64 strings"),
    ("json-formatter", "JSON Formatter", "Format, validate and minify JSON"),
    ("url-encoder-decoder", "URL Encoder/Decoder", "Encode and decode URL strings"),
    ("password-generator", "Password Generator", "Generate secure random passwords"),
    ("uuid-generator", "UUID Generator", "Generate random UUIDs instantly"),
    ("md5-hash-generator", "MD5 Hash Generator", "Generate MD5 hashes from text"),
    ("sha256-generator", "SHA-256 Generator", "Generate SHA-256 hashes from text"),
    ("html-encoder-decoder", "HTML Encoder/Decoder", "Encode and decode HTML entities"),
    ("markdown-to-html", "Markdown to HTML", "Convert Markdown to HTML instantly"),
    ("text-to-binary", "Text to Binary", "Convert text to binary code"),
    ("regex-tester", "Regex Tester", "Test and debug regular expressions"),
    ("slug-generator", "Slug Generator", "Generate URL-friendly slugs from text"),
    ("curl-builder", "cURL Builder", "Build cURL commands visually"),
    ("csv-to-json", "CSV to JSON", "Convert CSV data to JSON format"),
    ("json-to-csv", "JSON to CSV", "Convert JSON data to CSV format"),
    ("rem-to-px-converter", "REM to PX Converter", "Convert REM units to pixels"),
    ("css-animation-generator", "CSS Animation Generator", "Generate CSS keyframe animations"),
    ("generate-random-ip", "Random IP Generator", "Generate random IP addresses"),
    ("qr-code-reader", "QR Code Reader", "Read and decode QR codes"),
    ("coin-flip", "Coin Flip", "Flip a virtual coin online"),
    ("dice-roller", "Dice Roller", "Roll virtual dice of any type"),
    ("random-name-generator", "Random Name Generator", "Generate random names instantly"),
    ("random-state-generator", "Random State Generator", "Pick a random US state"),
    ("random-word-generator", "Random Word Generator", "Generate random words instantly"),
    ("goofy-ahh-names-generator", "Goofy Name Generator", "Generate funny goofy names"),
    ("acronym-generator", "Acronym Generator", "Create acronyms from any phrase"),
    ("outline-generator-ai", "AI Outline Generator", "Generate outlines with AI"),
    ("thank-you-note", "Thank You Note Generator", "Write thank you notes with AI"),
    ("ai-joke-generator", "AI Joke Generator", "Generate jokes with AI"),
    ("ai-poem-writer", "AI Poem Writer", "Write poems with AI"),
    ("ai-bio-generator", "AI Bio Generator", "Generate professional bios with AI"),
    ("email-subject-line-generator", "Email Subject Line Generator", "Generate email subject lines with AI"),
    ("hashtag-generator", "Hashtag Generator", "Generate hashtags for social media"),
    ("caption-generator", "Caption Generator", "Generate captions with AI"),
    ("cover-letter-generator", "Cover Letter Generator", "Write cover letters with AI"),
    ("product-description-generator", "Product Description Generator", "Generate product descriptions with AI"),
    ("paraphrasing-tool", "Paraphrasing Tool", "Rewrite text in different words"),
    ("summarizer", "Text Summarizer", "Summarize long text with AI"),
    ("text-to-bullet-points", "Text to Bullet Points", "Convert text to bullet points"),
    ("meeting-agenda-generator", "Meeting Agenda Generator", "Generate meeting agendas with AI"),
    ("email-generator", "Email Generator", "Write professional emails with AI"),
]

LOCALE_NAMES = {
    "es": "Spanish",
    "de": "German",
    "ru": "Russian",
    "hi": "Hindi",
    "ar": "Arabic",
    "pl": "Polish",
}

FORGE_API_URL = os.environ.get("BUILT_IN_FORGE_API_URL", "").rstrip("/")
FORGE_API_KEY = os.environ.get("BUILT_IN_FORGE_API_KEY", "")

def call_llm(prompt: str) -> str:
    url = f"{FORGE_API_URL}/v1/chat/completions"
    payload = json.dumps({
        "messages": [{"role": "user", "content": prompt}],
        "response_format": {"type": "json_object"},
    }).encode()
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {FORGE_API_KEY}",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())
    return data["choices"][0]["message"]["content"]

def translate_tools_for_locale(locale: str, lang_name: str) -> dict:
    """Returns {slug: {label, desc}} for all tools in the given locale."""
    # Build the tools list for the prompt
    tools_json = json.dumps([{"slug": s, "label": l, "desc": d} for s, l, d in TOOLS], indent=2)
    prompt = f"""Translate the following tool names and short descriptions into {lang_name}.
Keep translations concise — labels should be 2-5 words, descriptions 5-10 words.
Preserve technical terms (HTML, CSS, JSON, Base64, MD5, SHA-256, UUID, BMI, GPA, URL, AI, QR, etc.) in their original form.
Return a JSON object with slug as key and an object with "label" and "desc" as value.

Tools to translate:
{tools_json}

Return ONLY valid JSON like:
{{
  "word-counter": {{"label": "...", "desc": "..."}},
  "case-converter": {{"label": "...", "desc": "..."}}
}}"""
    
    result = call_llm(prompt)
    return json.loads(result)

def build_tool_block(translations: dict) -> str:
    """Build the TypeScript toolList block."""
    lines = ["    toolList: {"]
    for slug, label, desc in TOOLS:
        t = translations.get(slug, {})
        tl = t.get("label", label).replace('"', '\\"').replace("'", "\\'")
        td = t.get("desc", desc).replace('"', '\\"').replace("'", "\\'")
        lines.append(f'      "{slug}": {{')
        lines.append(f'        label: "{tl}",')
        lines.append(f'        desc: "{td}",')
        lines.append(f'      }},')
    lines.append("    },")
    return "\n".join(lines)

def insert_block_into_file(filepath: str, block: str):
    """Insert toolList block before the closing '} as const;' line."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Remove existing toolList block if present
    content = re.sub(r'\n    toolList: \{[^}]*(?:\{[^}]*\}[^}]*)*\},\n', '\n', content, flags=re.DOTALL)
    
    # Insert before closing
    marker = "} as const;"
    idx = content.rfind(marker)
    if idx == -1:
        print(f"  WARNING: could not find marker in {filepath}")
        return
    
    insert_pos = content.rfind("\n", 0, idx) + 1
    new_content = content[:insert_pos] + block + "\n" + content[insert_pos:]
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

def build_english_block() -> str:
    """Build English toolList (no translation needed)."""
    lines = ["    toolList: {"]
    for slug, label, desc in TOOLS:
        el = label.replace('"', '\\"').replace("'", "\\'")
        ed = desc.replace('"', '\\"').replace("'", "\\'")
        lines.append(f'      "{slug}": {{')
        lines.append(f'        label: "{el}",')
        lines.append(f'        desc: "{ed}",')
        lines.append(f'      }},')
    lines.append("    },")
    return "\n".join(lines)

def main():
    # First add English (no LLM needed)
    en_path = os.path.join(LOCALES_DIR, "en/common.ts")
    en_block = build_english_block()
    insert_block_into_file(en_path, en_block)
    print("OK: en — toolList block added")

    # Then translate each non-English locale
    for locale, lang_name in LOCALE_NAMES.items():
        print(f"Translating {lang_name} ({locale})...")
        try:
            translations = translate_tools_for_locale(locale, lang_name)
            block = build_tool_block(translations)
            filepath = os.path.join(LOCALES_DIR, f"{locale}/common.ts")
            insert_block_into_file(filepath, block)
            print(f"OK: {locale} — toolList block added ({len(translations)} tools)")
        except Exception as e:
            print(f"ERROR: {locale} — {e}")
        time.sleep(1)

    print("\nDone!")

if __name__ == "__main__":
    main()
