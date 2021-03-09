import Layout from "../components/layout";
import { Image } from "../components/media";

const name = "Carsten Führmann";

export default function About() {
  return (
    <Layout page="about-me">
      <header>
        <Image
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
          I am a secular humanist. I also love to loose myself in books, music,
          computer games, and the internet. My wife and I have two lovely cats.
        </p>
      </section>
    </Layout>
  );
}
