/*
  Resolve a public-folder path against the deploy base.

  Vite rewrites asset URLs it can see in the bundle, but paths built at runtime
  — the 420 frame filenames, game art from a slug — are opaque strings it never
  touches. Hardcoding "/assets/..." works at the domain root and 404s everywhere
  else, which is exactly what GitHub Pages serving from /<repo>/ does.

  import.meta.env.BASE_URL is "/" in dev and "/veil-landing-page/" in the Pages
  build, so this is correct in both without a config switch.
*/
const BASE = import.meta.env.BASE_URL || "/";

export default function asset(path) {
  return BASE.replace(/\/+$/, "") + "/" + String(path).replace(/^\/+/, "");
}
