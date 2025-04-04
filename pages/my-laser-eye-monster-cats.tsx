import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Picture } from "../components/media";
import { StaticHtml, StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "My laser-eye monster cats",
  date: "2012-11-18",
  description: "A fun image of our two black cats encountering a neighbor cat",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        So much for my plans. I thought I’d keep a serious blog, and here I am
        posting cat content.
      </p>
      <p>
        We see my two black monsters lurk in the corridor during a visit of the
        neighbours’ cat. No animals where harmed or cyber-augmented during the
        making of this picture.
      </p>
      <Picture
        caption="Empire Cat Building"
        fileName="laser-eye-cats-800"
        width={800}
        height={1076}
        extension="jpg"
        hideCaption
      />
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
