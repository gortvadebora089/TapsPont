(() => {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches) return;
  const track=document.createElement('div'), thumb=document.createElement('div');
  track.className='tp-scroll-track'; thumb.className='tp-scroll-thumb'; track.append(thumb); document.body.append(track);
  thumb.tabIndex=0; thumb.setAttribute('role','scrollbar'); thumb.setAttribute('aria-label','Oldal görgetése'); thumb.setAttribute('aria-orientation','vertical'); thumb.setAttribute('aria-valuemin','0'); thumb.setAttribute('aria-valuemax','100');
  document.documentElement.classList.add('tp-custom-scroll'); let timer, dragging=false;
  function update(){const height=document.documentElement.scrollHeight, view=window.innerHeight, max=Math.max(0,height-view); track.hidden=max===0; const size=Math.max(42,view*view/height), space=view-size; thumb.style.height=size+'px';thumb.style.transform='translateY('+(max?window.scrollY/max*space:0)+'px)';thumb.setAttribute('aria-valuenow',String(max?Math.round(window.scrollY/max*100):0));}
  function show(){track.classList.add('is-visible');clearTimeout(timer);timer=setTimeout(()=>{if(!dragging&&!track.matches(':hover')&&!track.matches(':focus-within'))track.classList.remove('is-visible')},1200)}
  function move(y){const max=Math.max(0,document.documentElement.scrollHeight-innerHeight),space=innerHeight-thumb.offsetHeight;window.scrollTo(0,Math.max(0,Math.min(1,(y-thumb.offsetHeight/2)/space))*max)}
  addEventListener('scroll',()=>{update();show()},{passive:true});addEventListener('resize',update);document.addEventListener('mousemove',e=>{if(e.clientX>innerWidth-28)show()},{passive:true});
  track.addEventListener('pointerdown',e=>{dragging=true;track.setPointerCapture(e.pointerId);move(e.clientY);show();e.preventDefault()});track.addEventListener('pointermove',e=>{if(dragging)move(e.clientY)});track.addEventListener('pointerup',()=>{dragging=false;show()});track.addEventListener('pointercancel',()=>{dragging=false;show()});
  thumb.addEventListener('keydown',e=>{const step={ArrowDown:60,ArrowUp:-60,PageDown:innerHeight*.85,PageUp:-innerHeight*.85}[e.key];if(step){e.preventDefault();window.scrollBy(0,step)}else if(e.key==='Home'||e.key==='End'){e.preventDefault();window.scrollTo(0,e.key==='Home'?0:document.documentElement.scrollHeight)}});
  new ResizeObserver(update).observe(document.body);update();
})();
