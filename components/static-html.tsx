import Layout from "./layout";

export type StaticHtmlProps = {
  staticHtml: string;
  title: string;
  description: string;
  page?: string;
};

export default function StaticHtml({
  staticHtml,
  title,
  description,
  page,
}: StaticHtmlProps) {
  return (
    <Layout title={title} description={description} page={page}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}
