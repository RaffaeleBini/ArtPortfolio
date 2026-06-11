/* =============================================================================
   CONFIGURATION — edit artist info here
   ============================================================================= */

const portfolioConfig = {
  artistName: 'Raffaele Bini',
  tagline:    'Creative Engineer based in Santiago de Compostela.',
  bio:        'Raffaele Bini (b. 1978, Florence) works in watercolours, markers, pencils and more... '
            + 'Discontinuous, anarchyst and selfish style, exploring creativity in daily life.'
            + 'Every day is a new experience and offers something to learn. '
            + 'A Florentine spirit that happily lives in Santiago de Compostela.',
  email:  'Coming soon...',
  social: {
    instagram: 'https://www.instagram.com/raffaeleb/',
  },
};

/* =============================================================================
   ARTWORKS — edit or extend this array
   Each entry: id, title, category ('paintings' | 'drawings'),
               year, medium, dimensions, image (path relative to public/)
   ============================================================================= */

const artworks = [
  {
    id:         1,
    title:      'Abu Simbel',
    category:   'paintings',
    year:       2024,
    medium:     'Watercolour',
    dimensions: '30 × 40 cm',
    image:      'assets/artworks/AbusimbelWatercolour.png.jpg',
  },
  {
    id:         2,
    title:      'Fencing',
    category:   'drawings',
    year:       2018,
    medium:     'Charcoal on paper',
    dimensions: '29 × 21 cm',
    image:      'assets/artworks/FencingDrawing.png',
  },
  {
    id:         3,
    title:      'Still Ground',
    category:   'paintings',
    year:       2022,
    medium:     'Oil on linen',
    dimensions: '80 × 100 cm',
    image:      'assets/artworks/still-ground.jpg',
  },
  {
    id:         4,
    title:      'Vertical I',
    category:   'drawings',
    year:       2022,
    medium:     'Graphite on paper',
    dimensions: '42 × 59 cm',
    image:      'assets/artworks/vertical-i.jpg',
  },
  {
    id:         5,
    title:      'The Pale Shore',
    category:   'paintings',
    year:       2021,
    medium:     'Oil on canvas',
    dimensions: '100 × 70 cm',
    image:      'assets/artworks/pale-shore.jpg',
  },
  {
    id:         6,
    title:      'Gesture IV',
    category:   'drawings',
    year:       2021,
    medium:     'Ink on paper',
    dimensions: '30 × 40 cm',
    image:      'assets/artworks/gesture-iv.jpg',
  },
  {
    id:         7,
    title:      'Interior Light',
    category:   'paintings',
    year:       2020,
    medium:     'Oil on board',
    dimensions: '60 × 60 cm',
    image:      'assets/artworks/interior-light.jpg',
  },
  {
    id:         8,
    title:      'Figure Study VII',
    category:   'drawings',
    year:       2020,
    medium:     'Charcoal on paper',
    dimensions: '50 × 70 cm',
    image:      'assets/artworks/figure-study-vii.jpg',
  },
];

/* =============================================================================
   HELPERS
   ============================================================================= */

function $(id) {
  return document.getElementById(id);
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* =============================================================================
   THEME
   ============================================================================= */

function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var btn = $('theme-toggle');
  if (btn) {
    btn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

function initTheme() {
  // Inline <script> in <head> already set data-theme from prefers-color-scheme.
  // Sync the button label to match the current theme.
  applyTheme(getTheme());

  $('theme-toggle').addEventListener('click', function () {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
}

/* =============================================================================
   NAVIGATION — smooth scroll respecting reduced-motion
   ============================================================================= */

function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/* =============================================================================
   GALLERY — render and filter
   ============================================================================= */

function renderGallery(filter) {
  var grid = $('gallery-grid');
  var list = filter === 'all'
    ? artworks
    : artworks.filter(function (a) { return a.category === filter; });

  grid.innerHTML = '';

  list.forEach(function (artwork) {
    var card       = document.createElement('article');
    var imageWrap  = document.createElement('div');
    var img        = document.createElement('img');
    var info       = document.createElement('div');
    var titleEl    = document.createElement('h3');
    var metaEl     = document.createElement('p');

    card.className = 'artwork-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', artwork.title + ', ' + artwork.medium + ', ' + artwork.year);
    card.dataset.id = artwork.id;

    imageWrap.className = 'card-image';

    img.src     = artwork.image;
    img.alt     = artwork.title + ' — ' + artwork.medium;
    img.loading = 'lazy';
    img.onerror = function () {
      img.style.display = 'none';
    };

    info.className      = 'card-info';
    titleEl.className   = 'card-title';
    titleEl.textContent = artwork.title;
    metaEl.className    = 'card-meta';
    metaEl.textContent  = artwork.medium + ', ' + artwork.year;

    imageWrap.appendChild(img);
    info.appendChild(titleEl);
    info.appendChild(metaEl);
    card.appendChild(imageWrap);
    card.appendChild(info);

    card.addEventListener('click', function () { openModal(artwork); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(artwork);
      }
    });

    grid.appendChild(card);
  });
}

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      renderGallery(btn.dataset.filter);
    });
  });
}

