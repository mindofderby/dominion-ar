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

/* the book opens: pages riffle to a random sovereign, arrows turn pages, then her real AR plays on a phone */
var sec=document.querySelector('.opn'),SCOL='#E62A3F',setTheme=function(){};
if(sec){var SV=[["#E62A3F","Tamisra"],["#F47934","Banshee"],["#DF9E2B","Jade"],["#84D83E","Mamba"],["#2DD0DB","Gaya"],["#0568D8","Flora"],["#6A86AD","Chrona"],["#8C2CD9","Hex"],["#D81B79","Strobe"],["#E0E2E4","Glacia"]];
 var lk=-1;try{lk=parseInt(localStorage.getItem('tsd_sv'),10)}catch(e){}var K=Math.floor(Math.random()*10);if(K===lk)K=(K+1+Math.floor(Math.random()*9))%10;
 var stg=sec.querySelector('.stg'),bk=sec.querySelector('.bk'),flap=sec.querySelector('.flap'),rp=sec.querySelector('.rp'),lp=sec.querySelector('.lp'),near=false;
 function nn(k){return ('0'+(k+1)).slice(-2)}
 function img(src){var i=document.createElement('img');i.alt='';i.decoding='async';i.setAttribute('data-src',src);return i}
 /* leaves: leaf i sits between spread i and i+1 (front = right page i, back = left page i+1) */
 var LV=[];for(var i=0;i<9;i++){var lf=document.createElement('div');lf.className='leaf';var fc=document.createElement('div');fc.className='fc';fc.appendChild(img('open/t/'+nn(i)+'-r.webp'));var s1=document.createElement('i');s1.className='sh';fc.appendChild(s1);
  var bc=document.createElement('div');bc.className='bc';bc.appendChild(img('open/t/'+nn(i+1)+'-l.webp'));var s2=document.createElement('i');s2.className='sh';bc.appendChild(s2);lf.appendChild(fc);lf.appendChild(bc);bk.insertBefore(lf,flap);LV.push([lf,s1,s2])}
 var hiL=document.createElement('div'),hiR=document.createElement('div');hiL.className='hi hiL';hiR.className='hi hiR';var hl=document.createElement('img'),hr=document.createElement('img');hl.decoding=hr.decoding='async';hiL.appendChild(hl);hiR.appendChild(hr);bk.appendChild(hiL);bk.appendChild(hiR);
 rp.setAttribute('data-src','open/t/10-r.webp');lp.setAttribute('data-src','open/t/01-l.webp');
 var nav=document.createElement('div');nav.className='nav';nav.innerHTML='<button type="button" class="pv" aria-label="Previous sovereign"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><span class="nm chrome" aria-live="polite"></span><button type="button" class="nx" aria-label="Next sovereign"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>';stg.appendChild(nav);
 var bPv=nav.querySelector('.pv'),bNx=nav.querySelector('.nx'),nmEl=nav.querySelector('.nm');
 /* the phone, playing a real recording of her AR realm */
 var phn=document.createElement('div');phn.className='phn';phn.innerHTML='<i class="b1"></i><i class="b2"></i><i class="b3"></i><div class="scr"><video muted loop playsinline preload="none" disablepictureinpicture></video></div>';stg.appendChild(phn);
 var vid=phn.querySelector('video'),vidOn=false,hiReady=false,dirty=true;vid.muted=true;
 function setK(k){K=k;var S0=SV[K],N=nn(K);SCOL=S0[0];dirty=true;try{localStorage.setItem('tsd_sv',K)}catch(e){}
  var hx=SCOL.replace('#','');stg.style.setProperty('--sc',parseInt(hx.substr(0,2),16)+','+parseInt(hx.substr(2,2),16)+','+parseInt(hx.substr(4,2),16));
  nmEl.textContent=S0[1];bPv.disabled=K===0;bNx.disabled=K===9;
  hiReady=false;var n=0;hl.onload=hr.onload=function(){if(++n===2){hiReady=true;dirty=true}};hl.alt=S0[1]+' close-up, the left page of her spread';hr.alt=S0[1]+"'s realm, the right page of her spread";
  var po='scan/'+N+'-'+S0[1].toLowerCase()+'-app.webp';
  if(near){hl.src='open/'+N+'-l.webp';hr.src='open/'+N+'-r.webp';vid.poster=po;vid.src='ar/'+N+'.mp4';if(vidOn)play()}else{hl.setAttribute('data-src','open/'+N+'-l.webp');hr.setAttribute('data-src','open/'+N+'-r.webp');vid.setAttribute('data-poster',po);vid.setAttribute('data-src','ar/'+N+'.mp4')}
  vid.setAttribute('aria-label','Screen recording of '+S0[1]+"'s AR realm");setTheme()}
 function play(){var pr=vid.play();if(pr&&pr.catch)pr.catch(function(){})}
 setK(K);
 var c1=sec.querySelector('.c1'),c2=sec.querySelector('.c2'),vis=false,mx=0,my=0,tx=0,ty=0,pos=-1,navLive=false,allLd=false,lastT=0,lastP=-1,running=false;
 /* heavy scene art waits for the first scroll (or a few idle seconds) so the first screen stays light */
 var lzDone=false;function lzGo(){if(lzDone)return;lzDone=true;near=true;[].forEach.call(sec.querySelectorAll('[data-poster]'),function(i){i.poster=i.getAttribute('data-poster');i.removeAttribute('data-poster')});ldAll(K);dirty=true}
 addEventListener('scroll',lzGo,{passive:true,once:true});addEventListener('touchstart',lzGo,{passive:true,once:true});setTimeout(lzGo,4000);
 function ldAll(upto){[].forEach.call(sec.querySelectorAll('[data-src]'),function(i){var lf=i.closest('.leaf');if(lf&&upto<9){var ix=[].indexOf.call(bk.querySelectorAll('.leaf'),lf);if(ix>=upto)return}i.src=i.getAttribute('data-src');i.removeAttribute('data-src')})}
 new IntersectionObserver(function(es){vis=es[es.length-1].isIntersecting;if(vis&&!running){running=true;dirty=true;requestAnimationFrame(loop)}if(!vis&&vidOn){vidOn=false;vid.pause()}},{rootMargin:'-2px 0px'}).observe(sec);
 if(FINE)addEventListener('pointermove',function(e){tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1},{passive:true});
 bPv.addEventListener('click',function(){if(K>0)setK(K-1)});bNx.addEventListener('click',function(){if(K<9)setK(K+1)});
 addEventListener('keydown',function(e){if(!navLive)return;if(e.key==='ArrowLeft'&&K>0){setK(K-1);e.preventDefault()}if(e.key==='ArrowRight'&&K<9){setK(K+1);e.preventDefault()}});
 function S(k,v){stg.style.setProperty(k,v)}
 function frame(time){var r=sec.getBoundingClientRect(),vh=innerHeight,vw=innerWidth,p=RM?.9:cl(-r.top/(r.height-vh),0,1),dt=Math.min(.05,Math.max(0,(time-lastT)/1000));lastT=time;
  var u=seg(p,.12,.46),still=Math.abs(tx-mx)<.002&&Math.abs(ty-my)<.002;
  /* nothing moving: skip the work */
  if(!dirty&&p===lastP&&still&&u>=1&&Math.abs(pos-K)<.002)return;
  dirty=false;lastP=p;mx+=(tx-mx)*.06;my+=(ty-my)*.06;
  var W=bk.offsetWidth/2;if(!W){dirty=true;return}
  var a=EO(seg(p,0,.14)),NT=K+1,st=Math.min(.09,.5/NT),uq=function(jj){return E(cl((u-jj*st)/(1-(NT-1)*st),0,1))},b=uq(0),ph=E(seg(p,.62,.82));
  if(u<1||RM){pos=K}else{if(pos<0)pos=K;var df=K-pos;pos+=Math.sign(df)*Math.min(Math.abs(df),dt*Math.max(2.2,Math.abs(df)*2.4))}
  var settled=Math.abs(pos-K)<.002,mob=vw<760||vw/vh<.85;
  var pre=EO(cl(1-r.top/vh,0,1)),tt=time/1000,idle=1-b,tl=1-ph;
  var rx0=30-18*pre,rx=rx0+(8-rx0)*a;rx+=(3-rx)*b;rx+=Math.sin(tt*.8+1)*3*idle-my*4*tl;
  var ry0=58-32*pre,ry=ry0+(14-ry0)*a;ry+=Math.sin(tt*.55)*7*idle;ry*=1-b;ry+=mx*6*tl+(mob?0:8*ph);
  var rz=(-9+6*pre)*(1-a*.6)*(1-b);
  var sc=mob?(.82+.2*pre+.08*a)*(1-.31*b)*(1-.12*ph):(.58+.2*pre+.22*a)*(1-.1*ph);
  var shift=-.5*W*(1-b)-(mob?0:.34*W*ph),lift=Math.sin(tt*1.05)*vh*.012*idle-(mob?vh*.17*ph:0),zs=.2;
  bk.style.transform='translate3d('+shift.toFixed(2)+'px,'+lift.toFixed(2)+'px,0) rotateX('+rx.toFixed(3)+'deg) rotateY('+ry.toFixed(3)+'deg) rotateZ('+rz.toFixed(3)+'deg) scale('+sc.toFixed(4)+')';
  var bow=Math.sin(Math.PI*b);
  flap.style.transform='translateZ('+((11*zs)*(1-b)+bow*W*.05).toFixed(2)+'px) rotateY('+(-180*b).toFixed(3)+'deg) rotateX('+(-bow*2).toFixed(3)+'deg)';
  for(var i=0;i<9;i++){var q=u<1?(i<K?uq(i+1):0):E(cl(pos-i,0,1)),L=LV[i],lb=Math.sin(Math.PI*q);
   L[0].style.transform='translateZ('+(((9-i)*zs)*(1-q)+((i+1)*zs)*q+lb*W*.035).toFixed(2)+'px) rotateY('+(-180*q).toFixed(3)+'deg)';
   L[1].style.opacity=L[2].style.opacity=(lb*.16).toFixed(3)}
  var hiOn=settled&&hiReady&&u>=1;hiL.classList.toggle('on',hiOn);hiR.classList.toggle('on',hiOn);
  S('--fs',(b*.85).toFixed(3));S('--bs',(1-b).toFixed(3));S('--gx',(-45+90*a)+'%');
  S('--go',(pre*.35+a*.2+b*.45).toFixed(3));S('--so',(.85*(1-ph*.4)).toFixed(3));S('--ss',(.55+.45*b).toFixed(3));S('--sx',shift.toFixed(1)+'px');
  S('--pd',(1-(mob?.5:.25)*ph).toFixed(3));S('--cu',(1-seg(p,0,.03)).toFixed(3));
  /* phone rises in front of the open book */
  var PH=mob?Math.min(vh*.56,vw*1.5):Math.min(vh*.78,W*1.62),PW=PH*.4615,pcx=mob?vw/2:vw/2+Math.min(W*.74,vw/2-PW/2-24),pcy=mob?vh*.6:vh/2;
  phn.style.width=PW.toFixed(1)+'px';phn.style.height=PH.toFixed(1)+'px';phn.style.opacity=ph>0?1:0;
  phn.style.transform='translate3d('+(pcx-PW/2).toFixed(1)+'px,'+(pcy-PH/2+(1-ph)*(vh-pcy+PH/2+40)+Math.sin(tt*.9)*4*ph).toFixed(1)+'px,0) rotate('+((1-ph)*7).toFixed(2)+'deg)';
  var want=ph>.02&&vis;if(want!==vidOn){vidOn=want;if(want)play();else vid.pause()}
  if(ph>0&&ph<1||(ph>0&&!RM))dirty=true;
  var i1=seg(p,.46,.5),x1=seg(p,.58,.62),o2i=seg(p,.84,.9),nv=seg(p,.46,.49)*(1-seg(p,.59,.62));
  c1.style.opacity=(i1*(1-x1)).toFixed(3);c1.style.translate='0 '+((1-i1)*30-x1*30).toFixed(1)+'px';
  c2.style.opacity=o2i.toFixed(3);c2.style.translate='0 '+((1-o2i)*30).toFixed(1)+'px';
  S('--nv',nv.toFixed(3));var live=nv>.6;if(live!==navLive){navLive=live;nav.classList.toggle('live',live);if(live&&!allLd){allLd=true;ldAll(9)}}
  if(idle>0)dirty=true;
  }
 function loop(time){if(!vis&&!RM){running=false;return}frame(time||performance.now());if(!RM)requestAnimationFrame(loop);else running=false}
 addEventListener('resize',function(){dirty=true;frame(performance.now())});frame(0);
}

