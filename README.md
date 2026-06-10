# Art Portfolio

A minimalist, contemporary art portfolio website. Vanilla HTML, CSS, and JavaScript on the frontend; Node.js + Express on the backend.

## Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | HTML5, CSS3, vanilla JavaScript         |
| Backend  | Node.js + Express                       |
| Styling  | CSS custom properties, fluid typography |

## Install

```bash
npm install
```

## Run

```bash
npm start          # production
npm run dev        # development — auto-restarts on file changes (requires nodemon)
```

Open **http://localhost:3000/portfolio.html**

## File structure

```
.
├── public/
│   ├── portfolio.html        Main page
│   ├── styles.css            Full CSS system (tokens → base → layout → components → responsive)
│   ├── app.js                All frontend logic
│   └── assets/
│       ├── artworks/         Artwork images  (.jpg / .png / .webp)
│       ├── artist/           Artist portrait (portrait.jpg)
│       └── icons/            Custom SVG icons (optional)
├── server.js                 Express server + API endpoints
├── package.json
└── README.md
```

## Customization

### Artist name, tagline, and bio

Edit `portfolioConfig` at the top of `public/app.js`:

```js
const portfolioConfig = {
  artistName: 'Your Name',
  tagline:    'Your tagline.',
  bio:        'Your bio text.',
  email:      'you@example.com',
};
```

The bio is injected into the About section automatically.

### Artist portrait

Place a file named `portrait.jpg` in `public/assets/artist/`. Any format supported by `<img>` works. The image fills a 3:4 aspect-ratio frame — portrait orientation works best.

### Artworks

Edit the `artworks` array in `public/app.js`. Each entry needs:

```js
{
  id:         1,           // unique integer
  title:      'Title',
  category:   'paintings', // 'paintings' or 'drawings'
  year:       2024,
  medium:     'Oil on canvas',
  dimensions: '80 × 100 cm',
  image:      'assets/artworks/filename.jpg',
}
```

Place image files in `public/assets/artworks/`. The backend (`server.js`) also holds a copy of the same array for the `/api/artworks` endpoint — keep them in sync when adding works, or wire `app.js` to fetch from the API instead.

### Adding a new filter category

1. Add a button to the filter bar in `portfolio.html`:
   ```html
   <button class="filter-btn" data-filter="prints" type="button" aria-pressed="false">Prints</button>
   ```
2. Use the same string (`"prints"`) as the `category` field in your artwork objects.

### Colors and typography

All design tokens live at the top of `public/styles.css` under `/* 1. TOKENS */`.

Key variables to change:

| Variable            | Default     | Purpose                  |
|---------------------|-------------|--------------------------|
| `--color-accent`    | `#b8860b`   | Ochre/dark yellow accent |
| `--color-bg`        | `#ffffff`   | Page background (light)  |
| `--color-fg`        | `#111111`   | Primary text (light)     |
| `--font-display`    | Georgia     | Headings and logo        |
| `--font-body`       | System sans | Body text                |

Dark-mode overrides are in the `[data-theme="dark"]` block immediately below `:root`.

### Port

The server defaults to port **3000**. Set the `PORT` environment variable to change it:

```bash
PORT=8080 npm start
```
