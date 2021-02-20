import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import styles from "./layout.module.css";
// import utilStyles from "../styles/utils.module.css";

const name = "Carsten Führmann";
export const siteTitle = "Carsten expounds";

export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string | undefined;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <header className="w3-top">
        <div className="w3-bar w3-light-grey">
          <LinkButton linkPage="Home" url="/" currentPage={page} />
          <LinkButton
            linkPage="Publications"
            url="/publications"
            currentPage={page}
          />
          <LinkButton linkPage="Lectures" url="/lectures" currentPage={page} />
        </div>
        <div className="w3-bar w3-light-grey w3-bottombar w3-border-indigo">
          <LinkButton
            linkPage="TalksAndNotes"
            url="/academic-talks-and-notes"
            currentPage={page}
          />
          <LinkButton linkPage="About" url="/about-me" currentPage={page} />
        </div>
      </header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <main className="w3-container">{children}</main>
    </>
  );
}

function LinkButton(props: {
  linkPage: string;
  url: string;
  currentPage: string | undefined;
}) {
  const { linkPage, url, currentPage } = props;
  const pageTexts: { [key in string]: string | undefined } = {
    Home: "Home",
    Publications: "Publications",
    Lectures: "Lectures",
    TalksAndNotes: "Academic Talks and Notes",
    About: "About",
  };
  const className =
    linkPage === currentPage
      ? "w3-bar-item w3-button w3-indigo"
      : "w3-bar-item w3-button w3-hover-indigo";

  return (
    <Link href={url}>
      <a className={className}>{pageTexts[linkPage]}</a>
    </Link>
  );
}
