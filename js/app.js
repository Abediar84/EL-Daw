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