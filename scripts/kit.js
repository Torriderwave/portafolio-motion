/* kit mínimo de línea de tiempo (inlined en cada demo): draw(t) es función pura del tiempo → grabable y con estado estático */
const C=(v,a=0,b=1)=>v<a?a:v>b?b:v,L=(a,b,t)=>a+(b-a)*t,S=(a,b,t)=>C((t-a)/(b-a));
const bez=(a,b,c,d)=>{const f=(p,q,t)=>3*p*(1-t)*(1-t)*t+3*q*(1-t)*t*t+t*t*t;return x=>{if(x<=0)return 0;if(x>=1)return 1;let lo=0,hi=1,t=x;for(let i=0;i<24;i++){const v=f(a,c,t);if(Math.abs(v-x)<1e-5)break;v<x?lo=t:hi=t;t=(lo+hi)/2}return f(b,d,t)}};
const sp=(x,f=2,d=6)=>x<=0?0:x>=1?1:1-Math.exp(-d*x)*Math.cos(f*6.2832*x);
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const fit=c=>{const d=Math.min(devicePixelRatio||1,2),w=c.clientWidth,h=c.clientHeight;if(c.width!==Math.round(w*d)||c.height!==Math.round(h*d)){c.width=Math.round(w*d);c.height=Math.round(h*d)}const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return[x,w,h]};
function play(D,draw,o={}){const cap=/[?&]cap/.test(location.search),rm=matchMedia('(prefers-reduced-motion: reduce)').matches,H=o.hold??1500,st=o.still??D,rf=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
window.__D=D;window.__seek=t=>{draw(C(t,0,D));return rf()};
if(cap){draw(0);return}
if(rm){draw(st);addEventListener('resize',()=>draw(st));return}
let t0=performance.now(),on=true;
document.addEventListener('visibilitychange',()=>{on=!document.hidden;t0=performance.now()});
if(o.replay!==false)addEventListener('pointerdown',()=>{t0=performance.now()});
const f=n=>{if(on){const t=(n-t0)%(D+H);draw(C(t,0,D))}requestAnimationFrame(f)};requestAnimationFrame(f)}
