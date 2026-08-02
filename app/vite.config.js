import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(here, "../assets");

/* Source media the deployed files were derived from. Never bundle it: the
   videos alone are 68MB. Also gitignored, so a CI build and a local build
   produce the same output. */
const EXCLUDE_DIRS = [
  path.join(ASSETS, "videos"),
  path.join(ASSETS, "images", "games", "_source"),
  path.join(ASSETS, "webfonts")
];

/*
  Locally, app/public/assets is a Windows directory junction to ../assets — handy
  for `vite dev`, but it cannot survive a git clone, and at build time Vite would
  copy everything behind it including the 68MB of source video.

  So: publicDir serves assets in dev only, and this plugin does the build-time
  copy with the filtering Vite's own copy cannot express.
*/
function assetsBridge() {
  return {
    name: "assets-bridge",
    apply: "build",
    closeBundle() {
      if (!fs.existsSync(ASSETS)) {
        this.warn("assets/ not found — the build will have no media");
        return;
      }
      fs.cpSync(ASSETS, path.resolve(here, "dist/assets"), {
        recursive: true,
        dereference: true,
        filter: (src) => {
          if (EXCLUDE_DIRS.some((d) => src === d || src.startsWith(d + path.sep)))
            return false;
          // full-res stills the 420-frame sequence was cut from
          if (/[\\/]frames[\\/]scene\d+\.png$/i.test(src)) return false;
          return true;
        }
      });
    }
  };
}

export default defineConfig(({ command }) => ({
  // GitHub Pages serves at /<repo>/ unless a custom domain is set.
  // Override at build time:  VITE_BASE=/veil-landing/ npm run build
  base: process.env.VITE_BASE || "/",
  plugins: [react(), assetsBridge()],

  // dev reads through the junction; build uses assetsBridge instead, so the
  // unfiltered publicDir copy never runs
  publicDir: command === "serve" ? "public" : false,

  build: { outDir: "dist", assetsInlineLimit: 0 },
  server: { open: true }
}));
