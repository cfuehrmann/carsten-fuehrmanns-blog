import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import Layout, { siteTitle } from "../components/layout";
// import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

const name = "Carsten Führmann";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout page="Home">
      <header>
        <Image
          priority
          src="/images/profile.jpg"
          height={144}
          width={144}
          alt={name}
        />
        <h1>{name}</h1>
        <p>
          Computer scientist and software engineer. More interests than time.
        </p>
      </header>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
