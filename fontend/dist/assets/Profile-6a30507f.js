import{i as x,r as t,u as N,x as m,j as s,s as w,A as P,S as _,y as B,h as e,z as F,B as E}from"./index-4a07e253.js";function V(){const c=x(o=>o.user.currentUser),r=x(o=>o.theme.currentTheme),[i,k]=t.useState({}),[a,j]=t.useState({}),[b,C]=t.useState([]),[d,T]=t.useState(!0),[l,v]=t.useState([]),u=N();let{username:g}=m();return t.useEffect(()=>{(async()=>{try{const n=setTimeout(async()=>{const I=await e.get(`/users/${g}`),y=await e.get(`/card/v1/${c._id}`),$=await e.get(`/icon/${c._id}`),D=await e.get(`/link/${r==null?void 0:r._id}`),[p,f,L,S]=await Promise.all([I,y,$,D]);u(F(p.data)),u(E(f.data)),k(p.data),j(f.data),C(L.data),v(S.data),T(!1)},1e3);return()=>{clearTimeout(n)}}catch(n){console.error("Error fetching data:",n)}})()},[g,c._id,r==null?void 0:r._id]),s.jsx("section",{className:"profile",children:d?s.jsx(w,{isLoading:d,profileLoading:!0}):s.jsxs(s.Fragment,{children:[a!=null&&a.backgroundVideo||a!=null&&a.backgroundImg?s.jsx(s.Fragment,{children:a!=null&&a.backgroundVideo?s.jsx(s.Fragment,{children:s.jsx("video",{className:"profile-background",type:"video/webm",loop:!0,autoPlay:!0,src:a==null?void 0:a.backgroundVideo})}):s.jsx("img",{className:"profile-background",src:a==null?void 0:a.backgroundImg,alt:a==null?void 0:a.backgroundImg})}):s.jsx(s.Fragment,{children:a!=null&&a.gadientColorBot||a!=null&&a.gadientColorTop?s.jsx(s.Fragment,{children:a!=null&&a.gadientColorBot&&(a!=null&&a.gadientColorTop)?s.jsx("div",{className:"profile-background",style:{backgroundImage:`linear-gradient(${a==null?void 0:a.gadientColorTop},${a==null?void 0:a.gadientColorBot})`}}):s.jsx("div",{className:"profile-background",style:{backgroundColor:`${(a==null?void 0:a.gadientColorTop)||(a==null?void 0:a.gadientColorBot)}`}})}):s.jsx("div",{className:"profile-background",style:{backgroundColor:`${a==null?void 0:a.bgColor}`}})}),s.jsxs("div",{className:"profile-info",children:[s.jsx(P,{username:i.username,usernameTitle:i.usernameTitle,decs:i.decs,avatar:i.avtImg,fontColor:a==null?void 0:a.font_color}),s.jsx(_,{icons:b}),l==null?void 0:l.map((o,n)=>s.jsx(B,{title:o.urlTitle,icon:o.urlThumbnail,link:o.url},n))]})]})})}export{V as default};
