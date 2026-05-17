# memory-presentation

React + Vite presentation deck for GHCP session best practices.

## Dev server

The system Node (v14) is too old for Vite 8. Use the Node 20 binary directly:

```bash
~/.nvm/versions/node/v20.20.2/bin/node node_modules/.bin/vite
```

Then open http://localhost:5173.

> `npm run dev` will not work because the `prefix` entry in `~/.npmrc` conflicts with nvm, and the fallback system Node is v14.

## Project structure

```
src/
  docs/          # One file per slide — edit these to change slide content
  assets/        # Images used by slides
  App.jsx        # Slide renderer — add new layout branches here
  App.css        # All styles
  index.css      # Global background and font
```

## Adding a slide

1. Create `src/docs/slide-NN-name.js` and export a slide object with a `layout` field.
2. Import and add it to the array in `src/docs/index.js`.
3. Add a layout branch in `App.jsx` if the layout is new.
4. Add styles to `App.css`.

## Layouts

| layout | used by | description |
|---|---|---|
| *(none)* | slides 6–8 (default) | white card, eyebrow, bullet list |
| `image` | slide 1 | full-page image |
| `question` | slide 2 | large centred question text |
| `heading+image` | slide 3 | heading with glow + image below |
| `dark-list` | slide 4 | dark full-screen, title with glow, numbered list left / blank right |
| `rule-zero` | slide 5 | dark hero: label, headline, subtitle, three icon cards |
| `content-card` | slide 6 | dark full-screen, title, subtitle, dark card with arrow bullets |
| `comparison-cards` | slide 7 | dark full-screen, title, two side-by-side cards with icon + highlighted bullet points |

## Colour scheme (dark slides)

- Headline: `#ffffff` with `text-shadow: 0 0 40px rgba(0,229,255,0.6), 0 0 80px rgba(0,229,255,0.3)`
- Accent / borders: `#3f51b5` (indigo)
- Secondary accent / arrows / numbers: `#90caf9` (light blue)
- Muted text: `rgba(255,255,255,0.6)`
