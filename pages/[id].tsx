import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../components/layout";
import {
  getMarkdownIds,
  getMarkdownProps,
  MarkdownProps,
} from "../lib/markdown";
import Date from "../components/date";

export default function Post({ postData }: { postData: MarkdownProps }) {
  return (
    <Layout page={postData.id}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        {postData.type === "post" ? (
          <>
            <div>
              <Date dateString={postData.date} />
            </div>
            <br />
          </>
        ) : (
          <p />
        )}
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => ({
  paths: getMarkdownIds(),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{
  postData: MarkdownProps;
}> = async ({ params }) =>
  params && params.id && typeof params.id === "string"
    ? getPostDataProps(params.id)
    : { notFound: true };

async function getPostDataProps(id: string) {
  const postData = await getMarkdownProps(id);
  return { props: { postData } };
}
