import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";

import parametricOscillator from "../meta/parametric-oscillator-meta";
import forayPhysics from "../meta/foray-physics-meta";

export default function Home() {
  return (
    <Layout page="">
      <h1>Carsten Führmann</h1>
      <p>Computer scientist and software engineer. More interests than time.</p>

      <h2>Posts</h2>

      <Post {...parametricOscillator}>
        Research notes about the "parametric oscillator": a harmonic oscillator
        whose parameters oscillate in time. For example, a child pumping a swing
        by periodically standing and squatting.
      </Post>

      <Post {...forayPhysics}>
        Trying to get the hang of Classical Mechanics, I described a "soap
        slipping around in a bath tub" as a "Lagrangian" and visualized the
        system using Mathematica.
      </Post>
    </Layout>
  );
}

function Post(props: {
  title: string;
  target: string;
  date: string;
  children: React.ReactNode;
}) {
  const { title, target, date, children } = props;

  return (
    <a href={target} style={{ textDecoration: "none" }}>
      <div className="w3-card w3-text-black">
        <div className="w3-container">
          <h3>{title}</h3>
          <small>
            <Date dateString={date} />
          </small>
          <br />
          <br />
          <p>
            <em>{children}</em>
          </p>
        </div>
      </div>
    </a>
  );
}
