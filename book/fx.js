(function(){
var H=document.documentElement,RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
function cl(v,a,b){return v<a?a:v>b?b:v}function seg(p,a,b){return cl((p-a)/(b-a),0,1)}function E(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function EO(t){return 1-Math.pow(1-t,4)}


/* lenis smooth scroll */
var lenis=null;
if(!RM&&window.Lenis&&FINE){lenis=new Lenis({lerp:.09,smoothWheel:true,wheelMultiplier:.95});(function r(t){lenis.raf(t);requestAnimationFrame(r)})(performance.now())}
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a||!lenis)return;var id=a.getAttribute('href');if(id.length<2)return;var el=document.querySelector(id);if(!el)return;e.preventDefault();lenis.scrollTo(el,{duration:1.8,easing:function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}})});

/* loader + hero entrance */
[].forEach.call(document.querySelectorAll('.hero .strips .s'),function(s,i){s.style.setProperty('--k2',i)});
[].forEach.call(document.querySelectorAll('.hero .in>*'),function(s,i){s.style.setProperty('--k2',i)});
var ld=document.getElementById('ld'),seen=false;try{seen=sessionStorage.getItem('tsd_ld')}catch(e){}
function ready(){if(H.classList.contains('ready'))return;H.classList.add('ready');H.classList.remove('ldg');if(lenis)lenis.start();try{sessionStorage.setItem('tsd_ld',1)}catch(e){}setTimeout(function(){if(ld)ld.remove()},1200)}
if(ld&&!RM){if(lenis)lenis.stop();var urls=[].map.call(document.querySelectorAll('.hero .strips .s div'),function(d){var m=/url\(["']?([^"')]+)/.exec(d.style.backgroundImage);return m&&m[1]}).filter(Boolean);urls.push('../assets/logo-cover.webp');
 var n=0,t0=performance.now(),MIN=seen?250:1500;function tick(){n++;ld.style.setProperty('--ld',n/urls.length);if(n>=urls.length)setTimeout(ready,Math.max(0,MIN-(performance.now()-t0)))}
 urls.forEach(function(u){var im=new Image();im.onload=im.onerror=tick;im.src=u});setTimeout(ready,seen?1200:3200)}else ready();

/* scroll reveals */
var RV='.book>img,.book>div>*,#realms .head,#realms .sov,.scanx,.steps .step,section .head,.cardsec>.wrap>p,.ring3d,#get .wrap>*:not(.done)';
var rvs=[].slice.call(document.querySelectorAll(RV)).filter(function(e){return !e.closest('.hero')&&!e.closest('.opn')});
if(!RM&&'IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
 rvs.forEach(function(e){var sib=[].filter.call(e.parentNode.children,function(c){return rvs.indexOf(c)>-1}),k=sib.indexOf(e);e.style.setProperty('--d',(k%5)*.09+'s');e.classList.add('rv');io.observe(e)})}

/* the book opens: pages riffle to a random sovereign, arrows turn pages */
var sec=document.querySelector('.opn'),SCOL='#E62A3F',setTheme=function(){};
if(sec){var SV=[["#E62A3F","Tamisra","b:plate.webp?v=2|l:floor.webp|c:char.webp|x:fx1.webp|x:fx2.webp|x:fx3.webp|x:fx4.webp"],["#F47934","Banshee","b:plate.webp?v=2|c:char.webp|x:fx1.webp"],["#DF9E2B","Jade","b:plate.webp?v=2|l:floor.webp|c:char.webp|x:fx1.webp|x:fx2.webp|x:fx3.webp|x:fx4.webp"],["#84D83E","Mamba","b:plate.webp?v=2|l:floor.webp|m:snake.webp|c:char.webp|x:fx1.webp|x:fx2.webp|x:fx3.webp|x:fx4.webp"],["#2DD0DB","Gaya","b:plate.webp?v=2|l:floor.webp|c:char.webp|x:fx1.webp|x:fx2.webp|x:fx3.webp"],["#0568D8","Flora","b:plate.webp?v=2|l:floor.webp|c:char.webp|x:fx1.webp|x:fx2.webp|x:fx3.webp|x:fx4.webp"],["#6A86AD","Chrona","b:plate.webp?v=2|c:char.webp|x:fx1.webp|x:fx2.webp"],["#8C2CD9","Hex","b:plate.webp?v=2|c:char.webp|x:fx1.webp|x:fx2.webp|x:fx3.webp|x:fx4.webp"],["#D81B79","Strobe","b:plate.webp?v=2|l:floor.webp|m:creature.webp|c:char.webp|x:fx1.webp|x:fx2.webp|x:fx3.webp|x:fx4.webp"],["#E0E2E4","Glacia","b:plate.webp?v=2|c:char.webp|x:fx1.webp"]];
 var lk=-1;try{lk=parseInt(localStorage.getItem('tsd_sv'),10)}catch(e){}var K=Math.floor(Math.random()*10);if(K===lk)K=(K+1+Math.floor(Math.random()*9))%10;
 var stg=sec.querySelector('.stg'),cam=sec.querySelector('.cmr'),bk=sec.querySelector('.bk'),flap=sec.querySelector('.flap'),rl=sec.querySelector('.rl'),rp=sec.querySelector('.rp'),lp=sec.querySelector('.lp'),near=false;
 function nn(k){return ('0'+(k+1)).slice(-2)}
 function img(src,alt){var i=document.createElement('img');i.alt=alt||'';i.decoding='async';i.setAttribute('data-src',src);return i}
 /* leaves: leaf i sits between spread i and i+1 (front = right page i, back = left page i+1) */
 var LV=[];for(var i=0;i<9;i++){var lf=document.createElement('div');lf.className='leaf';var fc=document.createElement('div');fc.className='fc';fc.appendChild(img('open/t/'+nn(i)+'-r.webp'));var s1=document.createElement('i');s1.className='sh';fc.appendChild(s1);
  var bc=document.createElement('div');bc.className='bc';bc.appendChild(img('open/t/'+nn(i+1)+'-l.webp'));var s2=document.createElement('i');s2.className='sh';bc.appendChild(s2);lf.appendChild(fc);lf.appendChild(bc);bk.insertBefore(lf,flap);LV.push([lf,s1,s2])}
 var hiL=document.createElement('div'),hiR=document.createElement('div');hiL.className='hi hiL';hiR.className='hi hiR';var hl=document.createElement('img'),hr=document.createElement('img');hl.decoding=hr.decoding='async';hiL.appendChild(hl);hiR.appendChild(hr);bk.appendChild(hiL);bk.appendChild(hiR);
 rp.setAttribute('data-src','open/t/10-r.webp');lp.setAttribute('data-src','open/t/01-l.webp');
 var nav=document.createElement('div');nav.className='nav';nav.innerHTML='<button type="button" class="pv" aria-label="Previous sovereign"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><span class="nm chrome" aria-live="polite"></span><button type="button" class="nx" aria-label="Next sovereign"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>';stg.appendChild(nav);
 var bPv=nav.querySelector('.pv'),bNx=nav.querySelector('.nx'),nmEl=nav.querySelector('.nm');
 var FOC=[[.5,.2],[.72,.3],[.5,.2],[.4,.33],[.5,.25],[.5,.2],[.5,.25],[.46,.33],[.46,.3],[.5,.2]],DEP={b:[-1.2,-.6,-.8,.1,'50% 50%'],l:[.8,.5,.6,.08,'50% 100%'],m:[1.2,.8,-.3,.1,'50% 60%'],c:[1.8,1.1,-1.2,.12,'50% 28%']},LY=[],FX=[],hiReady=false;
 function setK(k){K=k;var S0=SV[K],N=nn(K);SCOL=S0[0];try{localStorage.setItem('tsd_sv',K)}catch(e){}
  var hx=SCOL.replace('#','');stg.style.setProperty('--sc',parseInt(hx.substr(0,2),16)+','+parseInt(hx.substr(2,2),16)+','+parseInt(hx.substr(4,2),16));
  nmEl.textContent=S0[1];bPv.disabled=K===0;bNx.disabled=K===9;
  hiReady=false;var n=0;function ok(){if(++n===2)hiReady=true}hl.onload=hr.onload=ok;hl.alt=S0[1]+' close-up, the left page of her spread';hr.alt=S0[1]+"'s realm, the right page of her spread";
  if(near){hl.src='open/'+N+'-l.webp';hr.src='open/'+N+'-r.webp'}else{hl.setAttribute('data-src','open/'+N+'-l.webp');hr.setAttribute('data-src','open/'+N+'-r.webp')}
  rl.innerHTML='';LY=[];FX=[];
  S0[2].split('|').forEach(function(s){var r=s.charAt(0),src=s.slice(2),e=document.createElement('div');e.className='ly '+(r==='x'?'fx':'l'+r);if(near)e.style.backgroundImage='url(../k/'+N+'/'+src+')';else e.setAttribute('data-bg','../k/'+N+'/'+src);rl.appendChild(e);if(r==='x')FX.push(e);else{e.style.transformOrigin=DEP[r][4];LY.push([e,DEP[r]])}});
  setTheme()}
 setK(K);
 var c1=sec.querySelector('.c1'),c2=sec.querySelector('.c2'),vis=false,mx=0,my=0,tx=0,ty=0,pos=-1,navLive=false,lastT=0;
 var lz=new IntersectionObserver(function(es){if(es.some(function(x){return x.isIntersecting})){near=true;[].forEach.call(sec.querySelectorAll('[data-src]'),function(i){i.src=i.getAttribute('data-src');i.removeAttribute('data-src')});[].forEach.call(sec.querySelectorAll('[data-bg]'),function(i){i.style.backgroundImage='url('+i.getAttribute('data-bg')+')';i.removeAttribute('data-bg')});lz.disconnect()}},{rootMargin:'250% 0px'});lz.observe(sec);
 var running=false;new IntersectionObserver(function(es){vis=es[es.length-1].isIntersecting;if(vis&&!running){running=true;requestAnimationFrame(loop)}},{rootMargin:'10% 0px'}).observe(sec);
 if(FINE)addEventListener('pointermove',function(e){tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1},{passive:true});
 bPv.addEventListener('click',function(){if(K>0)setK(K-1)});bNx.addEventListener('click',function(){if(K<9)setK(K+1)});
 addEventListener('keydown',function(e){if(!navLive)return;if(e.key==='ArrowLeft'&&K>0){setK(K-1);e.preventDefault()}if(e.key==='ArrowRight'&&K<9){setK(K+1);e.preventDefault()}});
 function S(el,k,v){el.style.setProperty(k,v)}
 var rc=document.createElement('canvas');rc.className='rip';stg.appendChild(rc);var rx2=rc.getContext('2d'),rW=0,rH=0,rDP=1,GL='01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/\\#*+=%$&',ANG=[];for(var g=0;g<420;g++)ANG.push([Math.random()*Math.PI*2,Math.random()*2-1,Math.random()]);var COLS=[];
 function ripple(d,vw,vh,cx,cy,time,FC2){var show=d>0&&d<1&&!RM;rc.style.opacity=show?1:0;if(!show){rl.style.clipPath='';rl.style.webkitClipPath='';return}
  rDP=Math.min(1.5,devicePixelRatio||1);if(rW!==vw||rH!==vh){rW=vw;rH=vh;rc.width=vw*rDP;rc.height=vh*rDP;COLS=[];for(var x=0;x<vw;x+=16)COLS.push([x,Math.random()*vh,90+Math.random()*220])}
  var maxR=Math.hypot(Math.max(cx,vw-cx),Math.max(cy,vh-cy))*1.08,dr=seg(d,.28,1),R=E(dr)*maxR,envR=Math.min(1,d/.22),ringE=Math.sin(Math.PI*Math.min(1,dr*1.15));
  var cp='circle('+Math.max(0,R-4).toFixed(1)+'px at '+(FC2[0]*100).toFixed(1)+'% '+(FC2[1]*100).toFixed(1)+'%)';rl.style.clipPath=cp;rl.style.webkitClipPath=cp;
  var g=rx2,sc=stg.style.getPropertyValue('--sc')||'230,42,63',t=time/1000;g.setTransform(rDP,0,0,rDP,0,0);g.clearRect(0,0,vw,vh);
  /* the printed page digitises: darken + code rain */
  g.fillStyle='rgba(0,0,0,'+(.5*envR).toFixed(3)+')';g.fillRect(0,0,vw,vh);
  g.font='700 15px ui-monospace,Menlo,Consolas,monospace';g.textAlign='center';g.textBaseline='middle';
  for(var i=0;i<COLS.length;i++){var C=COLS[i],hy=(C[1]+t*C[2])%(vh+260)-130;for(var k2=0;k2<14;k2++){var yy=hy-k2*17;if(yy<-20||yy>vh+20)continue;g.globalAlpha=(k2===0?1:(1-k2/14)*.75)*envR;g.fillStyle=k2===0?'#fff':'rgb('+sc+')';g.fillText(GL.charAt((i*7+k2*13+((t*18)|0))%GL.length),C[0]+8,yy)}}
  g.globalAlpha=1;g.globalCompositeOperation='destination-out';g.beginPath();g.arc(cx,cy,Math.max(0,R-30),0,Math.PI*2);g.fill();g.globalCompositeOperation='source-over';
  if(R>2){/* ripple wavefront: echo rings + glyph band */
   g.save();g.shadowColor='rgb('+sc+')';g.shadowBlur=24;
   for(var e2=0;e2<3;e2++){var rr0=R-e2*42;if(rr0<=0)continue;g.strokeStyle=e2?'rgba('+sc+','+((.55-e2*.15)*ringE).toFixed(3)+')':'rgba(255,255,255,'+(.95*ringE).toFixed(3)+')';g.lineWidth=e2?6-e2*2:2.5;g.beginPath();g.arc(cx,cy,rr0,0,Math.PI*2);g.stroke()}
   g.restore();
   for(var a2=0;a2<ANG.length;a2++){var A=ANG[a2],rr=R+A[1]*40;if(rr<0)continue;g.globalAlpha=(1-Math.abs(A[1]))*ringE;g.fillStyle=A[2]>.55?'#fff':'rgb('+sc+')';g.fillText(GL.charAt((a2+((t*30)|0))%GL.length),cx+Math.cos(A[0])*rr,cy+Math.sin(A[0])*rr)}
   g.globalAlpha=1}
  }
 function frame(time){var r=sec.getBoundingClientRect(),vh=innerHeight,vw=innerWidth,p=RM?.42:cl(-r.top/(r.height-vh),0,1),dt=Math.min(.05,Math.max(0,(time-lastT)/1000));lastT=time;
  mx+=(tx-mx)*.06;my+=(ty-my)*.06;
  var W=bk.offsetWidth/2;if(!W)return;
  var a=EO(seg(p,0,.12)),u=seg(p,.10,.36),NT=K+1,st=Math.min(.09,.5/NT),uq=function(jj){return E(cl((u-jj*st)/(1-(NT-1)*st),0,1))},b=uq(0),e=u,c=E(seg(p,.48,.70)),d=RM?(p>.75?1:0):seg(p,.70,.86),f=E(seg(p,.84,.98));
  var IF=.9757,GX=.012,Sf=Math.max(vw,vh)/(W*IF)*1.09,s=Math.exp(Math.log(Sf)*c),k=(s-1)/(Sf-1);
  /* page riffle: scroll drives it in, arrows animate it after */
  var tgt=K;if(e<1||RM){pos=K}else{if(pos<0)pos=tgt;var df=tgt-pos;pos+=Math.sign(df)*Math.min(Math.abs(df),dt*Math.max(2.2,Math.abs(df)*2.4))}
  var settled=Math.abs(pos-tgt)<.002;
  var rx=24+(10-24)*a;rx+=(3-rx)*b;rx*=1-k;var ry=34+(16-34)*a;ry*=1-b;var rz=-5+4*a;rz*=1-b;var mob=vw<760,sc=mob?(.9+.1*a)*(1.55-.55*b):.74+.26*a;
  var tl=1-k;rx+=-my*4*tl;ry+=mx*6*tl;
  var shift=-.5*W*(1-b),lift=(1-a)*vh*.06,zs=.2;
  bk.style.transform='translate3d('+shift.toFixed(2)+'px,'+lift.toFixed(2)+'px,0) rotateX('+rx.toFixed(3)+'deg) rotateY('+ry.toFixed(3)+'deg) rotateZ('+rz.toFixed(3)+'deg) scale('+sc.toFixed(4)+')';
  var bow=Math.sin(Math.PI*b);
  flap.style.transform='translateZ('+((11*zs)*(1-b)+bow*W*.05).toFixed(2)+'px) rotateY('+(-180*b).toFixed(3)+'deg) rotateX('+(-bow*2).toFixed(3)+'deg)';
  for(var i=0;i<9;i++){var q=e<1?(i<K?uq(i+1):0):E(cl(pos-i,0,1)),L=LV[i],lb=Math.sin(Math.PI*q);
   L[0].style.transform='translateZ('+(((9-i)*zs)*(1-q)+((i+1)*zs)*q+lb*W*.035).toFixed(2)+'px) rotateY('+(-180*q).toFixed(3)+'deg)';
   L[1].style.opacity=(lb*.45).toFixed(3);L[2].style.opacity=((1-q)*.55).toFixed(3)}
  var hiOn=(settled&&hiReady&&e>=1)||c>0;hiL.classList.toggle('on',hiOn);hiR.classList.toggle('on',hiOn);
  var ip=Sf*W*IF,FC=FOC[K],mgx=Math.max(0,(ip-vw)/2-ip*.035),mgy=Math.max(0,(ip-vh)/2-ip*.035),oxs=cl(-(FC[0]-.5)*ip,-mgx,mgx),oys=cl(.38*vh-vh/2-(FC[1]-.5)*ip,-mgy,mgy),oxL=oxs/Sf,oyL=oys/Sf;
  cam.style.transform='scale('+s.toFixed(5)+') translate3d('+((-.5*W+GX*W+oxL)*k).toFixed(2)+'px,'+(oyL*k).toFixed(2)+'px,0)';
  cam.style.visibility=d>=1?'hidden':'visible';
  S(stg,'--fs',(b*.85).toFixed(3));S(stg,'--bs',(1-b).toFixed(3));S(stg,'--gx',(-45+90*a)+'%');
  S(stg,'--go',((a*.55+b*.45)*(1-k)).toFixed(3));S(stg,'--so',(.85*(1-k)).toFixed(3));S(stg,'--ss',(.55+.45*b).toFixed(3));S(stg,'--sx',shift.toFixed(1)+'px');
  S(stg,'--al',d>0?1:0);S(stg,'--gut',(1-c).toFixed(3));S(stg,'--gt',(b*(1-k)).toFixed(3));S(stg,'--vg',(f*.95).toFixed(3));S(stg,'--cu',(1-seg(p,0,.03)).toFixed(3));
  if(d>0){var isz=s*W*IF,icx=vw/2+s*((.5*W-GX*W)*(1-k)+oxL*k),icy=vh/2+s*(lift+oyL*k);rl.style.width=rl.style.height=isz.toFixed(1)+'px';rl.style.transform='translate3d('+(icx-isz/2).toFixed(1)+'px,'+(icy-isz/2).toFixed(1)+'px,0)'}
  ripple(d,vw,vh,typeof icx==='number'?icx+(FOC[K][0]-.5)*isz:vw/2,typeof icy==='number'?icy+(FOC[K][1]-.5)*isz:vh/2,time,FOC[K]);
  var i1=seg(p,.36,.40),x1=seg(p,.45,.49),o2i=seg(p,.87,.92),nv=seg(p,.36,.39)*(1-seg(p,.47,.5));
  c1.style.opacity=(i1*(1-x1)).toFixed(3);c1.style.translate='0 '+((1-i1)*30-x1*30).toFixed(1)+'px';
  c2.style.opacity=o2i.toFixed(3);c2.style.translate='0 '+((1-o2i)*30).toFixed(1)+'px';
  S(stg,'--nv',nv.toFixed(3));var live=nv>.6;if(live!==navLive){navLive=live;nav.classList.toggle('live',live)}
  var t=time/1000,px=cl(mx,-1,1)*f,py=cl(my,-1,1)*f;
  LY.forEach(function(qq){var el=qq[0],D=qq[1],ty2=D[2]*f+py*D[1];if(D===DEP.l)ty2=Math.max(ty2,0);else if(D===DEP.c)ty2=Math.max(ty2,-6*f);else if(D===DEP.m)ty2=Math.max(ty2,-3*f);el.style.transform='translate3d('+(px*D[0]).toFixed(3)+'%,'+ty2.toFixed(3)+'%,0) scale('+(1+D[3]*f).toFixed(4)+')'});
  FX.forEach(function(el,i){var q=i*1.7;el.style.opacity=(f*(.3+.18*Math.sin(t*.55+q))).toFixed(3);el.style.transform='translate3d('+(Math.sin(t*.12+q)*3+px*(2+i*.3)).toFixed(3)+'%,'+(py*1.4-f*2).toFixed(3)+'%,0) scale('+(1.28+.04*Math.sin(t*.35+q)).toFixed(4)+')'});
  }
 function loop(time){if(!vis&&!RM){running=false;return}frame(time||performance.now());if(!RM)requestAnimationFrame(loop);else running=false}
 addEventListener('resize',function(){frame(performance.now())});frame(0);
}

/* realm colour theming */
var sovs=[].slice.call(document.querySelectorAll('#realms .sov')),gl=document.querySelector('.rglow'),cs=document.querySelector('.cardsec'),cur='#000000',qd=false;
function hexc(el){return getComputedStyle(el).getPropertyValue('--c').trim()}
function theme(){qd=false;cur='';var vh=innerHeight,col='#000000';
 if(sec){var r=sec.getBoundingClientRect();if(r.top<vh*.5&&r.bottom>vh*.5)col=SCOL}
 var best=1e9;sovs.forEach(function(s){var b=s.getBoundingClientRect(),d=Math.abs(b.top+b.height/2-vh/2);if(b.bottom>0&&b.top<vh&&d<best&&d<vh*.42){best=d;col=hexc(s)}});
 if(cs&&gl){var b=cs.getBoundingClientRect();if(b.top<vh*.5&&b.bottom>vh*.5){var g=gl.style.getPropertyValue('--gl');if(g)col='rgb('+g+')'}}
 if(col!==cur){cur=col;H.style.setProperty('--amc',col)}}
function qt(){if(!qd){qd=true;requestAnimationFrame(theme)}}setTheme=qt;
addEventListener('scroll',qt,{passive:true});setInterval(function(){if(cs){var b=cs.getBoundingClientRect();if(b.top<innerHeight&&b.bottom>0)qt()}},400);theme();

/* cursor */
if(FINE&&!RM){var cuA=document.createElement('div'),cuB=document.createElement('div');cuA.id='cur';cuB.id='cur2';document.body.appendChild(cuA);document.body.appendChild(cuB);H.classList.add('cur','out');
 var x=-99,y=-99,x2=-99,y2=-99;addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;H.classList.remove('out');H.classList.toggle('hov',!!e.target.closest('a,button,.sov,.c3,.strips .s,label,.btn'))},{passive:true});
 document.addEventListener('mouseleave',function(){H.classList.add('out')});
 (function m(){x2+=(x-x2)*.18;y2+=(y-y2)*.18;cuA.style.transform='translate3d('+x+'px,'+y+'px,0)';cuB.style.transform='translate3d('+x2+'px,'+y2+'px,0)';requestAnimationFrame(m)})()}
})();
