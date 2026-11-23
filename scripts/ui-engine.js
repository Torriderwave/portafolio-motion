/* motor de UI por línea de tiempo (inlined): pantallas con entrada/salida, revelados relativos, escritura, barras, toques, cámara 3D y pies de foto */
const stage=document.getElementById('stage'),cam=document.getElementById('cam');
const SCR=[...document.querySelectorAll('.s')],CAPS=[...document.querySelectorAll('.cp')];
const eO=bez(.16,.84,.2,1),eI=bez(.65,0,.2,1),eC=bez(.45,0,.2,1);
const fitStage=()=>{const k=Math.min(innerWidth/1600,innerHeight/900);stage.style.transform=`translate(-50%,-50%) scale(${k})`};fitStage();addEventListener('resize',fitStage);
const win=(e,t)=>{const a=+e.dataset.a,b=+e.dataset.b,di=+e.dataset.ti||.55,dd=+e.dataset.to||.45;return[eO(S(a,a+di,t)),eI(S(b-dd,b,t)),t>=a-.02&&t<=b+.02]};
function camAt(t,KF){let i=0;while(i<KF.length-2&&t>=KF[i+1][0])i++;const A=KF[i],B=KF[i+1],e=eC(S(A[0],B[0],t));return A.slice(1).map((v,j)=>L(v,B[j+1],e))}
function ui(t,KF,{onScreen}={}){
 SCR.forEach(s=>{const[i,o,v]=win(s,t);s.style.visibility=v?'visible':'hidden';if(!v)return;s.style.opacity=(i*(1-o)).toFixed(3);const fl=s.dataset.flat?0:1;s.style.transform=`translateX(${(((1-i)*70-o*60)*fl).toFixed(1)}px)`;
  const rel=t-(+s.dataset.a);
  s.querySelectorAll('[data-in]').forEach(e=>{const a=+e.dataset.in,d=+e.dataset.d||.5,k=eO(S(a,a+d,rel));e.style.opacity=k.toFixed(3);const y=+(e.dataset.y??14),sc=+(e.dataset.s||0);e.style.transform=`translateY(${((1-k)*y).toFixed(1)}px) scale(${(1-(1-k)*sc).toFixed(3)})`});
  s.querySelectorAll('[data-out]').forEach(e=>{const a=+e.dataset.out,k=eI(S(a,a+.6,rel));e.style.opacity=(1-k).toFixed(3);e.style.filter=`blur(${(k*6).toFixed(1)}px)`;});
  s.querySelectorAll('[data-type]').forEach(e=>{const a=+e.dataset.type,tx=e.dataset.text,n=Math.floor(S(a,a+(+e.dataset.d||1),rel)*tx.length);e.textContent=tx.slice(0,n)});
  s.querySelectorAll('[data-bar]').forEach(e=>{e.style.width=(L(+e.dataset.from,+e.dataset.to,S(+e.dataset.bar,+e.dataset.bar+(+e.dataset.d||1),rel))).toFixed(1)+'%'});
  s.querySelectorAll('[data-count]').forEach(e=>{const a=+e.dataset.count,k=eO(S(a,a+(+e.dataset.d||1.2),rel));e.textContent=(e.dataset.pre||'')+Math.round(L(0,+e.dataset.to,k))+(e.dataset.suf||'')});
  s.querySelectorAll('[data-tap]').forEach(e=>{const p=S(+e.dataset.tap,+e.dataset.tap+.7,rel);e.style.opacity=p>0&&p<1?(1-p)*.9:0;e.style.transform=`translate(-50%,-50%) scale(${.3+eO(p)*1.2})`});
  s.querySelectorAll('[data-draw]').forEach(e=>{const a=+e.dataset.draw,p=eO(S(a,a+(+e.dataset.d||1.4),rel));e.style.strokeDasharray=1;e.style.strokeDashoffset=1-p});
  if(onScreen)onScreen(s,rel,t)});
 CAPS.forEach(c=>{const[i,o,v]=win(c,t);c.style.visibility=v?'visible':'hidden';c.style.opacity=(i*(1-o)).toFixed(3);c.style.transform=`translateY(${((1-i)*26-o*14).toFixed(1)}px)`});
 const c=camAt(t,KF);cam.style.transform=`translate3d(${c[0]}px,${c[1]}px,${c[5]||0}px) scale(${c[2]}) rotateY(${c[3]}deg) rotateX(${c[4]}deg)`}
