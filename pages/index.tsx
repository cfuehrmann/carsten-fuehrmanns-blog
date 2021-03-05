import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";

export default function Home() {
  return (
    <Layout page="">
      <h1>Carsten Führmann</h1>
      <p>Computer scientist and software engineer. More interests than time.</p>

      <h2>Blog</h2>

      <a href="parametric-oscillator" style={{ textDecoration: "none" }}>
        <div className="w3-card w3-text-black">
          <div className="w3-container">
            <h3>Parametric oscillator: a close look</h3>
            <small>
              <Date dateString="2014-07-23" />
            </small>
            <br />
            <br />
            <p>
              <em>This is an abstract</em>
            </p>
          </div>
        </div>
      </a>
    </Layout>
  );
}
