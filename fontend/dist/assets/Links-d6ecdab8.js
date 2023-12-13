import{r,$ as M,a as V,b as W,c as X,d as z,_ as T,e as Y,u as y,j as e,f as D,h as j,g as G,i as v,p as U,t as J,k as P,l as A,m as B,n as K,o as Q,q as Z,s as ee,P as te,v as se}from"./index-0887c4a3.js";function ne(t){const s=r.useRef({value:t,previous:t});return r.useMemo(()=>(s.current.value!==t&&(s.current.previous=s.current.value,s.current.value=t),s.current.previous),[t])}function ce(t){const[s,a]=r.useState(void 0);return M(()=>{if(t){a({width:t.offsetWidth,height:t.offsetHeight});const c=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const i=o[0];let n,l;if("borderBoxSize"in i){const u=i.borderBoxSize,d=Array.isArray(u)?u[0]:u;n=d.inlineSize,l=d.blockSize}else n=t.offsetWidth,l=t.offsetHeight;a({width:n,height:l})});return c.observe(t,{box:"border-box"}),()=>c.unobserve(t)}else a(void 0)},[t]),s}const O="Switch",[re,$e]=V(O),[ae,ie]=re(O),le=r.forwardRef((t,s)=>{const{__scopeSwitch:a,name:c,checked:o,defaultChecked:i,required:n,disabled:l,value:u="on",onCheckedChange:d,...h}=t,[p,x]=r.useState(null),S=W(s,$=>x($)),f=r.useRef(!1),C=p?!!p.closest("form"):!0,[m=!1,k]=X({prop:o,defaultProp:i,onChange:d});return r.createElement(ae,{scope:a,checked:m,disabled:l},r.createElement(z.button,T({type:"button",role:"switch","aria-checked":m,"aria-required":n,"data-state":q(m),"data-disabled":l?"":void 0,disabled:l,value:u},h,{ref:S,onClick:Y(t.onClick,$=>{k(I=>!I),C&&(f.current=$.isPropagationStopped(),f.current||$.stopPropagation())})})),C&&r.createElement(ue,{control:p,bubbles:!f.current,name:c,value:u,checked:m,required:n,disabled:l,style:{transform:"translateX(-100%)"}}))}),oe="SwitchThumb",de=r.forwardRef((t,s)=>{const{__scopeSwitch:a,...c}=t,o=ie(oe,a);return r.createElement(z.span,T({"data-state":q(o.checked),"data-disabled":o.disabled?"":void 0},c,{ref:s}))}),ue=t=>{const{control:s,checked:a,bubbles:c=!0,...o}=t,i=r.useRef(null),n=ne(a),l=ce(s);return r.useEffect(()=>{const u=i.current,d=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(d,"checked").set;if(n!==a&&p){const x=new Event("click",{bubbles:c});p.call(u,a),u.dispatchEvent(x)}},[n,a,c]),r.createElement("input",T({type:"checkbox","aria-hidden":!0,defaultChecked:a},o,{tabIndex:-1,ref:i,style:{...t.style,...l,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function q(t){return t?"checked":"unchecked"}const he=le,fe=de;function be({setIsAlert:t,isAlert:s,linkId:a}){const c=y(),o=()=>{(async()=>{try{(await j.delete(`/link/${a}`)).status===200&&c(G(a))}catch(n){console.log(n.message)}})()};return e.jsxs("div",{className:"ALert",children:[e.jsxs("div",{className:"Alert-head",children:[e.jsx("h6",{className:"Alert-title",children:"Delete"}),e.jsx("div",{className:"Alert-close-icon",onClick:()=>t(!1),children:D(30,30)})]}),e.jsx("p",{className:"Alert-desc",children:"Delete this forever"}),e.jsxs("div",{className:"Alert-btn-group",children:[e.jsx("button",{className:"Alert-btn cancel",onClick:()=>t(!1),children:"Cancel"}),e.jsx("button",{className:"Alert-btn agree",onClick:o,children:"Delete"})]})]})}function me({linkUrl:t,linkTitle:s,linkThumbnail:a,linkId:c,onChange:o}){const i=v(b=>b.url.currentUrl),[n,l]=r.useState(!1),[u,d]=r.useState(!1),[h,p]=r.useState(!1),[x,S]=r.useState(!1),[f,C]=r.useState(""),m=r.useRef(null),k=r.useRef(null),[$,I]=r.useState(!1),w=y(),F=()=>{d(!0)},E=b=>{C({...f,[b.target.name]:b.target.value})};r.useEffect(()=>{var N;const b=()=>{(async()=>{try{const g=await j.put(`/link/${c}`,{urlTitle:f.inputTitle});w(P(g.data)),p(!1)}catch(g){console.log(g.message),w(A())}})()};if(m)return(N=m.current)==null||N.addEventListener("focusout",b),()=>{var L;(L=m.current)==null||L.removeEventListener("focusout",b)}},[c,f==null?void 0:f.inputTitle,m==null?void 0:m.current]),r.useEffect(()=>{var N;const b=()=>{(async()=>{try{const g=await j.put(`/link/${c}`,{url:f.inputUrl});w(P(g.data)),S(!1)}catch(g){console.log(g.message),w(A())}})()};if(k)return(N=k.current)==null||N.addEventListener("focusout",b),()=>{var L;(L=k.current)==null||L.removeEventListener("focusout",b)}},[c,f==null?void 0:f.inputUrl,k==null?void 0:k.current]);const H=b=>{b.stopPropagation(),p(!0)},_=b=>{I(!0)};return e.jsxs("section",{className:"LinksItem",children:[e.jsx("div",{className:"LinksItem-drag-icon"}),e.jsxs("div",{className:"LinksItem-wapper",children:[e.jsxs("div",{className:"LinksItem-item",children:[e.jsxs("div",{className:"LinksItem-side",children:[e.jsxs("div",{className:"LinkItem-url",children:[e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"input-title-label",style:h?{display:"none"}:{display:"block"},children:i.urlTitle?i.urlTitle:s}),e.jsx("input",{ref:m,id:"inputTitle",name:"inputTitle",type:"text",autoFocus:!0,onBlur:_,disabled:!h,onChange:E,style:h?{display:"block"}:{display:"none"},defaultValue:i.urlTitle?i.urlTitle:s,focused:$.toString()})]}),!h&&e.jsx("span",{className:"LinkItem-pen",onClick:H,children:U(25,25)})]}),e.jsxs("div",{className:"LinkItem-url",children:[e.jsx("span",{className:"LinkItem-link",style:x?{display:"none"}:{display:"block"},children:i.url?i.url:t}),e.jsx("input",{ref:k,onChange:E,onBlur:_,type:"text",name:"inputUrl",id:"inputUrl",disabled:!x,focused:$.toString(),style:x?{display:"block"}:{display:"none"},defaultValue:i.url?i.url:t}),!x&&e.jsx("span",{className:"LinkItem-pen",onClick:()=>S(!0),children:U(25,25)})]})]}),e.jsx("div",{className:"LinksItem-switch",children:e.jsx(he,{className:"SwitchRoot",id:"airplane-mode",children:e.jsx(fe,{className:"SwitchThumb",checked:n,onClick:()=>l(!n)})})})]}),e.jsxs("ul",{className:"LinksItem-direct",children:[e.jsx("li",{className:"LinksItem-direct-item",children:"1"}),e.jsx("li",{className:"LinksItem-direct-item",children:"2"}),e.jsx("li",{className:"LinksItem-direct-item",children:"3"}),e.jsx("li",{className:"LinksItem-direct-item",children:"4"}),e.jsx("li",{className:"LinksItem-direct-delete",onClick:F,children:J(25,25)})]}),e.jsx("div",{className:"Alert-Delete","data-state":u?"open":"closed",children:u&&e.jsx(be,{linkId:c,setIsAlert:d,isAlert:u})})]})]})}function pe({onChange:t}){const s=v(n=>n.theme.currentTheme),a=v(n=>n.url.currentUrl),c=y(),[o,i]=r.useState([]);return r.useEffect(()=>{c(B()),(async()=>{try{const l=await j.get(`/link/${s==null?void 0:s._id}`);i(l.data),c(K(l.data))}catch(l){c(A()),console.log(l.message)}})()},[s._id]),e.jsx("div",{className:"LinksItems",children:a==null?void 0:a.map((n,l)=>e.jsx(me,{onChange:t,linkId:n==null?void 0:n._id,linkUrl:n.url,linkTitle:n.urlTitle,linkThumbnail:n.linkThumbnail},l))})}const R=t=>{try{const s=new URL(t),a=s.hostname,c=s.searchParams;return{host:a,queryParams:c}}catch(s){console.error("Invalid URL:",s.message)}};function ke({setIsAddLink:t,isAddLink:s,onChange:a,values:c}){const o=v(l=>l.theme.currentTheme),i=y(),n=()=>{i(B()),(async()=>{var u,d;try{const h=await j.post(`/link/${o==null?void 0:o._id}`,{urlTitle:(u=R(c.url))==null?void 0:u.host,url:c.url,urlThumbnail:((d=R(c.url))==null?void 0:d.host)+"/favicon.ico"});t(!1);const p=setTimeout(()=>i(Q(h.data)),1e3);return()=>{clearTimeout(p)}}catch(h){console.log(h.message),i(A())}})()};return e.jsx("div",{className:"AddLink ",children:e.jsxs("div",{className:"AddLink-wapper",children:[e.jsxs("div",{className:"AddLink-content",children:[e.jsx("h2",{className:"AddLink-content_title",children:"Enter your URL"}),e.jsxs("div",{className:"AddLink-content_group",children:[e.jsx("input",{id:"url",name:"url",type:"text",className:"AddLink-content_input",placeholder:"Your URL",onChange:a,required:!0,minLength:5}),e.jsx("button",{className:"AddLink-content-btn",disabled:!c,onClick:n,children:"ADD"})]}),e.jsx("section",{className:"AddLink-content_option"})]}),e.jsx("div",{className:"AddLink-off",onClick:()=>t(!1),children:D(25,25)})]})})}function Le(){const t=v(d=>d.url.loading),[s,a]=r.useState(!1),[c,o]=r.useState(""),i=v(d=>d.user.currentUser),n=d=>{o({...c,[d.target.name]:d.target.value})},l=()=>{a(!0)},u=y();return r.useEffect(()=>{(async()=>{try{const h=await j.get(`/card/v1/${i._id}`);u(se(h.data))}catch(h){console.log(h.message)}})()},[i._id]),e.jsxs("div",{className:"Links",children:[e.jsx("div",{className:"Links-left",children:e.jsxs("div",{className:"Links-contents",children:[!s&&e.jsx("button",{className:"Links-left-btn",onClick:l,children:t?e.jsx(Z,{urlLoading:!0,isLoading:t}):e.jsxs(e.Fragment,{children:[ee(30,30,"white")," Add link"]})}),s&&e.jsx(ke,{isAddLink:s,setIsAddLink:a,onChange:n,values:c,setValues:o}),e.jsx("section",{className:"Links-left-wapper",children:e.jsx(pe,{onChange:n})})]})}),e.jsx("div",{className:"Links-right",children:e.jsx(te,{})})]})}export{Le as default};
