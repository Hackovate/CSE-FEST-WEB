// Modern CSE FEST 2025 - Enhanced Interactivity & Animations

// Initialize AOS (Animate on Scroll) with modern settings
AOS.init({
  once: true,
  duration: 800,
  easing: 'ease-out-cubic',
  offset: 100,
  delay: 0
});

// Enhanced DOM ready function with modern features
document.addEventListener('DOMContentLoaded', function(){
  
  // Enhanced navbar scroll effect with better visibility
  const navbar = document.getElementById('mainNav');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.backdropFilter = 'blur(30px) saturate(180%)';
      navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
      navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.85)';
      navbar.style.backdropFilter = 'blur(30px) saturate(180%)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
    }
    
    // Add subtle scale effect to navbar brand on scroll
    const brand = navbar.querySelector('.navbar-brand');
    if (brand) {
      const scale = Math.max(0.95, 1 - (scrollTop * 0.0005));
      brand.style.transform = `scale(${scale})`;
    }
    
    lastScrollTop = scrollTop;
  });

  // Optimized smooth scroll with faster response
  function smoothScrollTo(target, duration = 500) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const navbarHeight = 80; // Height of fixed navbar
    const targetPosition = targetElement.offsetTop - navbarHeight - 10; // Reduced offset for faster positioning
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeOutQuart(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Faster easing function for more responsive feel
    function easeOutQuart(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }

  // Enhanced navigation with smooth scroll
  document.querySelectorAll('a.nav-link, a#joinBtn').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  // Modern loading animations
  function addLoadingAnimations() {
    const elements = document.querySelectorAll('.event-card, .about-card, .timeline-panel');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.6s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Enhanced gallery carousel
  const gallery = document.querySelector('#galleryCarousel');
  if(gallery){
    const carousel = bootstrap.Carousel.getOrCreateInstance(gallery, {
      interval: 5000, 
      ride: 'carousel',
      pause: 'hover'
    });
    
    // Add modern carousel indicators
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    indicators.style.position = 'absolute';
    indicators.style.bottom = '20px';
    indicators.style.left = '50%';
    indicators.style.transform = 'translateX(-50%)';
    indicators.style.zIndex = '10';
    
    const items = gallery.querySelectorAll('.carousel-item');
    items.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = index === 0 ? 'active' : '';
      indicator.style.width = '12px';
      indicator.style.height = '12px';
      indicator.style.borderRadius = '50%';
      indicator.style.border = 'none';
      indicator.style.margin = '0 5px';
      indicator.style.backgroundColor = index === 0 ? '#6366f1' : 'rgba(255,255,255,0.5)';
      indicator.style.transition = 'all 0.3s ease';
      indicator.style.cursor = 'pointer';
      
      indicator.addEventListener('click', () => {
        carousel.to(index);
      });
      
      indicators.appendChild(indicator);
    });
    
    gallery.appendChild(indicators);
  }

  // Enhanced form validation with modern feedback
  function createModernAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} modern-alert`;
    alert.style.cssText = `
      background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
      color: white;
      border: none;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-top: 1rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      transform: translateY(-10px);
      opacity: 0;
      transition: all 0.3s ease;
    `;
    alert.textContent = message;
    return alert;
  }

  // Enhanced registration form
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
      
      // Modern loading state
      const submitBtn = regForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      
      // Simulate async submission with modern feedback
      setTimeout(() => {
        const alert = createModernAlert('Registration received! We\'ll contact you soon.');
        regAlert.appendChild(alert);
        
        // Animate alert in
        setTimeout(() => {
          alert.style.transform = 'translateY(0)';
          alert.style.opacity = '1';
        }, 100);
        
        regForm.reset();
        regForm.classList.remove('was-validated');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove alert after 5 seconds
        setTimeout(() => {
          alert.style.transform = 'translateY(-10px)';
          alert.style.opacity = '0';
          setTimeout(() => alert.remove(), 300);
        }, 5000);
      }, 1500);
    });
  }

  // Enhanced contact form
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
      
      // Modern loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        const alert = createModernAlert('Message sent — thank you for reaching out!');
        contactAlert.appendChild(alert);
        
        setTimeout(() => {
          alert.style.transform = 'translateY(0)';
          alert.style.opacity = '1';
        }, 100);
        
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        setTimeout(() => {
          alert.style.transform = 'translateY(-10px)';
          alert.style.opacity = '0';
          setTimeout(() => alert.remove(), 300);
        }, 5000);
      }, 1500);
    });
  }

  // Enhanced timeline interaction with modern animations
  (function timelineTabs(){
    try{
      const dateButtons = Array.from(document.querySelectorAll('.timeline-dates .date-btn'));
      const panels = Array.from(document.querySelectorAll('.timeline-panel'));
      const track = document.querySelector('.timeline-track');

      function activateByTarget(targetId){
        // Enhanced button animations
        dateButtons.forEach(btn => {
          const wasActive = btn.classList.contains('active');
          btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
          
          if (!wasActive && btn.classList.contains('active')) {
            btn.style.transform = 'scale(1.05)';
            setTimeout(() => btn.style.transform = '', 200);
          }
        });
        
        // Enhanced panel animations
        panels.forEach(p => {
          const shouldBeActive = ('#' + p.id) === targetId;
          if (shouldBeActive && !p.classList.contains('active')) {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.classList.add('active');
            
            setTimeout(() => {
              p.style.transition = 'all 0.4s ease-out';
              p.style.opacity = '1';
              p.style.transform = 'translateY(0)';
            }, 100);
          } else if (!shouldBeActive) {
            p.classList.remove('active');
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
          }
        });
        
        if(track) track.style.transform = '';
      }

      dateButtons.forEach((btn, idx) => {
        btn.setAttribute('role','tab');
        btn.addEventListener('click', function(){ 
          activateByTarget(this.getAttribute('data-target')); 
        });
        btn.addEventListener('keydown', function(e){
          if(e.key === 'ArrowRight'){
            const next = dateButtons[(idx+1) % dateButtons.length]; 
            next.focus();
          }
          if(e.key === 'ArrowLeft'){
            const prev = dateButtons[(idx-1 + dateButtons.length) % dateButtons.length]; 
            prev.focus();
          }
          if(e.key === 'Enter' || e.key === ' '){ 
            activateByTarget(this.getAttribute('data-target')); 
          }
        });
      });

      if(track) track.style.transform = 'translateX(0)';

      window.addEventListener('resize', function(){
        const activeBtn = dateButtons.find(b => b.classList.contains('active'));
        if(activeBtn) activateByTarget(activeBtn.getAttribute('data-target'));
      });
    }catch(e){console.warn('timelineTabs error', e)}
  })();

  // Modern hover effects for cards
  document.querySelectorAll('.event-card, .about-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Enhanced accessibility
  document.querySelectorAll('.btn-close').forEach(btn => btn.setAttribute('aria-label','Close'));

  // Modern scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #0ea5e9);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // Initialize loading animations
  addLoadingAnimations();
});



// Modern intersection observer for lazy loading
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('loaded');
    }
  });
}, observerOptions);

document.querySelectorAll('.event-card, .about-card').forEach(el => {
  observer.observe(el);
});
