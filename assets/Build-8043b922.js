import{g as le,r as s,j as a,i as v,_ as se,S as z,X as B,M as re,T as ne,a as oe,G as ie,I as O,b as de}from"./index-3c943830.js";import{M as E,D as ce,i as ue,T as me,H as fe,a as pe}from"./MedalView-07c12273.js";var xe=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],o=0;o<e.rangeCount;o++)r.push(e.getRangeAt(o));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(p){e.addRange(p)}),t&&t.focus()}},he=xe,F={"text/plain":"Text","text/html":"Url",default:"Text"},ge="Copy to clipboard: #{key}, Enter";function ve(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function ye(e,t){var r,o,p,h,f,n,g=!1;t||(t={}),r=t.debug||!1;try{p=he(),h=document.createRange(),f=document.getSelection(),n=document.createElement("span"),n.textContent=e,n.ariaHidden="true",n.style.all="unset",n.style.position="fixed",n.style.top=0,n.style.clip="rect(0, 0, 0, 0)",n.style.whiteSpace="pre",n.style.webkitUserSelect="text",n.style.MozUserSelect="text",n.style.msUserSelect="text",n.style.userSelect="text",n.addEventListener("copy",function(m){if(m.stopPropagation(),t.format)if(m.preventDefault(),typeof m.clipboardData>"u"){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var y=F[t.format]||F.default;window.clipboardData.setData(y,e)}else m.clipboardData.clearData(),m.clipboardData.setData(t.format,e);t.onCopy&&(m.preventDefault(),t.onCopy(m.clipboardData))}),document.body.appendChild(n),h.selectNodeContents(n),f.addRange(h);var M=document.execCommand("copy");if(!M)throw new Error("copy command was unsuccessful");g=!0}catch(m){r&&console.error("unable to copy using execCommand: ",m),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),g=!0}catch(y){r&&console.error("unable to copy using clipboardData: ",y),r&&console.error("falling back to prompt"),o=ve("message"in t?t.message:ge),window.prompt(o,e)}}finally{f&&(typeof f.removeRange=="function"?f.removeRange(h):f.removeAllRanges()),n&&document.body.removeChild(n),p()}return g}var we=ye;const be=le(we);function je({title:e,titleId:t,...r},o){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{fillRule:"evenodd",d:"M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z",clipRule:"evenodd"}))}const Me=s.forwardRef(je),U=Me;function Se({title:e,titleId:t,...r},o){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{d:"M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z"}))}const Ce=s.forwardRef(Se),ke=Ce;function Ne({title:e,titleId:t,...r},o){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":t},r),e?s.createElement("title",{id:t},e):null,s.createElement("path",{fillRule:"evenodd",d:"M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0 1 14.75 19h-9.5A2.25 2.25 0 0 1 3 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 0 1 9 1h2c1.373 0 2.531.923 2.887 2.182ZM7.5 4A1.5 1.5 0 0 1 9 2.5h2A1.5 1.5 0 0 1 12.5 4v.5h-5V4Z",clipRule:"evenodd"}))}const De=s.forwardRef(Ne),Ee=De,Re=e=>{const t=()=>{let r=!1,o=e.medals;for(let p of o)if(!v(p)){r=!0;break}return r};return a.jsx(a.Fragment,{children:a.jsxs("div",{id:"medal-set",className:"relative cutBottomPrimary",children:[a.jsxs("div",{className:"flex justify-center items-center gap-x-2 gap-y-2 lg:gap-8 lg:px-8 medalInner",children:[a.jsx(E,{name:"Medal1",editMedal:e.modifyMedal,displayPrimary:!1,deleteMedal:e.removeMedal,position:0,medal:e.medals[0]}),a.jsx(E,{name:"Medal2",editMedal:e.modifyMedal,displayPrimary:!1,deleteMedal:e.removeMedal,position:1,medal:e.medals[1]}),a.jsx(E,{name:"Medal3",editMedal:e.modifyMedal,displayPrimary:!1,deleteMedal:e.removeMedal,position:2,medal:e.medals[2]})]}),a.jsxs("div",{className:`flex justify-end items-center cursor-pointer translate-y-8 px-2 font-bold ${t()?"":"hidden"}`,onClick:e.emitSaveDrop,children:[a.jsx(U,{className:"bookmark-light"}),"Save"]})]})})},Te=s.lazy(()=>se(()=>import("./MedalList-0199ac1b.js"),["assets/MedalList-0199ac1b.js","assets/index-3c943830.js","assets/index-b3766752.css","assets/MedalView-07c12273.js"])),Ae=()=>{const[e,t]=s.useState([{},{},{}]),[r,o]=s.useState({}),[p,h]=s.useState(!1),[f,n]=s.useState(!1),[g,M]=s.useState(!1),[m,y]=s.useState(!1),[V,R]=s.useState(!1),b=s.useRef(""),[S,C]=s.useState(""),[H,Z]=s.useState(!0),k=()=>{let l=[];for(let i in localStorage){let u=JSON.parse(localStorage.getItem(i));if(!v(u)){let d={name:i,medals:u};l.push(d)}}return l},[T,_]=s.useState(k),G=(l,i)=>{J(l.id)?t(u=>u.map((d,x)=>x===i.position?l:d)):console.log("medal already exists in set")};function J(l){let i=!0,u=e;for(let d=0;d<u.length;d++)if(u[d]&&u[d].id===l){i=!1;break}return i}function X(l){t(i=>i.map((u,d)=>d===l?{}:u))}async function K(){R(!0),be(b.current),await oe(1e3),R(!1)}function W(l){o({...e[l],position:l}),h(!0)}function Y(l,i,u){const d=e.map((x,w)=>w==u?{...x,set_traits:l,set_traits_values:i}:x);t(d),I()}function q(){C(S),localStorage.setItem(S,JSON.stringify(e)),_(k)}function N(){console.log(JSON.stringify(e)),y(!m)}function I(){h(!1)}function A(){n(!f)}async function L(){$(!0),M(!g)}function Q(l,i){C(i),t(l),A()}function ee(l){localStorage.removeItem(l),_(k)}function $(l){let u="/opbr-meddlr/#/share?medals=",d="",x="",w="";for(let c=0;c<e.length;c++)if(!v(e[c])){let j=ie(e[c].id);u+=c>e.length-2?O(j):`${O(j)}g`}if(l)for(let c=0;c<3;c++)v(e[0])?d+="zz":d+=D(e[0].set_traits[c],e[0].set_traits_values[c]),v(e[1])?x+="zz":x+=D(e[1].set_traits[c],e[1].set_traits_values[c]),v(e[2])?w+="zz":w+=D(e[2].set_traits[c],e[2].set_traits_values[c]);function D(c,j){const P=de(c,j);return P||"zz"}const ae="&t="+d+x+w,te=window.location.href.substring(0,window.location.href.indexOf(window.location.pathname));b.current=te+u+ae}return a.jsx(s.Suspense,{fallback:a.jsx(z,{}),children:a.jsxs("div",{className:"flex",children:[a.jsxs("div",{className:"flex flex-col",children:[a.jsxs("div",{className:"justify-center items-center side-icon-tab",children:[a.jsx(U,{className:"sidecon",onClick:A}),a.jsx(ke,{className:"sidecon",onClick:L})]}),a.jsxs("div",{className:`flex fixed flex-col items-end focus-dropdown ${g&&"drop-appear"}`,children:[a.jsxs("div",{className:"flex w-full justify-between",children:[a.jsxs("div",{className:"flex flex-row toolbar",children:[a.jsx("input",{className:"rounded-sm transparent",type:"checkbox",checked:H,onChange:l=>{Z(l.target.checked),$(l.target.checked)}}),a.jsx("span",{className:"text-xs px-1",children:"include traits"})]}),a.jsx(B,{className:"cursor-pointer -translate-y-2 icon-small-grey",onClick:l=>{L(),l.currentTarget.classList.remove("flash-slow")}})]}),a.jsxs("div",{className:"flex items-center p-0",children:[a.jsx(Ee,{className:`rounded-xl cursor-pointer icon-small-primary ${V?"flash-slow":""}`,onClick:K}),a.jsx("input",{className:"rounded-lg",ref:b,value:b.current,readOnly:!0})]})]})]}),a.jsx("div",{className:`flex flex-col gap-y-2 rounded-md phalange ${f&&"show-phalange"}`,children:T.length>0?T.map((l,i)=>a.jsx(re,{emitLoad:Q,deleteSet:ee,medals:l.medals,name:l.name},i)):a.jsx("div",{class:"text-primary text-center py-10",children:"You have no medals saved"})}),a.jsx(ce,{backend:ue?me:fe,children:a.jsxs("div",{className:`flex flex-col overflow-hidden lg:overflow-x-auto md:flex-row justify-center rounded-md p-2 gap-4 w-full main-content ${f&&" push-right"}`,children:[a.jsxs("div",{id:"medal-set-card",className:"flex flex-col max-h-[400px] md:max-h-[650px] lg:max-[800px] gap-y-4 cutTop",children:[a.jsx("div",{className:`absolute h-4/6 h-3/4 md:h-3/5 z-20 modal ${p?"showModal":"hideModal"}`,children:a.jsx(pe,{edit:!0,saveMedalTraits:Y,medal:r,closeWindow:I})}),a.jsxs("div",{className:`flex flex-col fixed justify-end translate-x-32 translate-y-12 focus-dropdown ${m?"drop-appear":""}`,children:[a.jsxs("div",{className:"flex justify-between",children:[a.jsx("span",{className:"text-primary",children:"Set name"}),a.jsx(B,{className:"-translate-y-2 cursor-pointer icon-small-grey",onClick:N})]}),a.jsx("input",{className:"rounded-md",value:S,onChange:l=>C(l.target.value)}),a.jsx("div",{className:"py place-self-center clickable-button",onClick:()=>{q(),N()},children:"Save"})]}),a.jsx(Re,{emitSaveDrop:N,modifyMedal:W,removeMedal:X,medals:e}),a.jsx(ne,{medals:e})]}),a.jsx("div",{className:"lg:w-1/2 max-h-[375px] md:max-h-[650px] lg:max-h-[700px] overflow-y-auto",children:a.jsx(s.Suspense,{fallback:a.jsx(z,{}),children:a.jsx(Te,{dropped:G})})})]})})]})})};export{Ae as default};