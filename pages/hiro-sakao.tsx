import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Picture } from "../components/media";
import { StaticHtml, StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "Enjoying Sushi at Hiro Sakao",
  date: "2012-09-07",
  description: "Enthusing about a Sushi place in Erlangen",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        Ich verspreche, nicht oft Essensbilder zu posten. Jedenfalls war ich
        jetzt zum dritten Mal im japanischen Restaurant “Hiro Sakao” in
        Erlangen, und das Essen ist so gut, dass ich meinem Enthusiasmus einfach
        Luft machen muss. Das Interieur des Restaurants ist übrigens genauso
        toll wie das Essen.
      </p>
      <Picture
        caption="Besser geht’s nicht"
        fileName="hiro2-800"
        width={800}
        height={600}
        extension="jpg"
      />
      <br />
      <Picture
        caption="Mit Aal gefüllt"
        fileName="hiro1-800"
        width={800}
        height={600}
        extension="jpg"
      />
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
