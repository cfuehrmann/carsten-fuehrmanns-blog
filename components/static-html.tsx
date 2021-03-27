import Layout from "./layout";

export default function StaticHtml({
  staticHtml,
  page,
}: {
  staticHtml: string;
  page?: string;
}) {
  return (
    <Layout page={page}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}
