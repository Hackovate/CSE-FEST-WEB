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

  // Timeline interaction: activate panels only on user click (hidden by default)
  (function timelineTabs(){
    try{
      const dateButtons = Array.from(document.querySelectorAll('.timeline-dates .date-btn'));
      const panels = Array.from(document.querySelectorAll('.timeline-panel'));
      const track = document.querySelector('.timeline-track');

      function activateByTarget(targetId){
        // update buttons
        dateButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-target') === targetId));
        // show the matched panel only
        panels.forEach(p => p.classList.toggle('active', ('#' + p.id) === targetId));
        // reset any transform (we're not sliding)
        if(track) track.style.transform = '';
        // small debug log (safe in dev)
        // console.log('Activated', targetId);
      }

      dateButtons.forEach((btn, idx) => {
        btn.setAttribute('role','tab');
        btn.addEventListener('click', function(){ activateByTarget(this.getAttribute('data-target')); });
        btn.addEventListener('keydown', function(e){
          if(e.key === 'ArrowRight'){
            const next = dateButtons[(idx+1) % dateButtons.length]; next.focus();
          }
          if(e.key === 'ArrowLeft'){
            const prev = dateButtons[(idx-1 + dateButtons.length) % dateButtons.length]; prev.focus();
          }
          if(e.key === 'Enter' || e.key === ' '){ activateByTarget(this.getAttribute('data-target')); }
        });
      });

      // do not auto-activate any panel on load — wait for user click
      // but ensure track is reset
      if(track) track.style.transform = 'translateX(0)';

      window.addEventListener('resize', function(){
        const activeBtn = dateButtons.find(b => b.classList.contains('active'));
        if(activeBtn) activateByTarget(activeBtn.getAttribute('data-target'));
      });
    }catch(e){console.warn('timelineTabs error', e)}
  })();
});
