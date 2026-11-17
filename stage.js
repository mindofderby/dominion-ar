(function(){
var st=document.getElementById('stage'),cls=document.body.className,box=document.getElementById('world')||document.getElementById('cam');
var MINH=cls.indexOf('fill')>=0?640:(cls.indexOf('scroll')>=0?844:760);
var FRAME=cls.indexOf('scroll')<0;
var ua=navigator.userAgent,iOS=/iP(hone|od|ad)/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);
var standalone=window.navigator.standalone||matchMedia('(display-mode: standalone)').matches;
var probe=document.createElement('div');
probe.style.cssText='position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0';
document.body.appendChild(probe);
var svg=null;
if(FRAME){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('aria-hidden','true');
 svg.style.cssText='position:absolute;left:0;top:0;width:390px;pointer-events:none;display:block';
 var p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('fill','#000');p.setAttribute('fill-rule','evenodd');svg.appendChild(p);
 var inner=st.firstElementChild;inner.insertBefore(svg,inner.firstChild);}
function framePath(H){var b=H-14;return 'M-400 -400H790V'+(H+400)+'H-400Z '+
 'M23 '+b+'Q20 '+b+' 17.88 '+(b-2.12)+'L16.12 '+(b-3.88)+'Q14 '+(b-6)+' 14 '+(b-9)+'L14 23Q14 20 16.12 17.88L17.88 16.12Q20 14 23 14L141 14Q145 14 145 18L145 22L152 29L334 29L341 22L341 18Q341 14 345 14L367 14Q370 14 372.12 16.12L373.88 17.88Q376 20 376 23L376 '+(b-9)+'Q376 '+(b-6)+' 373.88 '+(b-3.88)+'L372.12 '+(b-2.12)+'Q370 '+b+' 367 '+b+'L249 '+b+'Q245 '+b+' 245 '+(b-4)+'L245 '+(b-9)+'L238 '+(b-16)+'L56 '+(b-16)+'L49 '+(b-9)+'L49 '+(b-4)+'Q49 '+b+' 45 '+b+'Z';}
function fit(){
 var vv=window.visualViewport,w=vv?vv.width:innerWidth,h=vv?vv.height:innerHeight;
 var cs=getComputedStyle(probe),T=parseFloat(cs.paddingTop)||0,B=parseFloat(cs.paddingBottom)||0;
 // iOS Safari (non-standalone) can float its toolbar over the page: keep UI clear of it
 B=Math.max(B,6); T=Math.max(T,4);
 var avail=Math.max(320,h-T-B),s=Math.min(w/390,avail/MINH),H=avail/s;
 var c=st.firstElementChild;c.style.height=H+'px';
 st.style.top=T+'px';st.style.height=H+'px';st.style.transform='translateX(-50%) scale('+s+')';
 if(box){var I=FRAME?Math.ceil(2*s):0,L=Math.ceil(Math.max(0,(w-390*s)/2))+I,R=Math.floor(Math.min(w,(w+390*s)/2))-I;box.style.top=Math.ceil(T+I)+'px';box.style.height=Math.floor(avail-2*I)+'px';box.style.left=L+'px';box.style.width=(R-L)+'px';}
 if(svg){svg.setAttribute('viewBox','0 0 390 '+H);svg.style.height=H+'px';svg.firstChild.setAttribute('d',framePath(H));svg.style.overflow='visible';}
 window.dispatchEvent(new Event('stagefit'));
}
addEventListener('resize',fit);if(window.visualViewport)visualViewport.addEventListener('resize',fit);
addEventListener('orientationchange',function(){setTimeout(fit,300);});fit();setTimeout(fit,400);
})();
(function(){
var fine=matchMedia('(pointer:fine)').matches;
function desk(){return fine&&innerWidth>=900&&innerWidth/innerHeight>1.15;}
var mm=location.pathname.match(/\/(\d\d)\/?$/),id=mm?mm[1]:null,b=document.body;
var css=document.createElement('style');
css.textContent='#bd{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;display:none}'+
'body.desk #bd{display:block}#bd .img{position:absolute;inset:-60px;background-size:cover;background-position:50% 50%;filter:blur(38px) brightness(.42) saturate(1.15);transform:scale(1.08)}'+
'#bd .strips{position:absolute;inset:0;display:grid;grid-template-columns:repeat(10,1fr);gap:4px;filter:brightness(.28) saturate(1.1)}#bd .strips div{background-size:cover;background-position:50% 20%}'+
'#bd:after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 30%,rgba(0,0,0,.75) 100%)}'+
'#dp{position:fixed;top:50%;z-index:3;width:300px;transform:translateY(-50%);display:none;font-family:Barlow,sans-serif;color:#D9DCE0}'+
'body.desk #dp{display:block}#dp .eb{font:700 12px/1 "Barlow Semi Condensed",sans-serif;letter-spacing:.3em;color:#8E949D;text-transform:uppercase}'+
'#dp h2{margin:12px 0 0;font:900 34px/1.05 Cinzel,serif;background:linear-gradient(180deg,#FFFFFF 0%,#E4E7EB 28%,#8E949D 48%,#F3F5F7 60%,#A9AEB6 82%,#FFFFFF 100%);-webkit-background-clip:text;background-clip:text;color:transparent}'+
'#dp p{margin:14px 0 22px;font-size:15px;line-height:23px;font-weight:600}'+
'#dp .q{width:188px;padding:2px;background:rgba(142,148,157,.6);clip-path:polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px)}'+
'#dp .q div{background:#000;padding:20px;clip-path:inherit}#dp .q img{display:block;width:100%;height:auto}'+
'#dp a{display:inline-block;margin-top:22px;font:800 12px/1 Barlow,sans-serif;letter-spacing:.16em;color:#fff;text-decoration:none;text-transform:uppercase;border-bottom:1px solid #8E949D;padding-bottom:4px}';
document.head.appendChild(css);
var bd=document.createElement('div');bd.id='bd';
if(id){bd.innerHTML='<div class="img" style="background-image:url(k/'+id+'/plate.webp)"></div>';}
else{var e=['01','02','03','04','05','06','07','08','09b','10'],h='';for(var i=0;i<10;i++)h+='<div style="background-image:url(assets/eyes/eye-'+e[i]+'.jpg)"></div>';bd.innerHTML='<div class="strips">'+h+'</div>';}
b.insertBefore(bd,b.firstChild);
var dp=document.createElement('div');dp.id='dp';
dp.innerHTML='<div class="eb">Best on your phone</div><h2>'+(id?'Scan to enter<br>this realm':'Scan to step<br>inside')+'</h2><p>'+(id?'Point your phone camera at this code. Her realm opens in your browser and moves as you tilt. No app needed.':'Point your phone camera at this code, then aim it at any Sovereign page in the book. No app needed.')+'</p><div class="q"><div><img alt="QR code" src="assets/qr/ar'+(id?'-'+id:'')+'.svg"></div></div><br><a href="https://www.mindofderby.com/dominion">About the book</a>';
b.appendChild(dp);
function place(){var on=desk();b.classList.toggle('desk',on);if(!on)return;
 var st=document.getElementById('stage'),r=st.getBoundingClientRect(),room=innerWidth-r.right;
 dp.style.left=(r.right+Math.max(48,(room-300)/2.6))+'px';dp.style.display=room>=380?'':'none';}
addEventListener('resize',place);addEventListener('stagefit',place);place();setTimeout(place,500);
})();
