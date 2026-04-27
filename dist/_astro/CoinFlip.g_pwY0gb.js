import{j as e}from"./jsx-dev-runtime.CRDICgT5.js";import{r as i}from"./index.-ffUvN8g.js";const m=()=>{const[o,t]=i.useState(null),[n,s]=i.useState(!1),l=()=>{s(!0),t(null),setTimeout(()=>{const r=Math.random()<.5?"Heads":"Tails";t(r),s(!1)},1500)};return e.jsxDEV("div",{className:"tool-widget-content",children:[e.jsxDEV("div",{className:"flex flex-col items-center justify-center p-4",children:[e.jsxDEV("div",{className:`relative w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-800 shadow-lg transition-transform duration-300 ease-in-out
            ${n?"animate-spin-fast":""}
            ${o==="Heads"?"bg-yellow-300":o==="Tails"?"bg-green-700 text-white":""}
          `,children:n?e.jsxDEV("span",{className:"text-gray-600",children:"?"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:59,columnNumber:13},void 0):o||e.jsxDEV("span",{className:"text-gray-600",children:"Flip Me!"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:61,columnNumber:23},void 0)},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:52,columnNumber:9},void 0),e.jsxDEV("button",{onClick:l,disabled:n,className:`mt-8 px-8 py-3 rounded-lg text-white font-semibold text-lg transition-all duration-200
            ${n?"bg-gray-500 cursor-not-allowed":"bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"}
          `,children:n?"Flipping...":"Flip Coin"},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:65,columnNumber:9},void 0),o&&!n&&e.jsxDEV("p",{className:"mt-6 text-2xl font-semibold text-gray-800",children:["Result: ",e.jsxDEV("span",{className:`${o==="Heads"?"text-yellow-600":"text-green-800"}`,children:o},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:77,columnNumber:21},void 0)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:76,columnNumber:11},void 0)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:51,columnNumber:7},void 0),e.jsxDEV("style",{children:`
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: spin-fast 0.5s linear infinite;
        }
      `},void 0,!1,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:83,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/ubuntu/microapp-astro/src/components/tools/CoinFlip.tsx",lineNumber:50,columnNumber:5},void 0)};export{m as default};
