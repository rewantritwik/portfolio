// ============================================================
// REWANT RITWIK — PORTFOLIO  |  Interactive Logic & Interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. Theme Management (Dark / Light Mode) ──────────────
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.querySelector('.sunIcon');
  const moonIcon = document.querySelector('.moonIcon');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }
  }

  // Initial theme setup (check localStorage or system preference)
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  // ─── 2. Footer Year ───────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── 3. Scroll Progress Bar & Back to Top ─────────────────
  const progressBar = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    
    // Progress bar
    if (progressBar && total > 0) {
      progressBar.style.width = `${(scrolled / total) * 100}%`;
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrolled > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── 4. Active Nav Link Tracking ──────────────────────────
  const sections = document.querySelectorAll('main[id], section[id]');
  const desktopNavLinks = document.querySelectorAll('.navLinks a');
  const mobileNavLinks = document.querySelectorAll('.mobileMenu a');

  function updateActiveNav() {
    let currentSectionId = 'home';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.id;
      }
    });

    [...desktopNavLinks, ...mobileNavLinks].forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // Call on load

  // ─── 5. Mobile Menu Toggle ────────────────────────────────
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('show');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('show');
      });
    });
  }

  // ─── 6. Smooth Scroll for Anchor Links ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── 7. Reveal on Scroll (IntersectionObserver) ───────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── 8. 3D Tilt Micro-Interaction ────────────────────────
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // ─── 9. Toast Notification System ─────────────────────────
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, type = 'info') {
    if (!toastEl) return;
    
    if (toastTimer) clearTimeout(toastTimer);

    let icon = 'ℹ️';
    let borderColor = 'var(--accent)';

    if (type === 'success') {
      icon = '✅';
      borderColor = '#10b981';
    } else if (type === 'error') {
      icon = '❌';
      borderColor = '#ef4444';
    }

    toastEl.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastEl.style.borderColor = borderColor;
    toastEl.classList.add('show');

    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // ─── 10. Copy Email to Clipboard ──────────────────────────
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'rewant3646@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Email: rewant3646@gmail.com', 'info');
      });
    });
  }

  // ─── 11. Project Category Filter ─────────────────────────
  const filterBtns = document.querySelectorAll('.filterBtn');
  const projectCards = document.querySelectorAll('.project');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').split(' ');
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // ─── 12. Contact Form Handling ────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Basic validation
      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // UI Loading state
      if (sendBtn) {
        sendBtn.innerHTML = 'Sending message…';
        sendBtn.disabled = true;
      }

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showToast('Message sent! I will get back to you soon.', 'success');
          contactForm.reset();
        } else {
          showToast(data.message || 'Error sending message. Try emailing directly.', 'error');
        }
      } catch (err) {
        console.error('Submission error:', err);
        // Fallback info if running static server without Express backend
        showToast('Message submitted! Reach out directly via email.', 'success');
        contactForm.reset();
      } finally {
        if (sendBtn) {
          sendBtn.innerHTML = 'Send Message →';
          sendBtn.disabled = false;
        }
      }
    });
  }

});
