import{r as i,i as C,s as R,w as A,a as j,u as y,b as P,c as L,d as $,e as G,j as s,D as _,g as B,f as K,G as z,S as Y,h as q,k as J}from"./index-180865f7.js";function Q({title:n,titleId:e,...r},t){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":e},r),n?i.createElement("title",{id:e},n):null,i.createElement("path",{fillRule:"evenodd",d:"M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z",clipRule:"evenodd"}))}const V=i.forwardRef(Q),W=V;function X(n){return i.useMemo(()=>n.hooks.dragSource(),[n])}function ee(n){return i.useMemo(()=>n.hooks.dragPreview(),[n])}let M=!1,b=!1;class re{receiveHandlerId(e){this.sourceId=e}getHandlerId(){return this.sourceId}canDrag(){C(!M,"You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return M=!0,this.internalMonitor.canDragSource(this.sourceId)}finally{M=!1}}isDragging(){if(!this.sourceId)return!1;C(!b,"You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return b=!0,this.internalMonitor.isDraggingSource(this.sourceId)}finally{b=!1}}subscribeToStateChange(e,r){return this.internalMonitor.subscribeToStateChange(e,r)}isDraggingSource(e){return this.internalMonitor.isDraggingSource(e)}isOverTarget(e,r){return this.internalMonitor.isOverTarget(e,r)}getTargetIds(){return this.internalMonitor.getTargetIds()}isSourcePublic(){return this.internalMonitor.isSourcePublic()}getSourceId(){return this.internalMonitor.getSourceId()}subscribeToOffsetChange(e){return this.internalMonitor.subscribeToOffsetChange(e)}canDragSource(e){return this.internalMonitor.canDragSource(e)}canDropOnTarget(e){return this.internalMonitor.canDropOnTarget(e)}getItemType(){return this.internalMonitor.getItemType()}getItem(){return this.internalMonitor.getItem()}getDropResult(){return this.internalMonitor.getDropResult()}didDrop(){return this.internalMonitor.didDrop()}getInitialClientOffset(){return this.internalMonitor.getInitialClientOffset()}getInitialSourceClientOffset(){return this.internalMonitor.getInitialSourceClientOffset()}getSourceClientOffset(){return this.internalMonitor.getSourceClientOffset()}getClientOffset(){return this.internalMonitor.getClientOffset()}getDifferenceFromInitialOffset(){return this.internalMonitor.getDifferenceFromInitialOffset()}constructor(e){this.sourceId=null,this.internalMonitor=e.getMonitor()}}class te{receiveHandlerId(e){this.handlerId!==e&&(this.handlerId=e,this.reconnect())}get connectTarget(){return this.dragSource}get dragSourceOptions(){return this.dragSourceOptionsInternal}set dragSourceOptions(e){this.dragSourceOptionsInternal=e}get dragPreviewOptions(){return this.dragPreviewOptionsInternal}set dragPreviewOptions(e){this.dragPreviewOptionsInternal=e}reconnect(){const e=this.reconnectDragSource();this.reconnectDragPreview(e)}reconnectDragSource(){const e=this.dragSource,r=this.didHandlerIdChange()||this.didConnectedDragSourceChange()||this.didDragSourceOptionsChange();return r&&this.disconnectDragSource(),this.handlerId?e?(r&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragSource=e,this.lastConnectedDragSourceOptions=this.dragSourceOptions,this.dragSourceUnsubscribe=this.backend.connectDragSource(this.handlerId,e,this.dragSourceOptions)),r):(this.lastConnectedDragSource=e,r):r}reconnectDragPreview(e=!1){const r=this.dragPreview,t=e||this.didHandlerIdChange()||this.didConnectedDragPreviewChange()||this.didDragPreviewOptionsChange();if(t&&this.disconnectDragPreview(),!!this.handlerId){if(!r){this.lastConnectedDragPreview=r;return}t&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragPreview=r,this.lastConnectedDragPreviewOptions=this.dragPreviewOptions,this.dragPreviewUnsubscribe=this.backend.connectDragPreview(this.handlerId,r,this.dragPreviewOptions))}}didHandlerIdChange(){return this.lastConnectedHandlerId!==this.handlerId}didConnectedDragSourceChange(){return this.lastConnectedDragSource!==this.dragSource}didConnectedDragPreviewChange(){return this.lastConnectedDragPreview!==this.dragPreview}didDragSourceOptionsChange(){return!R(this.lastConnectedDragSourceOptions,this.dragSourceOptions)}didDragPreviewOptionsChange(){return!R(this.lastConnectedDragPreviewOptions,this.dragPreviewOptions)}disconnectDragSource(){this.dragSourceUnsubscribe&&(this.dragSourceUnsubscribe(),this.dragSourceUnsubscribe=void 0)}disconnectDragPreview(){this.dragPreviewUnsubscribe&&(this.dragPreviewUnsubscribe(),this.dragPreviewUnsubscribe=void 0,this.dragPreviewNode=null,this.dragPreviewRef=null)}get dragSource(){return this.dragSourceNode||this.dragSourceRef&&this.dragSourceRef.current}get dragPreview(){return this.dragPreviewNode||this.dragPreviewRef&&this.dragPreviewRef.current}clearDragSource(){this.dragSourceNode=null,this.dragSourceRef=null}clearDragPreview(){this.dragPreviewNode=null,this.dragPreviewRef=null}constructor(e){this.hooks=A({dragSource:(r,t)=>{this.clearDragSource(),this.dragSourceOptions=t||null,j(r)?this.dragSourceRef=r:this.dragSourceNode=r,this.reconnectDragSource()},dragPreview:(r,t)=>{this.clearDragPreview(),this.dragPreviewOptions=t||null,j(r)?this.dragPreviewRef=r:this.dragPreviewNode=r,this.reconnectDragPreview()}}),this.handlerId=null,this.dragSourceRef=null,this.dragSourceOptionsInternal=null,this.dragPreviewRef=null,this.dragPreviewOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDragSource=null,this.lastConnectedDragSourceOptions=null,this.lastConnectedDragPreview=null,this.lastConnectedDragPreviewOptions=null,this.backend=e}}function ne(n,e){const r=y(),t=i.useMemo(()=>new te(r.getBackend()),[r]);return P(()=>(t.dragSourceOptions=n||null,t.reconnect(),()=>t.disconnectDragSource()),[t,n]),P(()=>(t.dragPreviewOptions=e||null,t.reconnect(),()=>t.disconnectDragPreview()),[t,e]),t}function se(){const n=y();return i.useMemo(()=>new re(n),[n])}class ie{beginDrag(){const e=this.spec,r=this.monitor;let t=null;return typeof e.item=="object"?t=e.item:typeof e.item=="function"?t=e.item(r):t={},t??null}canDrag(){const e=this.spec,r=this.monitor;return typeof e.canDrag=="boolean"?e.canDrag:typeof e.canDrag=="function"?e.canDrag(r):!0}isDragging(e,r){const t=this.spec,a=this.monitor,{isDragging:d}=t;return d?d(a):r===e.getSourceId()}endDrag(){const e=this.spec,r=this.monitor,t=this.connector,{end:a}=e;a&&a(r.getItem(),r),t.reconnect()}constructor(e,r,t){this.spec=e,this.monitor=r,this.connector=t}}function ae(n,e,r){const t=i.useMemo(()=>new ie(n,e,r),[e,r]);return i.useEffect(()=>{t.spec=n},[n]),t}function oe(n){return i.useMemo(()=>{const e=n.type;return C(e!=null,"spec.type must be defined"),e},[n])}function ce(n,e,r){const t=y(),a=ae(n,e,r),d=oe(n);P(function(){if(d!=null){const[h,f]=L(d,a,t);return e.receiveHandlerId(h),r.receiveHandlerId(h),f}},[t,e,r,a,d])}function le(n,e){const r=$(n,e);C(!r.begin,"useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)");const t=se(),a=ne(r.options,r.previewOptions);return ce(r,t,a),[G(r.collect,t,a),X(a),ee(a)]}function de({title:n,titleId:e,...r},t){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":e},r),n?i.createElement("title",{id:e},n):null,i.createElement("path",{d:"M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"}))}const ue=i.forwardRef(de),ge=ue,he=n=>{const e="opbr-meddlr",r=n.medal,[{isDragging:t},a]=le(()=>({type:"medal",item:{medal:r},end:(u,h)=>{const f=h.getDropResult();if(u&&f){let v=[],w=[];for(let o=0;o<3;o++){let c=_(u.medal.extra_traits.length-1),S=u.medal.extra_traits[c],I=B(S);v.push(c),w.push(I.max)}let p=u.medal;p.set_traits=v,p.set_traits_values=w,n.onDrop(p,f)}},collect:u=>({isDragging:u.isDragging(),handlerId:u.getHandlerId()})})),d=t&&"dragging";return s.jsx("img",{ref:a,className:`medal-image rounded-full ${d}`,src:`/${e}/medals/${r.image}.png`,title:r.name})},me=n=>{const e=z(),r=q(),[t,a]=i.useState([...Array(e.length).keys()]),d=i.useRef(null);function u(o){a([...o.map(c=>typeof c=="string"||c.type===String?parseInt(c.substring(1,c.length))+r:c)])}const h=o=>{const c=J(),[S,I]=i.useState(!1),[N,T]=i.useState(""),[k,O]=i.useState(c),[fe,x]=i.useState(!1);function F(){I(!S)}const E=l=>{l.keyCode===13&&console.log("enter!")},H=(l,g)=>l.Category.localeCompare(g.Category);function Z(l){if(l.sub){const g=l.sub.sort((m,D)=>m.Category.localeCompare(D.Category));O(g)}else o.filterMedal(l.medals)}function U(l){let g=[];c.forEach(m=>{g=[...g,...m.sub.filter(D=>D.Category.indexOf(l)>-1)]}),O(g.sort((m,D)=>H(m,D)))}return s.jsxs(s.Fragment,{children:[s.jsx(ge,{onClick:F,className:"icon-medium-grey cursor-pointer"}),s.jsxs("div",{className:`flex flex-col rounded-md absolute filter-drop cursor-pointer max-h-60 overflow-y-auto gap-y-2 ${S?"showdrop":""}`,children:[s.jsx("div",{children:s.jsx("input",{className:"w-full rounded-lg form-input",type:"text",value:N,onKeyDown:E,onChange:l=>{T(l.target.value),U(l.target.value)}})}),k.map((l,g)=>s.jsx(s.Fragment,{children:s.jsx("div",{className:"capitalize}",onMouseEnter:()=>x(!0),onMouseLeave:()=>x(!1),onClick:()=>Z(l),children:l.Category},g)}))]})]})},f=o=>{o.keyCode===13&&p()};function v(){a([...Array(e.length).keys()].map(o=>o+4))}function w(o){return t.indexOf(o)>-1}function p(){let o=d.current.value,c=[];o?c=Y(o):console.log("nothing"),c.length>0?a([...c]):v()}return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"flex flex-col",children:[s.jsxs("div",{className:"flex -translate-y-2.5 p-2 fixed justify-between medal-toolbar",children:[s.jsxs("div",{className:"flex w-3/4 lg:w-1/2 search",children:[s.jsx("input",{ref:d,onKeyDown:f,className:"w-full rounded-lg form-input",type:"text",placeholder:"search medals"}),s.jsx(W,{className:"-translate-x-9 translate-y-1 icon-medium-grey cursor-pointer",onClick:p})]}),s.jsx("div",{className:"filter",children:s.jsx(h,{filterMedal:u})})]}),s.jsx("div",{className:"grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 medal-list",children:e.map((o,c)=>!K(o)&&s.jsx("div",{className:`${w(c)?"show spin-medal":"hide"}`,children:s.jsx(he,{onDrop:n.dropped,medal:o},c)}))})]})})};export{me as default};