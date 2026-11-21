(() => {
  const filter = document.querySelector('#search-filters');
  if (!filter) return;
  for (const input of filter.querySelectorAll('input[type="date"]')) {
    const button = document.createElement('button'); button.type='button'; button.className='tp-date-button'; button.setAttribute('aria-haspopup','dialog');
    const picker = document.createElement('div'); picker.className='tp-calendar'; picker.hidden=true; picker.setAttribute('role','dialog'); picker.setAttribute('aria-label','Dátum kiválasztása');
    input.classList.add('tp-native-date'); input.tabIndex = -1; input.setAttribute('aria-hidden', 'true'); button.setAttribute('aria-label', input.name === 'from' ? 'Első dátum kiválasztása' : 'Utolsó dátum kiválasztása'); input.after(button,picker);
    let viewed = new Date(); viewed = new Date(viewed.getFullYear(),viewed.getMonth(),1);
    function sync() { button.textContent = input.value ? new Intl.DateTimeFormat('hu-HU',{year:'numeric',month:'long',day:'numeric'}).format(new Date(input.value+'T12:00:00')) : 'Dátum kiválasztása'; }
    function render() {
      picker.replaceChildren();
      const head=document.createElement('div'); head.className='tp-calendar-head';
      const prev=document.createElement('button'), next=document.createElement('button'), title=document.createElement('strong');
      prev.type=next.type='button'; prev.textContent='‹'; next.textContent='›'; prev.setAttribute('aria-label','Előző hónap'); next.setAttribute('aria-label','Következő hónap');
      title.textContent=new Intl.DateTimeFormat('hu-HU',{year:'numeric',month:'long'}).format(viewed);
      prev.onclick=()=>{viewed=new Date(viewed.getFullYear(),viewed.getMonth()-1,1);render();picker.querySelector('[aria-label="Előző hónap"]').focus()}; next.onclick=()=>{viewed=new Date(viewed.getFullYear(),viewed.getMonth()+1,1);render();picker.querySelector('[aria-label="Következő hónap"]').focus()};
      head.append(prev,title,next); picker.append(head);
      const grid=document.createElement('div'); grid.className='tp-calendar-grid';
      ['H','K','Sze','Cs','P','Szo','V'].forEach(day=>{let label=document.createElement('span');label.className='tp-weekday';label.textContent=day;grid.append(label)});
      const first=(viewed.getDay()+6)%7; for(let i=0;i<first;i++) grid.append(document.createElement('span'));
      const days=new Date(viewed.getFullYear(),viewed.getMonth()+1,0).getDate();
      for(let day=1;day<=days;day++) {
        const value = viewed.getFullYear()+'-'+String(viewed.getMonth()+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
        const cell=document.createElement('button');cell.type='button';cell.textContent=day;cell.disabled=Boolean((input.min && value<input.min)||(input.max && value>input.max));cell.setAttribute('aria-label',new Intl.DateTimeFormat('hu-HU',{dateStyle:'full'}).format(new Date(value+'T12:00:00')));if(value===input.value)cell.setAttribute('aria-current','date');
        cell.onclick=()=>{input.value=value;input.dispatchEvent(new Event('change',{bubbles:true}));picker.hidden=true;button.setAttribute('aria-expanded','false');button.focus()};grid.append(cell);
      }
      for (let i = first + days; i < 42; i++) grid.append(document.createElement('span'));
      picker.append(grid);
      const clear=document.createElement('button');clear.type='button';clear.className='tp-calendar-clear btn btn-outline';clear.textContent='Dátum törlése';clear.onclick=()=>{input.value='';input.dispatchEvent(new Event('change',{bubbles:true}));picker.hidden=true;button.setAttribute('aria-expanded','false');button.focus()};picker.append(clear);
    }
    button.addEventListener('click',()=>{ const opening=picker.hidden; filter.querySelectorAll('.tp-calendar').forEach(p=>p.hidden=true); filter.querySelectorAll('.tp-date-button').forEach(b=>b.setAttribute('aria-expanded','false'));if(!opening)return; if(input.value){const [y,m]=input.value.split('-').map(Number);viewed=new Date(y,m-1,1)}render();picker.hidden=false;button.setAttribute('aria-expanded','true') });
    input.addEventListener('change',sync); document.querySelector('#clear-filters')?.addEventListener('click',sync);
    document.addEventListener('click',e=>{if(!e.composedPath().includes(picker)&&e.target!==button){picker.hidden=true;button.setAttribute('aria-expanded','false')}});
    picker.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();picker.hidden=true;button.setAttribute('aria-expanded','false');button.focus()}});
    sync();
  }
})();
