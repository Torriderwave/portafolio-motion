/* kit mínimo de línea de tiempo (inlined en cada demo): draw(t) es función pura del tiempo → grabable y con estado estático */
const C=(v,a=0,b=1)=>v<a?a:v>b?b:v,L=(a,b,t)=>a+(b-a)*t,S=(a,b,t)=>C((t-a)/(b-a));
const bez=(a,b,c,d)=>{const f=(p,q,t)=>3*p*(1-t)*(1-t)*t+3*q*(1-t)*t*t+t*t*t;return x=>{if(x<=0)return 0;if(x>=1)return 1;let lo=0,hi=1,t=x;for(let i=0;i<24;i++){const v=f(a,c,t);if(Math.abs(v-x)<1e-5)break;v<x?lo=t:hi=t;t=(lo+hi)/2}return f(b,d,t)}};
const sp=(x,f=2,d=6)=>x<=0?0:x>=1?1:1-Math.exp(-d*x)*Math.cos(f*6.2832*x);
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const fit=c=>{const d=Math.min(devicePixelRatio||1,2),w=c.clientWidth,h=c.clientHeight;if(c.width!==Math.round(w*d)||c.height!==Math.round(h*d)){c.width=Math.round(w*d);c.height=Math.round(h*d)}const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return[x,w,h]};
/* acabado: grano de película (24 fps), viñeta, micro-shake de impacto */
let _g;const grain=(x,w,h,t,a=.09)=>{if(!_g){_g=document.createElement('canvas');_g.width=_g.height=180;const g=_g.getContext('2d'),d=g.createImageData(180,180),r=rng(9);for(let i=0;i<d.data.length;i+=4){d.data[i]=d.data[i+1]=d.data[i+2]=r()*255|0;d.data[i+3]=255}g.putImageData(d,0,0)}
 const r=rng(Math.floor(t*24)+1),ox=r()*180|0,oy=r()*180|0;x.save();x.globalAlpha=a;x.globalCompositeOperation='overlay';x.translate(-ox,-oy);x.fillStyle=x.createPattern(_g,'repeat');x.fillRect(ox,oy,w,h);x.restore()};
const vig=(x,w,h,a=.5)=>{const g=x.createRadialGradient(w/2,h/2,Math.min(w,h)*.3,w/2,h/2,Math.max(w,h)*.78);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);x.fillStyle=g;x.fillRect(0,0,w,h)};
const film=t=>{const e=document.getElementById('film');if(e){const r=rng(Math.floor(t*24)+3);e.style.backgroundPosition=`${r()*220|0}px ${r()*220|0}px`}};
const shake=(t,t0,a=6,d=.3)=>{const k=S(t0,t0+d,t);if(k<=0||k>=1)return[0,0];const e=(1-k)*(1-k)*a;return[Math.sin(k*67)*e,Math.cos(k*59)*e]};
const FONTS=()=>document.fonts?Promise.all(['300 40px Display','italic 300 40px Display','500 20px Sans'].map(f=>document.fonts.load(f,'AÁaáÍí0'))):Promise.resolve();
function play(D,draw,o={}){const cap=/[?&]cap/.test(location.search),rm=matchMedia('(prefers-reduced-motion: reduce)').matches,H=o.hold??1500,st=o.still??D,rf=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
window.__D=D;
FONTS().then(()=>{window.__seek=t=>{draw(C(t,0,D));return rf()};
if(cap){draw(0);return}
if(rm){draw(st);addEventListener('resize',()=>draw(st));return}
let t0=performance.now(),on=true;
document.addEventListener('visibilitychange',()=>{on=!document.hidden;t0=performance.now()});
if(o.replay!==false)addEventListener('pointerdown',()=>{t0=performance.now()});
const f=n=>{if(on){const t=(n-t0)%(D+H);draw(C(t,0,D))}requestAnimationFrame(f)};requestAnimationFrame(f)})}
