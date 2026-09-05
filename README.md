# Reetu Thimmaiah — Portfolio

Static site. No build step, no dependencies to install.

## Structure

```
index.html          the whole page (markup only)
css/tokens.css      colour, type, spacing, radius and shadow tokens
css/styles.css      design-system stylesheet
js/main.js          nav, scroll progress, awards hub, reveal-on-scroll
images/*.jpg        portrait, award photo, yoga gallery
```

`css/tokens.css` must load before `css/styles.css` — every rule in the stylesheet
reads its custom properties.

## Local preview

Open `index.html` directly in a browser, or serve the folder over HTTP:

```
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Vercel

```
npm i -g vercel
vercel
```

No framework preset, no build command, output directory `.`. Or connect the GitHub
repo in the Vercel dashboard and set the framework to "Other".

## Network requirements

One thing loads from a public CDN at runtime:

- **Karla + Newsreader** (Google Fonts) — declared in `index.html`

Everything else is local. To go fully offline, self-host the two font families and
replace the `<link>` tags with an `@font-face` block in `css/tokens.css`.
