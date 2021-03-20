import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Image } from "../components/media";
import StaticHtml from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "Schloßbrücke",
  date: "2012-09-07",
};

export const getStaticProps: GetStaticProps = async (context) => {
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
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
