(function(){
var st=document.getElementById('stage'),m=document.body.className;
function fit(){var w=innerWidth,h=innerHeight,s,H;
 if(m.indexOf('fill')>=0){s=Math.min(w/390,h/640);H=h/s;}
 else if(m.indexOf('scroll')>=0){s=Math.min(w/390,1.6);H=844;}
 else {s=Math.min(w/390,h/844);H=844;}
 var c=st.firstElementChild;c.style.height=H+'px';
 st.style.height=H+'px';st.style.transform='translateX(-50%) scale('+s+')';
 if(m.indexOf('scroll')>=0)document.body.style.height=(H*s)+'px';}
addEventListener('resize',fit);fit();})();