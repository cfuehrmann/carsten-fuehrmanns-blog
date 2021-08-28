import Layout from "../components/layout";
import { Picture } from "../components/media";

const name = "Carsten Führmann";

export default function About() {
  return (
    <Layout
      title="About"
      description="Information about Carsten Führmann"
      page="about-me"
    >
      <header>
        <Picture
          fileName="profile-432"
          width={144}
          height={144}
          extension="jpg"
          caption={name}
          hideCaption
        />
        <h1>{name}</h1>
      </header>
      <section>
        <p>
          My name is Carsten Führmann. I am a computer scientist and software
          engineer, born in Germany. I hold a computer science PhD from the
          University of Edinburgh (UK). Until early 2005, I was a lecturer at
          the University of Bath (UK). Then left academia to try myself in a
          software company back in Germany, where I still work.
        </p>
        <p>
          My academic research was concerned with programming languages, logics,
          proof theory, and category theory. I am still interested in those
          areas. In recent years, driven my industrial work, I have developed an
          strong interest in software engineering. Around 2013, I developed an
          interest in theoretical physics, but time permits me only to dabble.
        </p>
        <p>
          As a software developer, I have been a team member on a number of
          business applications, both server side and frontend side, and been
          the architect of a couple more. So my experience includes databases,
          business logic, and frontend design. My main interest these days are
          software architecture and developer experience, with a strong focus on
          keeping a high long-term team velocity. Sometimes I engage in a bit of
          tech-evangelism as a guilty pleasure.
        </p>
        <p>
          I care a lot about the environment. I'm a secular humanist. I love
          animals. I enjoy books, music, computer games, and the internet. My
          wife and I have two lovely cats.
        </p>
      </section>
    </Layout>
  );
}
