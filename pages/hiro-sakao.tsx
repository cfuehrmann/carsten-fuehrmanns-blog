import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import BlogPost from "../components/blog-post";
import { Image } from "../components/media";

const meta = {
  title: "Hiro Sakao",
  target: "hiro-sakao",
  date: "2012-09-07",
};

export default function Post(props: { staticHtml: string }) {
  const { staticHtml } = props;

  return (
    <Layout page={meta.target}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
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
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
