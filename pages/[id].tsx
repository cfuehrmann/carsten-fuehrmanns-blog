import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../components/layout";
import { getAllPostIds, getPostData } from "../lib/posts";
import Date from "../components/date";
// import utilStyles from "../../styles/utils.module.css";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout page={undefined}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) =>
  params && params.id && typeof params.id === "string"
    ? getPostDataProps(params.id)
    : { notFound: true };

async function getPostDataProps(id: string) {
  const postData = await getPostData(id);
  return { props: { postData } };
}
