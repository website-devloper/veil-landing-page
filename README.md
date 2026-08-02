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

Hosted on Vercel. Import the repo at [vercel.com/new](https://vercel.com/new)
and accept the defaults — `vercel.json` already declares the build:

| setting | value |
|---|---|
| install | `cd app && npm ci` |
| build | `cd app && npm run build` |
| output | `app/dist` |

It serves from the domain root, so no base path is needed. Every push to `main`
redeploys, and pull requests get their own preview URL.

`vercel.json` also sets real security headers, which a purely static host
cannot: CSP, HSTS, `nosniff`, frame-deny, and a one-year immutable cache on
`/assets/images/*` — which matters here, since the hero alone is 420 files.

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
