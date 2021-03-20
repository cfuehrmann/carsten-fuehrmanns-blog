import Layout from "./layout";

export default function StaticHtml({ staticHtml }: { staticHtml: string }) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}
