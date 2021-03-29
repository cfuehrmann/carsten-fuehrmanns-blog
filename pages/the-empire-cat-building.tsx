import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Image } from "../components/media";
import StaticHtml, { StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "The Empire Cat Building",
  date: "2012-10-13",
  description:
    'An image of our bygone cat "Mokka" on our bygone "Empire cat building"',
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async (
  context
) => {
  const inner = (
    <BlogPost {...meta}>
      <p>Our cat Mokka on top of our “Empire Cat Building”.</p>
      <Image
        caption="Empire Cat Building"
        fileName="empire-cat-800"
        width={800}
        height={1066}
        extension="jpg"
        hideCaption
      />
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
