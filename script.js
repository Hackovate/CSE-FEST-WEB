// script.js — Interactivity, AOS init, smooth scroll, and form validation

// Initialize AOS (Animate on Scroll)
AOS.init({
  once: true,
  duration: 700,
  easing: 'ease-out-cubic'
});

// Smooth scroll for navbar links and hero CTA
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for nav links
  document.querySelectorAll('a.nav-link, a#joinBtn').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });

  // Bootstrap carousel: ensure autoplay
  const gallery = document.querySelector('#galleryCarousel');
  if(gallery){
    const carousel = bootstrap.Carousel.getOrCreateInstance(gallery, {interval: 4000, ride: 'carousel'});
  }

  // Registration form validation
  const regForm = document.getElementById('registrationForm');
  const regAlert = document.getElementById('regAlert');
  if(regForm){
    regForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(!regForm.checkValidity()){
        regForm.classList.add('was-validated');
        regAlert.innerHTML = '';
        return;
      }
      // Simulate async submission
      regAlert.innerHTML = '<div class="alert alert-success" role="status">Registration received! We\'ll contact you soon.</div>';
      regForm.reset();
      regForm.classList.remove('was-validated');
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(!contactForm.checkValidity()){
        contactForm.classList.add('was-validated');
        contactAlert.innerHTML = '';
        return;
      }
      contactAlert.innerHTML = '<div class="alert alert-success" role="status">Message sent — thank you for reaching out.</div>';
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  // Improve keyboard accessibility: focus visible for modal close
  document.querySelectorAll('.btn-close').forEach(btn => btn.setAttribute('aria-label','Close'));

  // Timeline interaction: make the date buttons toggle corresponding timeline panels
  (function timelineTabs(){
    try{
      const dateButtons = document.querySelectorAll('.timeline-dates .date-btn');
      const panels = document.querySelectorAll('.timeline-panel');
      function activate(targetId){
        dateButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-target') === targetId));
        panels.forEach(panel => {
          const show = `#${panel.id}` === targetId || panel.id === targetId.replace('#','');
          if(show){
            panel.removeAttribute('hidden');
            panel.classList.add('active');
          } else {
            panel.setAttribute('hidden','');
            panel.classList.remove('active');
          }
        });
      }

      dateButtons.forEach(btn => {
        btn.setAttribute('role','tab');
        btn.addEventListener('click', function(){ activate(this.getAttribute('data-target')); });
        btn.addEventListener('keydown', function(e){
          if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){
            const next = this.nextElementSibling || dateButtons[0]; next.focus();
          }
          if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
            const prev = this.previousElementSibling || dateButtons[dateButtons.length-1]; prev.focus();
          }
          if(e.key === 'Enter' || e.key === ' '){ activate(this.getAttribute('data-target')); }
        });
      });

      // initialize to first active
      const first = document.querySelector('.timeline-dates .date-btn.active') || dateButtons[0];
      if(first) activate(first.getAttribute('data-target'));
    }catch(e){console.warn('timelineTabs error', e)}
  })();
});
