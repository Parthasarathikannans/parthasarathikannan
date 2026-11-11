/**
 * Clean & Minimal Portfolio Application Logic
 * Color Accent: #C0392B / #BA372A
 */

(function () {
  // Toast Utility
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  window.showToast = function (message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  };

  // Copy to Clipboard
  window.copyText = function (text, label = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        window.showToast(label);
      }).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      window.showToast(label);
    } catch (e) {
      window.showToast('Copied!');
    }
    document.body.removeChild(el);
  }

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy');
      const label = el.getAttribute('data-copy-label') || 'Copied to clipboard!';
      window.copyText(val, label);
    });
  });

  // Mobile Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#121212';
        navMenu.style.padding = '24px';
        navMenu.style.borderBottom = '1px solid #222';
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navMenu.style.display = 'none';
        }
      });
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // Contact Form Handling (Strictly adhering to ethical form specification)
  const contactForm = document.getElementById('contact-form');
  const contactModal = document.getElementById('contact-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const modalMessageText = document.getElementById('modal-message-text');
  const modalOpenMail = document.getElementById('modal-open-mail');
  const modalCopy = document.getElementById('modal-copy');

  let currentMailtoUri = '';
  let currentRawMessage = '';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        window.showToast('Please fill in all required fields.');
        return;
      }

      currentRawMessage = `From: ${name} <${email}>\nSubject: ${subject}\n\nMessage:\n${message}`;
      const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
      const mailtoBody = encodeURIComponent(`Hello Parthasarathi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      currentMailtoUri = `mailto:parthasarathi.skannan@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      if (modalMessageText) {
        modalMessageText.textContent = currentRawMessage;
      }

      if (contactModal) {
        contactModal.classList.add('open');
      }
    });
  }

  if (modalOpenMail) {
    modalOpenMail.addEventListener('click', () => {
      if (currentMailtoUri) {
        window.location.href = currentMailtoUri;
      }
    });
  }

  if (modalCopy) {
    modalCopy.addEventListener('click', () => {
      if (currentRawMessage) {
        window.copyText(currentRawMessage, 'Message copied to clipboard!');
      }
    });
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (contactModal) contactModal.classList.remove('open');
    });
  });

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('open');
      }
    });
  }

  // Smooth Numeric Counter
  const growthNum = document.getElementById('growth-counter');
  if (growthNum && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let count = 0;
          const target = 25;
          const timer = setInterval(() => {
            count++;
            growthNum.textContent = `+${count}%`;
            if (count >= target) clearInterval(timer);
          }, 35);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(growthNum);
  }
})();
