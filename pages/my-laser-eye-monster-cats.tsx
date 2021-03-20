import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Image } from "../components/media";
import StaticHtml from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "My laser-eye monster cats",
  date: "2012-11-18",
};

export const getStaticProps: GetStaticProps = async (context) => {
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
      <Image
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

  return { props: { staticHtml } };
};