/* realm colour theming */
var sovs=[].slice.call(document.querySelectorAll('#realms .sov')),gl=document.querySelector('.rglow'),cs=document.querySelector('.cardsec'),cur='#000000',qd=false;
function hexc(el){return getComputedStyle(el).getPropertyValue('--c').trim()}
function theme(){qd=false;var vh=innerHeight,col='#000000';
 if(sec){var r=sec.getBoundingClientRect();if(r.top<vh*.5&&r.bottom>vh*.5)col=SCOL}
 var best=1e9;sovs.forEach(function(s){var b=s.getBoundingClientRect(),d=Math.abs(b.top+b.height/2-vh/2);if(b.bottom>0&&b.top<vh&&d<best&&d<vh*.42){best=d;col=hexc(s)}});
 if(cs&&gl){var b=cs.getBoundingClientRect();if(b.top<vh*.5&&b.bottom>vh*.5){var g=gl.style.getPropertyValue('--gl');if(g)col='rgb('+g+')'}}
 if(col!==cur){cur=col;H.style.setProperty('--amc',col)}}
function qt(){if(!qd){qd=true;requestAnimationFrame(theme)}}setTheme=qt;
addEventListener('scroll',qt,{passive:true});if(cs&&'IntersectionObserver'in window){var tiv=0;new IntersectionObserver(function(es){var on=es[es.length-1].isIntersecting;if(on&&!tiv)tiv=setInterval(qt,400);else if(!on&&tiv){clearInterval(tiv);tiv=0}}).observe(cs)}theme();

/* cursor */
if(FINE&&!RM){var cuA=document.createElement('div'),cuB=document.createElement('div');cuA.id='cur';cuB.id='cur2';document.body.appendChild(cuA);document.body.appendChild(cuB);H.classList.add('cur','out');
 var x=-99,y=-99,x2=-99,y2=-99,cOn=false,hov=false;
 function cm(){x2+=(x-x2)*.18;y2+=(y-y2)*.18;cuA.style.transform='translate3d('+x+'px,'+y+'px,0)';cuB.style.transform='translate3d('+x2.toFixed(1)+'px,'+y2.toFixed(1)+'px,0)';if(Math.abs(x-x2)+Math.abs(y-y2)>.3)requestAnimationFrame(cm);else cOn=false}
 addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;H.classList.remove('out');var h=!!e.target.closest('a,button,.sov,.c3,.strips .s,label,.btn');if(h!==hov){hov=h;H.classList.toggle('hov',h)}if(!cOn){cOn=true;requestAnimationFrame(cm)}},{passive:true});
 document.addEventListener('mouseleave',function(){H.classList.add('out')})}
})();
