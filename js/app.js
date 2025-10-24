(function(){
  function serialize(form){const d={};new FormData(form).forEach((v,k)=>d[k]=v);return d;}
  async function onSubmit(e){
    e.preventDefault();
    const f=e.target; if(!f.reportValidity()) return;
    const ep=f.getAttribute('data-endpoint'); const p=serialize(f);
    if(ep){
      try{ const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)});
        if(r.ok){ f.reset(); alert(f.getAttribute('data-success')||'Thanks!'); return; } }catch(e){}
    }
    const to=f.getAttribute('data-mailto')||'info@el-dawy.eg';
    const subject=encodeURIComponent('RFQ: '+(p.company||'')+' — '+(p.name||''));
    const body=encodeURIComponent(`Name: ${p.name||''}\nEmail: ${p.email||''}\nPhone: ${p.phone||''}\nCompany: ${p.company||''}\nService: ${p.service||''}\nVolume: ${p.volume||''}\nTimeline: ${p.timeline||''}\nMessage:\n${p.message||''}`);
    window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;
  }
  document.addEventListener('DOMContentLoaded', function(){
    const form=document.querySelector('form[data-rfq]'); if(form){ form.addEventListener('submit', onSubmit); }
  });
})();

// v4.4 hamburger toggle
document.addEventListener('DOMContentLoaded', ()=>{
  const toggle=document.querySelector('.nav-toggle');
  const menu=document.querySelector('nav ul');
  if(toggle && menu){
    toggle.addEventListener('click', ()=> menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
  }
});


// v4.4.1 overlay + scroll lock
document.addEventListener('DOMContentLoaded', ()=>{
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('nav ul');
  const backdrop = document.querySelector('.nav-backdrop');
  if(toggle && menu){
    const open = ()=>{ menu.classList.add('open'); document.body.classList.add('nav-open'); }
    const close = ()=>{ menu.classList.remove('open'); document.body.classList.remove('nav-open'); }
    toggle.addEventListener('click', ()=> menu.classList.contains('open') ? close() : open());
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', close));
    if(backdrop){ backdrop.addEventListener('click', close); }
  }
});


// v4.6 ensure robust per-nav toggle even if multiple navs
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    const nav = btn.closest('nav'); if(!nav) return;
    const menu = nav.querySelector('ul'); if(!menu) return;
    let backdrop = nav.querySelector('.nav-backdrop');
    if(!backdrop){ backdrop = document.createElement('div'); backdrop.className='nav-backdrop'; nav.appendChild(backdrop); }
    const open = ()=>{ menu.classList.add('open'); document.body.classList.add('nav-open'); btn.setAttribute('aria-expanded','true'); };
    const close = ()=>{ menu.classList.remove('open'); document.body.classList.remove('nav-open'); btn.setAttribute('aria-expanded','false'); };
    btn.addEventListener('click', (e)=>{ e.preventDefault(); (menu.classList.contains('open')?close:open)(); });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', close));
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
  });
});