/* =============================================================================
   MODAL / LIGHTBOX
   ============================================================================= */

var lastFocusedElement = null;

function openModal(artwork) {
  var modal   = $('modal');
  var img     = $('modal-image');
  var titleEl = $('modal-title');
  var metaEl  = $('modal-meta');

  img.src     = artwork.image;
  img.alt     = artwork.title + ' — ' + artwork.medium;
  titleEl.textContent = artwork.title;
  metaEl.textContent  = [artwork.medium, artwork.dimensions, artwork.year]
    .filter(Boolean)
    .join(' · ');

  lastFocusedElement = document.activeElement;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  $('modal-close').focus();
}

function closeModal() {
  var modal = $('modal');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function initModal() {
  var modal    = $('modal');
  var backdrop = modal.querySelector('.modal-backdrop');

  $('modal-close').addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  // Focus trap inside modal
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || modal.hasAttribute('hidden')) return;

    var focusable = Array.from(
      modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled; });

    if (!focusable.length) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* =============================================================================
   CONTACT FORM
   ============================================================================= */

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(field, message) {
  var errorEl = $('error-' + field);
  var inputEl = $('field-' + field);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) inputEl.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function clearFormState() {
  ['name', 'email', 'message'].forEach(function (f) { setFieldError(f, ''); });
  var status = $('form-status');
  status.textContent = '';
  status.className   = 'form-status';
}

function validateLocal(data) {
  var errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  if (!data.email || !EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

function initContactForm() {
  var form = $('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearFormState();

    var data = {
      name:    form.elements['name'].value,
      email:   form.elements['email'].value,
      message: form.elements['message'].value,
    };

    var errors = validateLocal(data);

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(function (f) { setFieldError(f, errors[f]); });
      var firstKey   = Object.keys(errors)[0];
      var firstInput = $('field-' + firstKey);
      if (firstInput) firstInput.focus();
      return;
    }

    var btn    = form.querySelector('.btn-submit');
    var status = $('form-status');
    btn.disabled    = true;
    btn.textContent = 'Sending…';

    fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          status.textContent = json.message || 'Thank you. Your message has been received.';
          status.className   = 'form-status success';
          form.reset();
          ['name', 'email', 'message'].forEach(function (f) {
            var el = $('field-' + f);
            if (el) el.removeAttribute('aria-invalid');
          });
        } else {
          if (json.errors) {
            Object.keys(json.errors).forEach(function (f) {
              setFieldError(f, json.errors[f]);
            });
          }
          status.textContent = 'Please correct the errors above.';
          status.className   = 'form-status error';
        }
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please try again.';
        status.className   = 'form-status error';
      })
      .finally(function () {
        btn.disabled    = false;
        btn.textContent = 'Send message';
      });
  });
}

/* =============================================================================
   STATIC CONTENT — bio and footer year
   ============================================================================= */

function initContent() {
  var bioEl = $('about-bio');
  if (bioEl) bioEl.textContent = portfolioConfig.bio;

  var yearEl = $('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* =============================================================================
   BOOT
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initNavigation();
  initContent();
  renderGallery('all');
  initFilters();
  initModal();
  initContactForm();
});
