import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import BlogPost from "../components/blog-post";
import { Image } from "../components/media";

const meta = {
  title: "The Empire Cat Building",
  target: "the-empire-cat-building",
  date: "2012-10-13",
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

  return { props: { staticHtml } };
};
