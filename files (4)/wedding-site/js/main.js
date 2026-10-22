(function(){
  var ov=document.getElementById('overture'),env=document.getElementById('env'),done=false;
  var root=document.documentElement;root.classList.add('js');
  var bgm=document.getElementById('bgm'),mus=document.getElementById('mus'),failed=false;
  function loadSong(){if(bgm.dataset.ready)return;bgm.src='assets/audio/song.mp3';bgm.dataset.ready='1';bgm.load();}
  bgm.addEventListener('error',function(){failed=true;mus.hidden=true;});
  bgm.addEventListener('play',function(){mus.classList.add('playing');mus.classList.remove('off');});
  bgm.addEventListener('pause',function(){mus.classList.remove('playing');mus.classList.add('off');});
  mus.addEventListener('click',function(){if(bgm.paused){loadSong();var q=bgm.play();if(q&&q.catch)q.catch(function(){});}else{bgm.pause();}});
  document.querySelectorAll('.plate').forEach(function(p){var w=document.createElement('div');w.className='shw';p.parentNode.insertBefore(w,p);w.appendChild(p);});
  document.querySelectorAll('#hero .eyebrow,#hero h1>span,#hero .rule,#hero .date,#hero .place,#hero .scroll').forEach(function(e,i){e.classList.add('ha');e.style.setProperty('--d',(0.15+i*0.18)+'s');});
  var hero=document.getElementById('hero');
  for(var i=0;i<18;i++){var s=document.createElement('span');s.className='pt';var z=3+Math.random()*5;s.style.cssText='left:'+Math.random()*100+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(9+Math.random()*10)+'s;animation-delay:-'+Math.random()*15+'s';hero.appendChild(s);}
  var rs=document.querySelectorAll('.narrow>*,.wide>*,dl>div,figure,.card,#closing div>*');
  rs.forEach(function(e){e.classList.add('rv');e.style.transitionDelay=Math.min(Array.prototype.indexOf.call(e.parentNode.children,e),6)*0.08+'s';});
  if(!('IntersectionObserver' in window)){root.classList.add('no-io');}
  var io=window.IntersectionObserver?new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.15}):null;
  if(io)rs.forEach(function(e){io.observe(e);});
  function close(){if(done)return;done=true;root.classList.add('on');if(!failed)mus.hidden=false;ov.classList.add('gone');setTimeout(function(){ov.style.display='none'},1300);}
  document.getElementById('seal').addEventListener('click',function(){env.classList.add('open');bgm.volume=.85;loadSong();var pr=bgm.play();if(pr&&pr.catch)pr.catch(function(){});setTimeout(close,1600);});
  document.getElementById('skip').addEventListener('click',close);

  // Countdown (shows the celebration message once the date has arrived)
  var target=Date.UTC(2026,10,21,16,0,0),cd=document.getElementById('cd'),msg=document.getElementById('cdmsg');
  function tick(){
    var d=target-Date.now();
    if(d<=0){msg.textContent='✨ The day we waited for is here ✨';cd.hidden=true;return false;}
    var s=Math.floor(d/1000),v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60],l=['Days','Hours','Minutes','Seconds'];
    cd.innerHTML=v.map(function(n,i){return '<div><b>'+(n<10?'0':'')+n+'</b><span>'+l[i]+'</span></div>'}).join('');
    cd.hidden=false;msg.textContent='';return true;
  }
  if(tick()){var t=setInterval(function(){if(!tick())clearInterval(t)},1000);}

  // RSVP + guest book (kept in this browser only)
  var form=document.getElementById('rsvp'),book=document.getElementById('book'),err=document.getElementById('err'),entries=[];
  try{entries=JSON.parse(localStorage.getItem('as-guestbook')||'[]')}catch(e){entries=[]}
  function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
  function render(){
    var list=entries.filter(function(e){return e.m});
    if(!list.length){book.innerHTML='<p class="empty">No messages yet. Be the first to write one.</p>';return}
    book.innerHTML=list.slice().reverse().map(function(e){return '<div class="msg"><p dir="auto">'+esc(e.m)+'</p><small>'+esc(e.n)+'</small></div>'}).join('');
  }
  render();
  function syncSel(){Array.prototype.forEach.call(form.querySelectorAll('.choices label'),function(l){var i=l.querySelector('input');l.classList.toggle('sel',!!(i&&i.checked));});}
  syncSel();
  form.addEventListener('change',function(){syncSel();
    document.getElementById('gw').style.display=form.att.value==='accept'?'':'none';
  });
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    var n=document.getElementById('nm').value.trim();
    if(!n){err.textContent='Please enter your name.';return}
    err.textContent='';
    entries.push({n:n,m:document.getElementById('ms').value.trim(),a:form.att.value,g:document.getElementById('gs').value});
    try{localStorage.setItem('as-guestbook',JSON.stringify(entries))}catch(e){}
    render();form.hidden=true;document.getElementById('ok').hidden=false;
  });
})();
