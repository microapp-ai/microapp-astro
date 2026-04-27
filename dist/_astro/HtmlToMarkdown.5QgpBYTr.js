import{j as e}from"./jsx-dev-runtime.CRDICgT5.js";import{r as l}from"./index.-ffUvN8g.js";function d(){const[r,n]=l.useState(`<h1>Hello World</h1>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>`),[o,a]=l.useState(""),s=()=>{let t=r.replace(/<h1[^>]*>(.*?)<\/h1>/gi,`# $1
`).replace(/<h2[^>]*>(.*?)<\/h2>/gi,`## $1
`).replace(/<h3[^>]*>(.*?)<\/h3>/gi,`### $1
`).replace(/<h4[^>]*>(.*?)<\/h4>/gi,`#### $1
`).replace(/<h5[^>]*>(.*?)<\/h5>/gi,`##### $1
`).replace(/<h6[^>]*>(.*?)<\/h6>/gi,`###### $1
`).replace(/<strong[^>]*>(.*?)<\/strong>/gi,"**$1**").replace(/<b[^>]*>(.*?)<\/b>/gi,"**$1**").replace(/<em[^>]*>(.*?)<\/em>/gi,"_$1_").replace(/<i[^>]*>(.*?)<\/i>/gi,"_$1_").replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi,"[$2]($1)").replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi,"![$2]($1)").replace(/<code[^>]*>(.*?)<\/code>/gi,"`$1`").replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,"```\n$1\n```").replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,(c,i)=>i.split(`
`).map(m=>"> "+m).join(`
`)).replace(/<li[^>]*>(.*?)<\/li>/gi,"- $1").replace(/<[uo]l[^>]*>/gi,"").replace(/<\/[uo]l>/gi,`
`).replace(/<p[^>]*>(.*?)<\/p>/gi,`$1
`).replace(/<br\s*\/?>/gi,`
`).replace(/<hr\s*\/?>/gi,`---
`).replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/\n{3,}/g,`

`).trim();a(t)};return e.jsxDEV("div",{className:"tool-widget-content",children:e.jsxDEV("div",{className:"space-y-4",children:[e.jsxDEV("textarea",{className:"tool-textarea font-mono",rows:8,value:r,onChange:t=>n(t.target.value),placeholder:"Paste HTML here..."},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:55,columnNumber:9},this),e.jsxDEV("button",{className:"btn-primary",onClick:s,children:"Convert to Markdown"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:56,columnNumber:9},this),o&&e.jsxDEV("div",{children:[e.jsxDEV("div",{className:"flex justify-between items-center mb-2",children:[e.jsxDEV("span",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#1A1A1A"},children:"Markdown output"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:60,columnNumber:15},this),e.jsxDEV("button",{className:"btn-outline",style:{fontSize:"0.8rem",padding:"0.3rem 0.75rem"},onClick:()=>navigator.clipboard.writeText(o),children:"Copy"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:61,columnNumber:15},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:59,columnNumber:13},this),e.jsxDEV("textarea",{className:"tool-textarea font-mono",rows:8,value:o,readOnly:!0},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:63,columnNumber:13},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:58,columnNumber:11},this)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:54,columnNumber:7},this)},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/HtmlToMarkdown.tsx",lineNumber:52,columnNumber:5},this)}export{d as default};
