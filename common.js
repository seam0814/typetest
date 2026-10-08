(function(){
  var ROOT=window.SITE_ROOT||"./";
  (function(){var l=document.createElement("link");l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Jua&display=swap";document.head.appendChild(l);})();
  var GA_ID="G-3WT6016LYF",CLARITY_ID="";
  if(GA_ID){var g=document.createElement("script");g.async=true;g.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(g);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",GA_ID);}
  if(CLARITY_ID){(function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",CLARITY_ID);}
  window.track=function(n,p){try{if(window.gtag)gtag("event",n,p||{})}catch(e){}try{if(window.clarity)clarity("event",n)}catch(e){}};
  window.store={get:function(k,d){try{var v=localStorage.getItem("tz_"+k);return v===null?d:v}catch(e){return d}},set:function(k,v){try{localStorage.setItem("tz_"+k,v)}catch(e){}}};

  var TESTS=[
    {path:"animal/", ic:"", title:"나의 동물상", desc:"질문으로 보는 내 얼굴상", pop:true}
  ];
  window.TESTS=TESTS; window.SITE_NAME='테스트<span>집</span>';
  function h(s){var d=document.createElement("div");d.innerHTML=s.trim();return d.firstChild}
  var head=document.getElementById("site-header");
  if(head){head.className="sitehead";head.appendChild(h('<a class="brand" href="'+ROOT+'">'+window.SITE_NAME+'</a>'));head.appendChild(h('<a class="home" href="'+ROOT+'">← 전체 테스트</a>'))}
  var foot=document.getElementById("site-footer");
  if(foot){foot.className="sitefoot";var links=TESTS.map(function(t){return '<a href="'+ROOT+t.path+'">'+t.title+'</a>'}).join("");
    foot.appendChild(h('<div class="fnav">'+links+'</div>'));
    foot.appendChild(h('<div>재미로 보는 테스트 · 모든 결과는 브라우저에서 계산되며 전송되지 않습니다 · <a href="'+ROOT+'privacy.html">개인정보처리방침</a></div>'))}
  var grid=document.getElementById("tests");
  if(grid){var g=h('<div class="grid"></div>');TESTS.forEach(function(t){g.appendChild(h('<a class="testcard" href="'+ROOT+t.path+'"><span class="ic">'+t.ic+'</span><b>'+t.title+'</b><small>'+t.desc+'</small></a>'))});grid.appendChild(g)}

  /* 결과 공유 카드 */
  function rr(x,a,b,w,hh,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+hh,r);x.arcTo(a+w,b+hh,a,b+hh,r);x.arcTo(a,b+hh,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
  function wrapC(x,t,cx,y,maxW,lh){var line="",yy=y;for(var i=0;i<t.length;i++){var tt=line+t[i];if(x.measureText(tt).width>maxW&&line){x.fillText(line,cx,yy);line=t[i];yy+=lh}else line=tt}if(line)x.fillText(line,cx,yy);return yy+lh}
  window.shareCard=function(o){
    var W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d");
    var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#ff5e7e");g.addColorStop(1,"#ff9a5a");x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle="rgba(255,255,255,0.14)";rr(x,70,190,W-140,H-380,44);x.fill();
    x.textAlign="center";x.fillStyle="#fff";
    x.font="700 46px Jua, sans-serif";x.fillText("테스트집",W/2,140);
    x.font="190px sans-serif";x.fillText(o.emoji||"",W/2,470);
    x.font="800 80px Jua, sans-serif";var yy=wrapC(x,o.title||"",W/2,600,W-240,96);
    x.font="400 42px sans-serif";x.fillStyle="rgba(255,255,255,.95)";(o.lines||[]).forEach(function(ln){yy=wrapC(x,ln,W/2,yy+24,W-260,58)});
    x.font="600 36px Jua, sans-serif";x.fillStyle="rgba(255,255,255,.92)";x.fillText("seam0814.github.io/typetest",W/2,H-90);
    c.toBlob(function(blob){if(!blob)return;var f=null;try{f=new File([blob],"test.png",{type:"image/png"})}catch(e){}
      if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:o.share||"내 결과 "}).then(function(){track("card_share")}).catch(function(){});}
      else{var u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="테스트집.png";a.click();setTimeout(function(){URL.revokeObjectURL(u)},1000);track("card_download")}},"image/png");
  };

  /* 퀴즈 엔진: 테스트 페이지가 cfg 주고 호출 */
  window.quiz=function(cfg){
    var root=document.getElementById("quiz");if(!root)return;
    var idx=0,scores={};Object.keys(cfg.results).forEach(function(k){scores[k]=0});
    function render(){
      if(idx>=cfg.questions.length)return finish();
      var q=cfg.questions[idx],pct=Math.round(idx/cfg.questions.length*100);
      var html='<div class="progress"><div class="bar" style="width:'+pct+'%"></div></div>';
      html+='<div class="qnum">Q'+(idx+1)+' / '+cfg.questions.length+'</div><div class="q">'+q.q+'</div><div class="opts">';
      q.opts.forEach(function(o,i){html+='<button class="opt" data-i="'+i+'">'+o.t+'</button>'});
      html+='</div>';root.innerHTML=html;
      root.querySelector(".opts").addEventListener("click",function(e){var b=e.target;if(!b.classList.contains("opt"))return;
        var o=q.opts[+b.getAttribute("data-i")];for(var k in o.score)scores[k]=(scores[k]||0)+o.score[k];idx++;render();});
      try{root.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(e){}
    }
    function finish(){
      var best=null,bv=-1;for(var k in scores){if(scores[k]>bv){bv=scores[k];best=k}}
      var r=cfg.results[best];track("test_done",{type:best});
      root.innerHTML='<div class="rtype"><div class="remoji">'+r.emoji+'</div><h2>'+r.title+'</h2><p>'+r.desc+'</p></div>'
        +'<button class="btn" id="qshare"> 결과 이미지로 저장·공유</button><button class="btn sec" id="qagain">다시 하기</button>';
      document.getElementById("qagain").addEventListener("click",function(){idx=0;for(var k in scores)scores[k]=0;render()});
      document.getElementById("qshare").addEventListener("click",function(){shareCard({emoji:r.emoji,title:r.title,lines:[cfg.title],share:cfg.title+" 결과 → "+r.title+" "+r.emoji+" 너도 해봐!"})});
      try{root.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(e){}
    }
    render();
  };
})();
