/* ==========================================================================
   IRONPACK — Script (Fitnesxia-style redesign)
   ========================================================================== */

$(document).ready(function () {

  // 1. Custom Cursor
  const cursorDot = document.getElementById('cursor-dot');
  const cursorCircle = document.getElementById('cursor-circle');
  if (cursorDot && cursorCircle) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      cursorCircle.style.left = e.clientX + 'px';
      cursorCircle.style.top = e.clientY + 'px';
      cursorDot.classList.add('visible');
      cursorCircle.classList.add('visible');
    });
    document.querySelectorAll('a, button, [role="button"], .program-card, .coach-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorCircle.classList.add('hover-active');
        cursorDot.classList.add('hover-active');
      });
      el.addEventListener('mouseleave', () => {
        cursorCircle.classList.remove('hover-active');
        cursorDot.classList.remove('hover-active');
      });
    });
  }

  // 2. Scroll Progress Bar
  $(window).on('scroll', function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const progress = (scrollTop / docHeight) * 100;
    $('#top-scroll-progress').css('width', progress + '%');
  });

  // 3. Mobile Drawer
  $('#mobile-toggle-btn').on('click', function () {
    $(this).toggleClass('active');
    $('#mobile-drawer').toggleClass('open');
    $('#drawer-overlay').toggleClass('active');
    $('body').toggleClass('drawer-open');
  });
  $('#drawer-close-btn, #drawer-overlay').on('click', function () {
    $('#mobile-toggle-btn').removeClass('active');
    $('#mobile-drawer').removeClass('open');
    $('#drawer-overlay').removeClass('active');
    $('body').removeClass('drawer-open');
  });
  $('.drawer-link').on('click', function () {
    $('#mobile-toggle-btn').removeClass('active');
    $('#mobile-drawer').removeClass('open');
    $('#drawer-overlay').removeClass('active');
    $('body').removeClass('drawer-open');
  });

  // 4. Active Nav on Scroll
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));

  // 5. Fade In Animations
  const fadeEls = document.querySelectorAll('.fade-in-up');
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => fadeObs.observe(el));

  // 6. Spotlight Cards Mouse Effect
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // 7. Testimonials Swiper
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testi-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  }

  // 8. Pricing Toggle (cosmetic)
  $('.toggle-opt').on('click', function () {
    $('.toggle-opt').removeClass('active');
    $(this).addClass('active');
  });

  // 9. Modal
  window.openModal = function (planName, price) {
    $('#modal-plan-name').text(planName);
    $('#modal-plan-price').text(price);
    $('#modal-form').show();
    $('#modal-success').hide();
    $('#modal-overlay').addClass('active');
    $('body').css('overflow', 'hidden');
  };
  window.closeModal = function () {
    $('#modal-overlay').removeClass('active');
    $('body').css('overflow', '');
  };
  $('#modal-overlay').on('click', function (e) {
    if ($(e.target).is('#modal-overlay')) closeModal();
  });
  $('#modal-form').on('submit', function (e) {
    e.preventDefault();
    $(this).hide();
    $('#modal-success').fadeIn();
  });

  // 10. Contact Form
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    $('#contact-form').hide();
    $('#form-success').fadeIn();
  });

  // 11. Smooth scroll for anchor links
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 72 }, 600);
    }
  });

});
