import Rise from "./Rise";
import SplitHeading from "./SplitHeading";
import useSpotlight from "./useSpotlight";
import Art from "./Art";
import { VR_GAMES, AUDIO_GAMES } from "../data/content";

/*
  Plain responsive grid. A pinned horizontal rail was tried here and pulled:
  it only ever revealed part of the set at a time, which is a worse way to show
  six games than simply showing six games.
*/
export function Games() {
  const spotlight = useSpotlight(".game-poster");

  return (
    <section className="band" id="games">
      <div className="band-glow" />
      <div className="band-inner">
        <header className="band-head">
          <Rise as="span" className="band-eyebrow" y={22}>
            Built For VR
          </Rise>
          <SplitHeading className="band-title" text="Games That Need *Your Hands*" />
          <Rise as="p" className="band-lede" y={30} i={2}>
            These require the headset and motion controllers — they place you
            inside the environment rather than in front of it.
          </Rise>
        </header>

        <div className="game-grid" {...spotlight}>
          {VR_GAMES.map((g, i) => (
            <Rise key={g.slug} className="game" y={72} scale={0.965} i={i}>
              <a className="game-poster" href="#preorder" aria-label={g.title}>
                <Art
                  className="game-art"
                  src={`/assets/images/games/${g.slug}.jpg`}
                  alt=""
                />
                <span className="game-sheen" />
                <span className="game-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="game-genre">{g.genre}</span>
              </a>
              <div className="game-body">
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <span className="game-meta">{g.meta}</span>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AudioGames() {
  return (
    <section className="band band-audio" id="audio">
      <div className="band-glow" />
      <div className="band-inner">
        <header className="band-head">
          <Rise as="span" className="band-eyebrow" y={22}>
            Enhanced By 3D Audio
          </Rise>
          <SplitHeading className="band-title" text="And Everything *Else You Play*" />
          <Rise as="p" className="band-lede" y={30} i={2}>
            No VR here. These are monitor and TV games where wearing the headset
            turns sound into information you can act on.
          </Rise>
        </header>

        <div className="audio-list">
          {AUDIO_GAMES.map((g, i) => (
            <Rise key={g.slug} className="audio-row" y={40} x={-30} i={i}>
              <span className="audio-no">{String(i + 1).padStart(2, "0")}</span>
              <Art
                className="audio-art"
                src={`/assets/images/games/${g.slug}.jpg`}
                alt=""
              />
              <div className="audio-copy">
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
              <span className="audio-tag">{g.tag}</span>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
