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
 if(iOS&&!standalone) B=Math.max(B,84); else B=Math.max(B,8); T=Math.max(T,4);
 var avail=Math.max(320,h-T-B),s=Math.min(w/390,avail/MINH),H=avail/s;
 var c=st.firstElementChild;c.style.height=H+'px';
 st.style.top=T+'px';st.style.height=H+'px';st.style.transform='translateX(-50%) scale('+s+')';
 if(box){box.style.top=T+'px';box.style.height=avail+'px';box.style.left=Math.max(0,(w-390*s)/2)+'px';box.style.width=Math.min(w,390*s)+'px';}
 if(svg){svg.setAttribute('viewBox','0 0 390 '+H);svg.style.height=H+'px';svg.firstChild.setAttribute('d',framePath(H));svg.style.overflow='visible';}
 window.dispatchEvent(new Event('stagefit'));
}
addEventListener('resize',fit);if(window.visualViewport)visualViewport.addEventListener('resize',fit);
addEventListener('orientationchange',function(){setTimeout(fit,300);});fit();setTimeout(fit,400);
})();
