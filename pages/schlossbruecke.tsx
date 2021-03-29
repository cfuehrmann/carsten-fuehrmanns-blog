import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Image } from "../components/media";
import Comment from "../components/comments";
import { LinkedReference } from "../components/links";
import StaticHtml, { StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "Schloßbrücke",
  date: "2012-09-07",
  description: "Hunderte Liebes-Schlösser an einer Nürnberger Brücke",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async (
  context
) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        Warum vergessen die Leute nur alle ihre Schlösser an dieser Nürnberger
        Brücke?
      </p>
      <Image
        caption="Schlossbrücke"
        fileName="schlossbruecke-800"
        width={800}
        height={600}
        extension="jpg"
        hideCaption
      />
      <h2>Comments</h2>
      <Comment author="knilch" date="2012-11-13">
        <LinkedReference target="https://www.spiegel.de/netzwelt/web/lovepicking-kuensterlin-knackt-liebesschloesser-a-860715.html">
          Lovepicking-Künstlerin knackt Liebesschlösser
        </LinkedReference>
        <Comment author="Carsten Führmann" date="2012-11-13">
          Danke für die Info! Und ich lerne einmal wieder: Es gibt nichts, was
          es nicht gibt. Und herzlichen Glückwunsch: Dies war der 1000000ste
          Kommentar in meinem Blog! (Jedenfalls bis auf sechs oder sieben
          Nullen.)
        </Comment>
      </Comment>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
