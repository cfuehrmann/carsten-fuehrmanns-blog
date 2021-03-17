import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import Date from "../components/date";
import { Image } from "../components/media";
import meta from "../meta/schlossbruecke-meta";

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
    </>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
