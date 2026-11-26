(function(){
var H=document.documentElement,RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
function cl(v,a,b){return v<a?a:v>b?b:v}function seg(p,a,b){return cl((p-a)/(b-a),0,1)}function E(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function EO(t){return 1-Math.pow(1-t,4)}
var amb=document.createElement('div');amb.id='amb';document.body.prepend(amb);

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

/* the book opens */
var sec=document.querySelector('.opn');
if(sec){var stg=sec.querySelector('.stg'),cam=sec.querySelector('.cmr'),bk=sec.querySelector('.bk'),flap=sec.querySelector('.flap'),
 L={pl:sec.querySelector('.ly.plate'),fl:sec.querySelector('.ly.floor'),ch:sec.querySelector('.ly.char'),fx:[].slice.call(sec.querySelectorAll('.ly.fx'))},
 c1=sec.querySelector('.c1'),c2=sec.querySelector('.c2'),vis=false,mx=0,my=0,tx=0,ty=0,last=-1;
 var lz=new IntersectionObserver(function(es){if(es[0].isIntersecting){[].forEach.call(sec.querySelectorAll('[data-src]'),function(i){i.src=i.getAttribute('data-src');i.removeAttribute('data-src')});[].forEach.call(sec.querySelectorAll('[data-bg]'),function(i){i.style.backgroundImage='url('+i.getAttribute('data-bg')+')';i.removeAttribute('data-bg')});lz.disconnect()}},{rootMargin:'200% 0px'});lz.observe(sec);
 new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)loop()},{rootMargin:'10% 0px'}).observe(sec);
 if(FINE)addEventListener('pointermove',function(e){tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1},{passive:true});
 function S(el,k,v){el.style.setProperty(k,v)}
 function frame(time){var r=sec.getBoundingClientRect(),vh=innerHeight,p=RM?.47:cl(-r.top/(r.height-vh),0,1);
  mx+=(tx-mx)*.06;my+=(ty-my)*.06;
  var W=bk.offsetWidth/2,a=EO(seg(p,0,.16)),b=E(seg(p,.13,.42)),c=E(seg(p,.52,.79)),d=seg(p,.74,.84),f=E(seg(p,.79,.98)),z=seg(p,.965,1);
  var rx=24+(10-24)*a;rx+=(3-rx)*b;rx*=1-c;var ry=34+(16-34)*a;ry*=1-b;var rz=-5+4*a;rz*=1-b;var mob=innerWidth<760,sc=mob?(.9+.1*a)*(1.55-.55*b):.74+.26*a;
  var tl=1-c;rx+=-my*4*tl;ry+=mx*6*tl;
  var shift=-.5*W*(1-b),lift=(1-a)*vh*.08+b*(1-c)*vh*.055;
  bk.style.transform='translate3d('+shift.toFixed(2)+'px,'+lift.toFixed(2)+'px,0) rotateX('+rx.toFixed(3)+'deg) rotateY('+ry.toFixed(3)+'deg) rotateZ('+rz.toFixed(3)+'deg) scale('+sc.toFixed(4)+')';
  var ang=-179.5*b,bow=Math.sin(Math.PI*b);
  flap.style.transform='translateZ('+(W*.012+bow*W*.05).toFixed(2)+'px) rotateY('+ang.toFixed(3)+'deg) rotateX('+(-bow*2).toFixed(3)+'deg)';
  var Sf=Math.max(innerWidth,vh)/(W*.9557)*1.035,s=1+(Sf-1)*c;
  var ip=Sf*W*.9557,fy=Math.max(0,Math.min(.16,(1-vh/ip)/2))*W*.9557;cam.style.transform='scale('+s.toFixed(4)+') translate3d('+(-.5*W*c).toFixed(2)+'px,'+(fy*c).toFixed(2)+'px,0)';
  S(stg,'--fs',(b*.85).toFixed(3));S(stg,'--bs',(1-b).toFixed(3));S(stg,'--gx',(-45+90*a)+'%');
  S(stg,'--go',((a*.55+b*.45)*(1-c)).toFixed(3));S(stg,'--so',(.85*(1-c)).toFixed(3));S(stg,'--ss',(.55+.45*b).toFixed(3));S(stg,'--sx',shift.toFixed(1)+'px');
  S(stg,'--rpo',(1-d).toFixed(3));S(stg,'--gut',(1-c).toFixed(3));S(stg,'--vg',(f*.95).toFixed(3));S(stg,'--fo',z.toFixed(3));S(stg,'--cu',(1-seg(p,0,.04)).toFixed(3));
  var o1=seg(p,.34,.42)*(1-seg(p,.5,.56)),o2=seg(p,.84,.9)*(1-z);
  c1.style.opacity=o1;c1.style.translate='0 '+((1-seg(p,.34,.42))*30-seg(p,.5,.56)*30)+'px';
  c2.style.opacity=o2;c2.style.translate='0 '+((1-seg(p,.84,.9))*30)+'px';
  var t=time/1000,ph=f>0?1:0,px=mx*f,py=my*f;
  L.pl.style.transform='translate3d('+(-px*1.2)+'%,'+(-py*.8-1.5*f)+'%,0) scale('+(1+.05*f)+')';
  L.fl.style.transform='translate3d('+(px*.8)+'%,'+(py*.5+.6*f)+'%,0) scale('+(1+.08*f)+')';
  L.ch.style.transform='translate3d('+(px*1.8)+'%,'+(py*1.1-1.2*f)+'%,0) scale('+(1+.12*f)+')';
  L.fx.forEach(function(e,i){var q=i*1.7;e.style.opacity=(f*(.3+.18*Math.sin(t*.55+q))).toFixed(3);e.style.transform='translate3d('+(Math.sin(t*.12+q)*4+px*(2.6+i*.4))+'%,'+(py*1.6-f*3)+'%,0) scale('+(1.08+.04*Math.sin(t*.35+q))+')'});
  }
 function loop(time){if(!vis&&!RM)return;frame(time||performance.now());if(!RM)requestAnimationFrame(loop)}
 addEventListener('resize',function(){frame(performance.now())});frame(0);
}

