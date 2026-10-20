const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

document.documentElement.style.setProperty('--primary', SITE.primaryColor);
document.documentElement.style.setProperty('--accent', SITE.accentColor);

function telHref(phone){ return 'tel:' + phone.replace(/[^\d+]/g,''); }
function fallbackLogo(){ return `<span class="logo-mark">HS</span><span class="logo-copy"><strong>${SITE.businessName}</strong><small>ORTHODONTICS</small></span>`; }
function renderBrand(){
  $$('.brand').forEach(el => el.innerHTML = SITE.logo ? `<img src="${SITE.logo}" alt="${SITE.businessName} logo">` : fallbackLogo());
  $$('[data-business]').forEach(el => el.textContent = SITE.businessName);
  $$('[data-doctor]').forEach(el => el.textContent = SITE.doctorName);
  $$('[data-phone]').forEach(el => { el.textContent = SITE.phone; el.href = telHref(SITE.phone); });
}
function renderHeader(){
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === path || (path==='' && a.getAttribute('href')==='index.html')));
  const toggle = $('.menu-toggle'), panel = $('.mobile-panel');
  if(toggle && panel){ toggle.addEventListener('click',()=>{panel.classList.toggle('open'); toggle.setAttribute('aria-expanded',panel.classList.contains('open'));}); $$('.mobile-panel a').forEach(a=>a.addEventListener('click',()=>panel.classList.remove('open'))); }
  window.addEventListener('scroll',()=>document.body.classList.toggle('scrolled', scrollY>24), {passive:true});
}
function reveal(){
  const items = $$('.reveal');
  if(!('IntersectionObserver' in window)){ items.forEach(x=>x.classList.add('visible')); return; }
  const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
  items.forEach(x=>io.observe(x));
}
function renderTreatments(){
  const grid = $('#treatment-grid'); if(!grid) return;
  const icons = {smile:'smile',sparkles:'sparkles','shield-check':'shield-check'};
  grid.innerHTML = SITE.treatments.map((t,i)=>`<article class="service-card reveal" style="--delay:${i*90}ms"><div class="icon-box"><i data-lucide="${icons[t.icon]||'smile'}"></i></div><div><p class="eyebrow">Treatment</p><h3>${t.name}</h3><p>${t.description}</p><a class="text-link" href="services.html">Learn more <i data-lucide="arrow-up-right"></i></a></div></article>`).join('');
}
function renderTestimonials(){
  const grid=$('#testimonial-grid'); if(!grid) return;
  grid.innerHTML=SITE.testimonials.slice(0,3).map((t,i)=>`<article class="quote-card reveal" style="--delay:${i*90}ms"><div class="stars">★★★★★</div><blockquote>“${t.quote}”</blockquote><div class="reviewer"><span>${t.name.charAt(0)}</span><div><strong>${t.name}</strong><small>${t.source}</small></div></div></article>`).join('');
}
function renderHours(){
  $$('.hours-list').forEach(list=>{const provided=SITE.hours.some(h=>h.open&&h.close); list.innerHTML=provided ? SITE.hours.map(h=>`<li><span>${h.day}</span><strong>${h.open ? `${h.open} – ${h.close}` : 'Closed'}</strong></li>`).join('') : '<li><span>Office hours</span><strong>Call for current hours</strong></li>'});
}
function renderTreatmentsPage(){
  const list=$('#services-list'); if(!list)return;
  list.innerHTML=SITE.treatments.map((t,i)=>`<article class="service-detail reveal"><div class="service-number">0${i+1}</div><div><p class="eyebrow">Orthodontic care</p><h2>${t.name}</h2><p>${t.description}</p>${i===0?'<p>Hill Country Smiles helps patients understand how to live with and care for their new braces.</p>':''}${i===1?'<p>Invisalign takes a modern, custom approach to straightening your teeth.</p>':''}${i===2?'<p>Care after braces is an important part of protecting your new smile.</p>':''}</div></article>`).join('');
}
function renderCredentials(){
  const list=$('#credential-list'); if(!list)return; list.innerHTML=SITE.credentials.map(x=>`<li><i data-lucide="badge-check"></i>${x}</li>`).join('');
}
function init(){ renderBrand(); renderHeader(); renderTreatments(); renderTestimonials(); renderHours(); renderTreatmentsPage(); renderCredentials(); if(window.lucide) lucide.createIcons(); reveal(); setTimeout(()=>document.body.classList.add('loaded'), 650); }
document.addEventListener('DOMContentLoaded',init);
