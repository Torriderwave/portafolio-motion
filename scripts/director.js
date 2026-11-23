/* director de cámara (inlined): cámara DENTRO de la UI (zoom 1–6×, panorámicas, cortes), DOF, typing y ripples. Requiere kit.js */
const stage=document.getElementById('stage'),world=document.getElementById('world');
const fitStage=()=>{const k=Math.min(innerWidth/1600,innerHeight/900);stage.style.transform=`translate(-50%,-50%) scale(${k})`};fitStage();addEventListener('resize',fitStage);
const eO=bez(.16,.84,.2,1),eI=bez(.65,0,.2,1),ezCam=bez(.5,0,.12,1);
const res=v=>typeof v==='function'?v():v;
/* KF: [t, destino [x,y]|fn, escala, rotZ, rotX, rotY, ease?]  (mismo t dos veces = corte seco) */
function camAt(KF,t){let i=0;while(i<KF.length-2&&t>=KF[i+1][0])i++;const A=KF[i],B=KF[i+1];let e;if(B[0]===A[0])e=t>=B[0]?1:0;else e=(A[6]||ezCam)(S(A[0],B[0],t));const a=res(A[1]),b=res(B[1]);
 return{cx:L(a[0],b[0],e),cy:L(a[1],b[1],e),s:Math.exp(L(Math.log(A[2]),Math.log(B[2]),e)),rz:L(A[3]||0,B[3]||0,e),rx:L(A[4]||0,B[4]||0,e),ry:L(A[5]||0,B[5]||0,e)}}
const applyCam=c=>{world.style.transform=`translate(800px,450px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg) rotateZ(${c.rz.toFixed(2)}deg) scale(${c.s.toFixed(4)}) translate(${(-c.cx).toFixed(2)}px,${(-c.cy).toFixed(2)}px)`};
/* DOF: KD=[[t,b0,b1,b2..]] en px de pantalla; blur local = px/escala */
const lerpArr=(KD,t)=>{let i=0;while(i<KD.length-2&&t>=KD[i+1][0])i++;const A=KD[i],B=KD[i+1],e=eO(S(A[0],B[0],t));return A.slice(1).map((v,j)=>L(v,B[j+1],e))};
const setBlur=(el,px,s)=>{if(!el)return;const b=px/s;el.style.filter=b>.25?`blur(${b.toFixed(2)}px)`:'none'};
const typed=(tx,t,t0,cps=14)=>tx.slice(0,C(Math.floor((t-t0)*cps),0,tx.length));
const caretOn=t=>Math.floor(t*2.4)%2===0;
/* pantallas por ventanas de tiempo con revelados relativos (data-in) */
const SCR=[...document.querySelectorAll('.s')];
function screens(t,hook){SCR.forEach(s=>{const a=+s.dataset.a,b=+s.dataset.b,di=+(s.dataset.ti||.12),dd=+(s.dataset.to||.12),v=t>=a&&t<=b;s.style.visibility=v?'visible':'hidden';if(!v)return;s.style.opacity=(S(a,a+di,t)*(1-S(b-dd,b,t))).toFixed(3);const rel=t-a;
 s.querySelectorAll('[data-in]').forEach(e=>{const a0=+e.dataset.in,k=eO(S(a0,a0+(+(e.dataset.d||.45)),rel)),y=e.dataset.y!=null?+e.dataset.y:14;e.style.opacity=k.toFixed(3);e.style.transform=`translateY(${((1-k)*y).toFixed(1)}px) scale(${(1-(1-k)*(+(e.dataset.s||0))).toFixed(3)})`});if(hook)hook(s,rel,t)})}
const wpos=el=>{let x=0,y=0,n=el;while(n&&n.id!=='world'){x+=n.offsetLeft;y+=n.offsetTop;n=n.offsetParent}return[x+el.offsetWidth/2,y+el.offsetHeight/2]};
