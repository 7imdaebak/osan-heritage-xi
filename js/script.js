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

// V9 production form UX: validation + UTM capture + no fake submission.
const params=new URLSearchParams(location.search);
const utm={source:params.get('utm_source')||'',medium:params.get('utm_medium')||'',campaign:params.get('utm_campaign')||'',term:params.get('utm_term')||''};
try{localStorage.setItem('osan_xi_utm',JSON.stringify(utm));}catch(e){}
const form=document.getElementById('consultForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const consent=document.getElementById('privacyConsent');
    if(consent && !consent.checked){alert('개인정보 수집 및 이용에 동의해 주세요.');return false;}
    const name=form.querySelector('input[name="name"]')?.value?.trim()||'';
    const phone=form.querySelector('input[name="phone"]')?.value?.trim()||'';
    if(!name || !phone){alert('이름과 연락처를 입력해 주세요.');return false;}
    alert('상담 신청 내용이 준비되었습니다.\\n현재 버전은 서버 접수 기능이 연결되지 않아 전화 상담(1544-5403)으로 접수해 주세요.');
    location.href='tel:15445403';
    return false;
  });
}

// V16 budget matching
const budgetMessage=document.getElementById('budgetMessage');
document.querySelectorAll('.budgetGrid button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.budgetGrid button').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const b=btn.dataset.budget;
    const msg={
      '7억대':'7억대 예산이라면 75㎡와 84㎡ 주택형을 중심으로 실제 잔여세대와 동·호수를 확인해 보세요.',
      '9억대':'9억대 예산이라면 102㎡ 중심으로 공급금액과 옵션·자금계획을 함께 확인해 보세요.',
      '10억대':'10억대 예산이라면 124㎡의 실제 가능 세대와 계약조건을 확인해 보세요.',
      '20억대':'20억대 예산이라면 166㎡P의 공급 여부와 세부 조건을 별도로 확인해 보세요.'
    }[b];
    budgetMessage.textContent=msg+'  상담: 010-8900-8869';
  });
});

// V17 guided consultation builder
const leadState={type:'',topic:'',method:''};
document.querySelectorAll('.builderOptions').forEach(group=>{
  group.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      group.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      leadState[group.dataset.group]=btn.dataset.value;
      updateLeadSummary();
    });
  });
});
function updateLeadSummary(){
  const type=leadState.type||'관심 타입 미선택';
  const topic=leadState.topic||'문의 내용 미선택';
  const method=leadState.method||'상담 방식 미선택';
  const text=`${type} · ${topic} · ${method}`;
  const box=document.getElementById('leadSummary');
  if(box) box.querySelector('strong').textContent=text;
  const call=document.getElementById('leadCall');
  if(call) call.href='tel:01089008869';
}
const copyBtn=document.getElementById('copyLead');
if(copyBtn){
  copyBtn.addEventListener('click',async()=>{
    const text=`오산 헤리티지자이 상담 요청\n관심 타입: ${leadState.type||'미선택'}\n관심 내용: ${leadState.topic||'미선택'}\n상담 방식: ${leadState.method||'미선택'}\n상담전화: 010-8900-8869`;
    try{await navigator.clipboard.writeText(text);copyBtn.textContent='복사 완료';setTimeout(()=>copyBtn.textContent='상담내용 복사',1500);}
    catch(e){alert(text);}
  });
}

// V18 reference-style reservation UX
const reservationForm=document.getElementById('reservationForm');
if(reservationForm){
  reservationForm.addEventListener('submit',e=>{
    e.preventDefault();
    const consent=document.getElementById('refConsent');
    if(!consent.checked){alert('개인정보 수집·이용 및 처리 위탁에 동의해 주세요.');return;}
    const name=reservationForm.elements.name.value.trim();
    const phone=reservationForm.elements.phone.value.trim();
    if(!name||!phone){alert('성명과 연락처를 입력해주세요.');return;}
    alert('상담 요청 내용이 준비되었습니다. 현재 버전은 실제 접수 DB가 연결되지 않아 010-8900-8869 전화상담으로 연결합니다.');
    location.href='tel:01089008869';
  });
}

// V20 popup: 3-day suppression, inspired by common landing UX but independently implemented.
(function(){
  const popup=document.getElementById('v20Popup');
  const close=document.getElementById('v20Close');
  const hide=document.getElementById('v20Hide');
  const reserve=document.getElementById('v20PopupReserve');
  if(!popup) return;
  let hidden=false;
  try{hidden=localStorage.getItem('osan_v20_popup_hide_until') && Number(localStorage.getItem('osan_v20_popup_hide_until'))>Date.now();}catch(e){}
  if(hidden) popup.style.display='none';
  function closePopup(){popup.style.display='none';}
  close?.addEventListener('click',closePopup);
  reserve?.addEventListener('click',closePopup);
  hide?.addEventListener('click',()=>{
    try{localStorage.setItem('osan_v20_popup_hide_until',String(Date.now()+3*24*60*60*1000));}catch(e){}
    closePopup();
  });
})();
