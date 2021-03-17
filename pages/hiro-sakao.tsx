import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import Date from "../components/date";
import { Image } from "../components/media";
import meta from "../meta/hiro-sakao-meta";

function Post(props: { staticHtml: string }) {
  const { staticHtml } = props;

  return (
    <Layout page={meta.target}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <>
      <h1>{meta.title}</h1>
      <p>
        <small>
          <Date dateString={meta.date} />
        </small>
      </p>
      <p>
        Ich verspreche, nicht oft Essensbilder zu posten. Jedenfalls war ich
        jetzt zum dritten Mal im japanischen Restaurant “Hiro Sakao” in
        Erlangen, und das Essen ist so umwerfend gut, dass ich meinem
        Enthusiasmus einfach Luft machen muss. Das Interieur des Restaurants ist
        übrigens genause toll wie das Essen.
      </p>
      <Image
        caption="Besser geht’s nicht"
        fileName="hiro2-800"
        width={800}
        height={600}
        extension="jpg"
      />
      <br />
      <Image
        caption="Mit Aal gefüllt"
        fileName="hiro1-800"
        width={800}
        height={600}
        extension="jpg"
      />
    </>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
