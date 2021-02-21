import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import Layout, { siteTitle } from "../components/layout";
// import utilStyles from "../styles/utils.module.css";
import { getSortedPostData } from "../lib/markdown";
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
    <Layout page="">
      <header>
        <picture>
          <source srcSet="/images/profile-432.webp 432w" type="image/webp" />
          <img
            src="/images/profile-432.jpg"
            height={144}
            width={144}
            alt={name}
          />
        </picture>
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
              <Link href={`/${id}`}>
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
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData,
    },
  };
};
