(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[537],{6784:function(e,t,r){Promise.resolve().then(r.bind(r,3203))},3203:function(e,t,r){"use strict";r.d(t,{default:function(){return s}});var n=r(7437),o=r(2265),i=r(3274),a=r(1976);function s(e){let{userId:t,email:r}=e,[s,l]=(0,o.useState)(!1);async function c(){l(!0);let e=await fetch("/api/stripe/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:t,email:r})}),n=await e.json();n.url?window.location.href=n.url:l(!1)}return(0,n.jsx)("button",{onClick:c,disabled:s,className:"w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold text-lg py-4 rounded-xl transition-all glow-orange disabled:opacity-50",children:s?(0,n.jsx)(i.Z,{size:20,className:"animate-spin"}):(0,n.jsxs)(n.Fragment,{children:["Upgrade to Pro — $9.90/month",(0,n.jsx)(a.Z,{size:18})]})})}},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return l}});var n=r(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:o=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:c="",children:u,iconNode:d,...f}=e;return(0,n.createElement)("svg",{ref:t,...a,width:o,height:o,stroke:r,strokeWidth:l?24*Number(s)/Number(o):s,className:i("lucide",c),...f},[...d.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(u)?u:[u]])}),l=(e,t)=>{let r=(0,n.forwardRef)((r,a)=>{let{className:l,...c}=r;return(0,n.createElement)(s,{ref:a,iconNode:t,className:i("lucide-".concat(o(e)),l),...c})});return r.displayName="".concat(e),r}},1976:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(8030).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},3274:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(8030).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])}},function(e){e.O(0,[971,23,744],function(){return e(e.s=6784)}),_N_E=e.O()}]);