# VEIL — landing page

A single-page product landing site for a fictional standalone VR headset.
The hero is a 35-second continuous take, exported as a 420-frame sequence and
scrubbed by scroll, so the camera never cuts between story beats.

**Stack:** React 18 · Vite 5 · Framer Motion 12 · Lenis

---

## Running it

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # -> app/dist
npm run preview    # serve the built output
```

## Layout

```
app/                    the site
  src/components/       Hero, Games, Specs, Closing, Marquee, Intro …
  src/data/content.js   ALL copy and product data — edit here, not in components
  src/styles/           story.css (hero) + landing.css (everything else)
assets/images/frames/seq/   the 420-frame hero sequence
assets/images/games/    key art for the twelve titles
_legacy/                the retired static build, kept for reference
```

### How the hero works

`useFrameSequence` paints frames to a canvas from a scroll MotionValue, outside
React's render cycle — 420 frames through state would be tens of thousands of
renders per scroll. Frames load coarse-to-fine (every 56th first, then filling
in), so the whole timeline is scrubbable in about a second. On narrow screens or
a metered connection it uses every second frame, halving the bytes.

### Assets in dev vs build

`app/public/assets` is a Windows directory junction to `../assets`, so dev has
one source of truth for media. It cannot survive a git clone, so `vite.config.js`
disables `publicDir` for builds and copies `../assets` itself, filtering out the
68MB of source video. Local and CI builds produce identical output.

---

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes
to GitHub Pages. Enable it once at **Settings → Pages → Source → GitHub Actions**.

If the site is served from `https://<user>.github.io/<repo>/` rather than a
custom domain, the base path must match:

```yaml
- run: VITE_BASE=/<repo>/ npm run build
```

---

## About this project

A **portfolio / concept piece**, not a commercial product and not for sale.
VEIL does not exist; every specification, price and date on the page is invented.

Game key art in `assets/images/games/` remains the property of its respective
publishers and is shown here only to illustrate a design concept. No affiliation
or endorsement is implied. If you are a rights holder and would like an image
removed, open an issue.

### Known incomplete, by design

- The pre-order form sets local state and shows a confirmation — it captures
  nothing and posts nowhere.
- The phone number uses a national `tel:` link and will not dial from abroad.
