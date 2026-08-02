import { useCallback, useState } from "react";
import useLenis from "./components/useLenis";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Games, AudioGames } from "./components/Games";
import Specs from "./components/Specs";
import Marquee from "./components/Marquee";
import { Preorder, Faq, Footer } from "./components/Closing";

import "./styles/story.css";
import "./styles/landing.css";

export default function App() {
  useLenis();

  // the hero owns the frame loader; the intro only reports what it says
  const [progress, setProgress] = useState(0);
  const onProgress = useCallback((v) => setProgress(v), []);

  return (
    <>
      <Intro progress={progress} />
      <Header />

      <main id="top">
        <Hero onProgress={onProgress} />
        <Games />
        <Marquee />
        <AudioGames />
        <Specs />
        <Marquee
          items={[
            "Reserve now",
            "$599",
            "512 GB",
            "Two controllers included",
            "Free shipping worldwide"
          ]}
          speed={38}
          className="is-accent"
        />
        <Preorder />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
