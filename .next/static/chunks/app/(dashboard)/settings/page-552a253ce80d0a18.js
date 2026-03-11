(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[724],{3990:function(e,r,t){Promise.resolve().then(t.bind(t,3125)),Promise.resolve().then(t.bind(t,4047)),Promise.resolve().then(t.t.bind(t,231,23))},3125:function(e,r,t){"use strict";t.d(r,{default:function(){return o}});var n=t(7437);t(4590);var a=(0,t(8064).$)("14367fc16f1269ba3cecddf2208eb43621c38a25");function o(e){let{userId:r,currentName:t}=e;return(0,n.jsxs)("form",{action:async e=>{let t=e.get("name");await a(r,t)},className:"flex gap-2",children:[(0,n.jsx)("input",{name:"name",defaultValue:t,placeholder:"Your name",className:"flex-1 bg-brand-dark border border-brand-border hover:border-brand-orange/40 focus:border-brand-orange text-brand-text placeholder:text-brand-muted rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"}),(0,n.jsx)("button",{type:"submit",className:"bg-brand-surface border border-brand-border hover:border-brand-orange text-brand-text hover:text-brand-orange font-medium text-sm px-4 py-2.5 rounded-xl transition-all",children:"Save"})]})}},4047:function(e,r,t){"use strict";t.d(r,{default:function(){return i}});var n=t(7437),a=t(2265),o=t(3274);function i(e){let{customerId:r}=e,[t,i]=(0,a.useState)(!1);async function l(){i(!0);let e=await fetch("/api/stripe/portal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customerId:r})}),t=await e.json();t.url?window.location.href=t.url:i(!1)}return(0,n.jsxs)("button",{onClick:l,disabled:t,className:"w-full flex items-center justify-center gap-2 bg-brand-surface border border-brand-border hover:border-brand-orange text-brand-text hover:text-brand-orange font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm",children:[t?(0,n.jsx)(o.Z,{size:16,className:"animate-spin"}):null,"Manage Billing & Subscription"]})}},8030:function(e,r,t){"use strict";t.d(r,{Z:function(){return d}});var n=t(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),o=function(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return r.filter((e,r,t)=>!!e&&t.indexOf(e)===r).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,n.forwardRef)((e,r)=>{let{color:t="currentColor",size:a=24,strokeWidth:l=2,absoluteStrokeWidth:d,className:s="",children:c,iconNode:u,...b}=e;return(0,n.createElement)("svg",{ref:r,...i,width:a,height:a,stroke:t,strokeWidth:d?24*Number(l)/Number(a):l,className:o("lucide",s),...b},[...u.map(e=>{let[r,t]=e;return(0,n.createElement)(r,t)}),...Array.isArray(c)?c:[c]])}),d=(e,r)=>{let t=(0,n.forwardRef)((t,i)=>{let{className:d,...s}=t;return(0,n.createElement)(l,{ref:i,iconNode:r,className:o("lucide-".concat(a(e)),d),...s})});return t.displayName="".concat(e),t}},3274:function(e,r,t){"use strict";t.d(r,{Z:function(){return n}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,t(8030).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},8064:function(e,r,t){"use strict";Object.defineProperty(r,"$",{enumerable:!0,get:function(){return a}});let n=t(4590);function a(e){let{createServerReference:r}=t(6671);return r(e,n.callServer)}}},function(e){e.O(0,[231,971,23,744],function(){return e(e.s=3990)}),_N_E=e.O()}]);