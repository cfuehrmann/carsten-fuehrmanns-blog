import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import { meta as parametricOscillator } from "./parametric-oscillator";
import { meta as forayPhysics } from "./foray-physics";
import { meta as dbClassSummary } from "./dbclass-summary";
import { meta as stanfordQuantum } from "./stanford-online-quantum-mechanics";
import StaticHtml from "../components/static-html";

export default StaticHtml;

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <>
      <h1>Carsten Führmann</h1>
      <p>Computer scientist and software engineer. More interests than time.</p>

      <h2>Posts</h2>

      <Abstract {...stanfordQuantum} target="stanford-online-quantum-mechanics">
        My experience with the online course "Quantum Mechanics for Scientists
        and Engineers" from the University of Stanford.
      </Abstract>

      <Abstract {...parametricOscillator} target="parametric-oscillator">
        Research notes about the "parametric oscillator": a harmonic oscillator
        whose parameters oscillate in time. For example, a child pumping a swing
        by periodically standing and squatting
      </Abstract>

      <Abstract {...forayPhysics} target="foray-physics">
        Trying to get the hang of Classical Mechanics, I described a "soap
        slipping around in a bath tub" as a "Lagrangian" and visualized the
        system using Mathematica
      </Abstract>

      <Abstract {...dbClassSummary} target="dbclass-summary">
        My experience with the online course "Introduction to Databases" from
        the University of Stanford.
      </Abstract>
    </>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
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
          <p>
            <em>{children}...</em>
          </p>
        </div>
      </div>
      <br />
    </a>
  );
}
