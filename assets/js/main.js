(function() {
  "use strict";

  /**
   * Easy selector helper
   */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Light / Dark theme toggle
   */
  const themeToggle = select('.theme-toggle');
  const themeIcon = themeToggle && themeToggle.querySelector('i');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) { themeIcon.classList.remove('bi-moon'); themeIcon.classList.add('bi-sun'); }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) { themeIcon.classList.remove('bi-sun'); themeIcon.classList.add('bi-moon'); }
    }
  };

  // Apply stored preference (icon sync — attribute already set by inline script)
  const storedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  /**
   * Topbar scrolled state
   */
  const topbar = select('#topbar');
  const updateTopbar = () => {
    if (topbar) {
      topbar.classList.toggle('scrolled', window.scrollY > 20);
    }
  };
  window.addEventListener('scroll', updateTopbar);
  updateTopbar();

  /**
   * Mobile nav toggle
   */
  const mobileToggle = select('.mobile-nav-toggle');
  const navbar = select('#navbar');
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x');
      }
    });
  }

  /**
   * Smooth scroll for .scrollto links (offset for fixed topbar)
   */
  const scrollto = (hash) => {
    const el = select(hash);
    if (!el) return;
    const offset = 64; // topbar height
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  document.addEventListener('click', (e) => {
    const link = e.target.closest('.scrollto');
    if (!link || !link.hash) return;
    const target = select(link.hash);
    if (!target) return;
    e.preventDefault();
    // Close mobile nav if open
    if (navbar && navbar.classList.contains('mobile-open')) {
      navbar.classList.remove('mobile-open');
      const icon = mobileToggle && mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('bi-list');
        icon.classList.remove('bi-x');
      }
    }
    scrollto(link.hash);
  });

  /**
   * Scroll on page load if URL has a hash
   */
  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /**
   * Active nav link on scroll
   */
  const navLinks = select('#navbar .nav-link', true);
  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 80;
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = select(link.hash);
      if (!section) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);

  /**
   * Back to top button
   */
  const backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('load', toggleBacktotop);
    window.addEventListener('scroll', toggleBacktotop);
    backtotop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Hero typed effect
   */
  const typed = select('.typed');
  if (typed) {
    let strings = typed.getAttribute('data-typed-items').split(',').map(s => s.trim());
    new Typed('.typed', {
      strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000
    });
  }

  /**
   * AOS init
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

})();
