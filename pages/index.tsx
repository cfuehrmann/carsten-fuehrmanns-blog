import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Date from "../components/date";
import { meta as websiteAttacks } from "./website-attacks-by-origin";
import { meta as typeScriptQuality } from "./typescript-quality";
import { meta as stanfordQuantum } from "./stanford-online-quantum-mechanics";
import { meta as parametricOscillator } from "./parametric-oscillator";
import { meta as forayPhysics } from "./foray-physics";
import { meta as infiniteResource } from "./review-infinite-resource";
import { meta as dbClassSummary } from "./dbclass-summary";
import { meta as laserEyeMonsterCats } from "./my-laser-eye-monster-cats";
import { meta as hdrWithSmartphone } from "./hdr_with_smartphone";
import { meta as empireCatBuilding } from "./the-empire-cat-building";
import { meta as whyDoIStartMyOwnBlog } from "./why-do-i-start-my-own-blog";
import StaticHtml, { StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async (
  context
) => {
  const inner = (
    <>
      <h1>Carsten Führmann's website</h1>
      <p>Computer scientist and software engineer. More interests than time.</p>

      <h2>Posts</h2>

      <Abstract {...websiteAttacks} target="website-attacks-by-origin">
        Remarkable insights about bad HTTP traffic to my website, gained from
        the logs of my home server.
      </Abstract>

      <Abstract {...typeScriptQuality} target="typescript-quality">
        A long article where I made a bet on TypeScript before it went viral. It
        also contains a fun implementation of Conway's Game of Life. My bet
        overachieved: TypeScript and related technologies evolved so much since
        then that my article now looks retro
      </Abstract>

      <Abstract {...stanfordQuantum} target="stanford-online-quantum-mechanics">
        My experience with the online course "Quantum Mechanics for Scientists
        and Engineers" from the University of Stanford
      </Abstract>

      <Abstract {...parametricOscillator} target="parametric-oscillator">
        Research notes about the "parametric oscillator": a harmonic oscillator
        whose parameters oscillate in time. For example, a child pumping a swing
        by periodically standing and squatting
      </Abstract>

      <Abstract {...forayPhysics} target="foray-physics">
        Trying to get the hang of classical mechanics, I described a "soap
        slipping around in a bath tub" as a "Lagrangian" and visualized the
        system using Mathematica
      </Abstract>

      <Abstract {...infiniteResource} target="review-infinite-resource">
        The public awareness of climate change has strongly risen since the time
        I wrote this review. I still recommend the book, though I no longer
        share its optimism as I used to
      </Abstract>

      <Abstract {...dbClassSummary} target="dbclass-summary">
        My experience with the online course "Introduction to Databases" from
        the University of Stanford
      </Abstract>

      <Abstract {...laserEyeMonsterCats} target="my-laser-eye-monster-cats">
        A fun image of our two black cats (one of who has passed away)
        encountering a neighbor cat. Not the greatest contribution to the web, I
        keep it here for emotional reasons
      </Abstract>

      <Abstract {...hdrWithSmartphone} target="hdr_with_smartphone">
        My early experiment with high-dynamic-range photography. Seen from years
        later, it looks nostalgic, since many standard photo apps seem to have
        HDR built in without mention
      </Abstract>

      <Abstract {...empireCatBuilding} target="the-empire-cat-building">
        An image of our bygone cat "Mokka" on our bygone "Empire cat building".
        Not the greatest contribution to the web, but I keep it here for
        emotional reasons
      </Abstract>

      <Abstract {...whyDoIStartMyOwnBlog} target="why-do-i-start-my-own-blog">
        My 2012 arguments for starting my own blog, still mostly valid
      </Abstract>
    </>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return {
    props: {
      staticHtml,
      title: "Home",
      description: "Home page of Carsten Führmann",
      page: "",
    },
  };
};

function Abstract(props: {
  title: string;
  target: string;
  date: string;
  children: React.ReactNode;
}) {
  const { title, target, date, children } = props;

  return (
    <a href={`${target}/`} style={{ textDecoration: "none" }}>
      <div className="w3-card w3-text-black">
        <div className="w3-container">
          <h3>{title}</h3>
          <small className="w3-text-grey">
            <Date dateString={date} />
          </small>
          <p>
            <em>{children}...</em>
          </p>
        </div>
      </div>
      <br />
    </a>
  );
}
