const header=document.getElementById('header');
const menu=document.getElementById('menu');
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40));
menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const counter=document.querySelector('[data-count]');
let counted=false;
const observer=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !counted){
    counted=true; const target=Number(counter.dataset.count); let n=0;
    const tick=()=>{ n=Math.min(target,n+30); counter.textContent=n.toLocaleString(); if(n<target) requestAnimationFrame(tick); };
    tick();
  }
},{threshold:.6});
if(counter) observer.observe(counter);

function demoSubmit(event){
  event.preventDefault();
  alert('상담예약 데모가 접수되었습니다. 실제 운영 시 상담 접수 시스템을 연결합니다.');
  event.target.reset();
  return false;
}

const heroImg=document.querySelector('.heroImage'); const testImg=new Image(); testImg.onerror=()=>heroImg.classList.add('imageMissing'); testImg.src='images/hero.jpg';

document.querySelectorAll('.typeTab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.typeTab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.typePanel').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('type-'+btn.dataset.type).classList.add('active');
  });
});

// V6 complex tabs
document.querySelectorAll('.complexTab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.complexTab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.complexViewer').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-'+btn.dataset.view).classList.add('active');
  });
});

// V6 image modal
const modal=document.getElementById('imageModal');
const modalImg=document.getElementById('modalImage');
const modalPlaceholder=document.getElementById('modalPlaceholder');
const modalTitle=document.getElementById('modalTitle');
document.querySelectorAll('[data-modal]').forEach(el=>{
  el.addEventListener('click',()=>{
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    modalImg.style.display='block';
    modalPlaceholder.style.display='none';
    modalImg.src=el.querySelector('img')?el.querySelector('img').src:'images/hero.jpg';
    modalImg.alt=el.dataset.modal;
  });
});
document.querySelectorAll('[data-open-placeholder]').forEach(el=>{
  el.addEventListener('click',()=>{
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    modalImg.style.display='none';
    modalPlaceholder.style.display='flex';
    modalTitle.textContent=el.dataset.openPlaceholder;
  });
});
document.getElementById('modalClose').addEventListener('click',()=>modal.classList.remove('open'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});

// V6 consult choices -> contact form
let selectedType='', selectedPurpose='';
function refreshSummary(){
  const text=(selectedType?selectedType:'주택형 미선택')+' · '+(selectedPurpose?selectedPurpose:'관심목적 미선택');
  document.getElementById('consultSummary').textContent='선택: '+text;
  document.getElementById('selectedType').value=selectedType;
  document.getElementById('selectedPurpose').value=selectedPurpose;
}
document.querySelectorAll('#typeChips button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('#typeChips button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); selectedType=b.dataset.value; refreshSummary();
}));
document.querySelectorAll('#purposeChips button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('#purposeChips button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); selectedPurpose=b.dataset.value; refreshSummary();
}));
document.querySelector('.consultGo').addEventListener('click',()=>{
  const msg=document.getElementById('message');
  const pre='[상담 선택]\\n주택형: '+(selectedType||'미선택')+'\\n관심목적: '+(selectedPurpose||'미선택')+'\\n\\n';
  if(!msg.value.startsWith('[상담 선택]')) msg.value=pre+msg.value;
});
