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
