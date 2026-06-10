'use strict';

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────────────────────────────────────────

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Artworks data ──────────────────────────────────────────────────────────────
// Mirrors the artworks array in public/app.js — same schema.
// To switch to API-driven rendering, replace the array in app.js with a
// fetch('/api/artworks') call; this endpoint is already wired.

const artworks = [
  {
    id:         1,
    title:      'Ochre Field',
    category:   'paintings',
    year:       2023,
    medium:     'Oil on canvas',
    dimensions: '120 × 90 cm',
    image:      'assets/artworks/ochre-field.jpg',
  },
  {
    id:         2,
    title:      'Study in Carbon',
    category:   'drawings',
    year:       2023,
    medium:     'Charcoal on paper',
    dimensions: '50 × 65 cm',
    image:      'assets/artworks/study-carbon.jpg',
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

// ── API: artworks ──────────────────────────────────────────────────────────────

app.get('/api/artworks', function (req, res) {
  res.json(artworks);
});

// ── API: contact ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contact', function (req, res) {
  var name    = (req.body.name    || '').trim();
  var email   = (req.body.email   || '').trim();
  var message = (req.body.message || '').trim();

  var errors = {};

  if (name.length < 2)          errors.name    = 'Name is required.';
  if (!EMAIL_RE.test(email))    errors.email   = 'A valid email address is required.';
  if (message.length < 10)      errors.message = 'Message must be at least 10 characters.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors: errors });
  }

  console.log('[contact] From: %s <%s>', name, email);
  console.log('[contact] Message: %s', message);

  res.json({
    success: true,
    message: 'Thank you. Your message has been received.',
  });
});

// ── Start ──────────────────────────────────────────────────────────────────────

app.listen(PORT, function () {
  console.log('Portfolio running at http://localhost:' + PORT + '/portfolio.html');
});
