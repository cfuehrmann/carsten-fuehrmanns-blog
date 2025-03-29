import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Picture } from "../components/media";
import { StaticHtmlWithComments } from "../components/comments";
import { StaticHtmlProps } from "../components/static-html";

export default StaticHtmlWithComments;

export const meta = {
  title: "Die Brücke der Schlösser",
  date: "2012-09-07",
  description: "Hunderte Schlösser an einer Nürnberger Brücke",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        Warum vergessen die Leute nur alle ihre Schlösser an dieser Nürnberger
        Brücke?
      </p>
      <Picture
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
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
