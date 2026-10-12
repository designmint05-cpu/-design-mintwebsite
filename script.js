const pages = ['home','portfolio','services','pricing','about','contact'];
const titles = {home:'HOME',portfolio:'PORTFOLIO',services:'SERVICES',pricing:'STARTER PRICING',about:'ABOUT',contact:'CONTACT'};
const sidebar = document.getElementById('sidebar');
const crumb = document.getElementById('crumbCurrent');
function showPage(name){
  if(!pages.includes(name)) name='home';
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active-page',p.id==='page-'+name));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  crumb.textContent=titles[name];
  sidebar.classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();showPage(el.dataset.page)}));
document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>showPage(el.dataset.go)));
document.getElementById('menuToggle').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.addEventListener('click',e=>{if(window.innerWidth<=760 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !e.target.closest('#menuToggle')) sidebar.classList.remove('open')});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(f=>f.classList.toggle('active',f===btn));
  const filter=btn.dataset.filter;
  document.querySelectorAll('.portfolio-grid .work-card').forEach(card=>card.style.display=(filter==='all'||card.dataset.category===filter)?'block':'none');
}));
const lightbox=document.getElementById('lightbox'), lightboxImage=document.getElementById('lightboxImage'), lightboxCaption=document.getElementById('lightboxCaption');
document.querySelectorAll('.work-card').forEach(card=>card.addEventListener('click',()=>{
  const file=card.dataset.image;
  lightboxImage.src='assets/'+file;
  lightboxImage.alt=card.querySelector('img')?.alt||'Portfolio sample';
  lightboxCaption.textContent=card.querySelector('strong')?.textContent||'Design Mint portfolio sample';
  lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');
}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src=''}
document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
const toast=document.getElementById('toast');let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
document.getElementById('copyHandle').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText('@design_mint.in');showToast('Instagram handle copied!')}
  catch(e){showToast('Instagram: @design_mint.in')}
});
document.querySelectorAll('[data-service]').forEach(btn=>btn.addEventListener('click',()=>{
  const service=btn.dataset.service;
  showPage('contact');
  showToast('Message @design_mint.in about: '+service);
}));
