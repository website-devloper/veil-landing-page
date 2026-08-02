/* Brand lives here alone — renaming the product is a one-line edit. */
export const BRAND = {
  name: "VEIL",
  tagline: "Step Inside The Game",
  line: "A standalone headset built around the player.",
  phone: "06 87 63 37 74",
  phoneHref: "tel:0687633774"
};

/* All page copy in one place, so components stay presentational. */

export const VR_GAMES = [
  {
    slug: "blade-and-sorcery",
    title: "Blade & Sorcery: Nomad",
    genre: "Physics Combat",
    meta: "Single player",
    text: "A fully physics-driven medieval combat simulator. Every swing carries weight, every parry is yours — the must-have for standalone headsets."
  },
  {
    slug: "beat-saber",
    title: "Beat Saber",
    genre: "Rhythm",
    meta: "Endless",
    text: "Slash neon blocks apart in time with the music. The game that turns a living room into a workout you forget you are doing."
  },
  {
    slug: "red-matter-2",
    title: "Red Matter 2",
    genre: "Sci-Fi Puzzle",
    meta: "Story · 8h",
    text: "A narrative-driven puzzle adventure with some of the most convincing graphics standalone hardware has ever rendered."
  },
  {
    slug: "walkabout-mini-golf",
    title: "Walkabout Mini Golf",
    genre: "Social",
    meta: "Up to 8 players",
    text: "Physics-accurate courses built for company. The most quietly addictive multiplayer on the platform."
  },
  {
    slug: "a-fishermans-tale",
    title: "A Fisherman's Tale",
    genre: "Perspective Puzzle",
    meta: "Story · 3h",
    text: "A mind-bending puzzle box that plays with scale and perspective in ways only virtual reality can hold together."
  },
  {
    slug: "pistol-whip",
    title: "Pistol Whip",
    genre: "Rhythm Shooter",
    meta: "Arcade",
    text: "An on-rails shooter scored to a soundtrack, engineered to make you feel like the lead of an action film."
  }
];

export const AUDIO_GAMES = [
  {
    slug: "alien-isolation",
    title: "Alien: Isolation",
    tag: "Survival Horror",
    text: "Hearing the Xenomorph move through the vents above you is not atmosphere — it is the mechanic that keeps you alive."
  },
  {
    slug: "dead-space",
    title: "Dead Space (Remake)",
    tag: "Horror",
    text: "Every creaking beam and distant necromorph screech isolated in its own space. Terror built out of sound design."
  },
  {
    slug: "hunt-showdown",
    title: "Hunt: Showdown",
    tag: "Extraction PvP",
    text: "Built entirely around audio cues. Tracking footsteps and startled crows is the difference between the payout and the grave."
  },
  {
    slug: "the-last-of-us",
    title: "The Last of Us Part I & II",
    tag: "Action Drama",
    text: "Naughty Dog's spatial mix lets you pinpoint a clicker by ear alone, long before the camera ever finds it."
  },
  {
    slug: "hellblade",
    title: "Hellblade: Senua's Sacrifice",
    tag: "Narrative Action",
    text: "Binaural audio places the voices inside Senua's head around yours. Headphones are not recommended here — they are required."
  },
  {
    slug: "warzone-apex",
    title: "Warzone / Apex Legends",
    tag: "Battle Royale",
    text: "Directional footsteps and gunfire are competitive information. Playing these on speakers is playing them blind."
  }
];

/* Short values only — a spec grid reads as engineering when nothing wraps.
   Anything qualifying goes in `note`, at a smaller size underneath. */
export const SPECS = [
  { label: "Display", value: "Dual 4K", note: "micro-OLED, per eye" },
  { label: "Refresh", value: "120 Hz", note: "90 Hz battery mode" },
  { label: "Field of view", value: "110°", note: "horizontal" },
  { label: "Tracking", value: "6DoF", note: "inside-out, no base stations" },
  { label: "Audio", value: "Spatial", note: "dual-driver, off-ear" },
  { label: "Weight", value: "428 g", note: "including head strap" },
  { label: "Battery", value: "3 hrs", note: "90 min to full charge" },
  { label: "Storage", value: "512 GB", note: "256 GB option" }
];

export const STEPS = [
  {
    no: "01",
    title: "Unbox and wear",
    text: "No base stations, no cables to route, no PC in the loop. Power on and it finds your room."
  },
  {
    no: "02",
    title: "Draw your space",
    text: "Trace the floor once. It remembers your walls and warns you long before you reach one."
  },
  {
    no: "03",
    title: "Play, then unplug",
    text: "Lift it off, connect to your console, and keep the spatial audio for everything else you play."
  }
];

export const FAQS = [
  {
    q: "Does it need a PC or a console?",
    a: "No. Everything runs on the headset itself. You can tether it to a PC for higher-fidelity titles, but nothing in the library requires it."
  },
  {
    q: "Can I wear it with glasses?",
    a: "Yes. The facial interface ships with a spacer that clears most frames, and the lens separation adjusts continuously rather than in fixed steps."
  },
  {
    q: "What happens when the battery runs out?",
    a: "Roughly three hours of play, and it charges to full in ninety minutes. It also plays indefinitely while charging from any USB-C source."
  },
  {
    q: "Is the audio any good away from VR?",
    a: "That is the point of the second half of this page. The same spatial engine works over USB-C or Bluetooth with a console, a PC or a phone."
  }
];