/* realm colour theming */
var sovs=[].slice.call(document.querySelectorAll('#realms .sov')),gl=document.querySelector('.rglow'),cs=document.querySelector('.cardsec'),cur='#000000',qd=false;
function hexc(el){return getComputedStyle(el).getPropertyValue('--c').trim()}
function theme(){qd=false;var vh=innerHeight,col='#000000';
 if(sec){var r=sec.getBoundingClientRect();if(r.top<vh*.5&&r.bottom>vh*.5)col='#E62A3F'}
 var best=1e9;sovs.forEach(function(s){var b=s.getBoundingClientRect(),d=Math.abs(b.top+b.height/2-vh/2);if(b.bottom>0&&b.top<vh&&d<best&&d<vh*.42){best=d;col=hexc(s)}});
 if(cs&&gl){var b=cs.getBoundingClientRect();if(b.top<vh*.5&&b.bottom>vh*.5){var g=gl.style.getPropertyValue('--gl');if(g)col='rgb('+g+')'}}
 if(col!==cur){cur=col;H.style.setProperty('--amc',col)}}
function qt(){if(!qd){qd=true;requestAnimationFrame(theme)}}
addEventListener('scroll',qt,{passive:true});setInterval(function(){if(cs){var b=cs.getBoundingClientRect();if(b.top<innerHeight&&b.bottom>0)qt()}},400);theme();

/* cursor */
if(FINE&&!RM){var cuA=document.createElement('div'),cuB=document.createElement('div');cuA.id='cur';cuB.id='cur2';document.body.appendChild(cuA);document.body.appendChild(cuB);H.classList.add('cur','out');
 var x=-99,y=-99,x2=-99,y2=-99;addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;H.classList.remove('out');H.classList.toggle('hov',!!e.target.closest('a,button,.sov,.c3,.strips .s,label,.btn'))},{passive:true});
 document.addEventListener('mouseleave',function(){H.classList.add('out')});
 (function m(){x2+=(x-x2)*.18;y2+=(y-y2)*.18;cuA.style.transform='translate3d('+x+'px,'+y+'px,0)';cuB.style.transform='translate3d('+x2+'px,'+y2+'px,0)';requestAnimationFrame(m)})()}
})();
