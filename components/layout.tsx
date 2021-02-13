import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import styles from "./layout.module.css";
// import utilStyles from "../styles/utils.module.css";

export type PageName =
  | "Home"
  | "Publications"
  | "Lectures"
  | "TalksAndNotes"
  | "About";

const name = "Carsten Führmann";
export const siteTitle = "Carsten expounds";

export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: PageName;
}) {
  return (
    <div>
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
      </Head>
      <div className="w3-top">
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
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <header>
        {page === "Home" ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              height={144}
              width={144}
              alt={name}
            />
            <h1>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2>
              <Link href="/">
                <a>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}

function LinkButton(props: {
  linkPage: PageName;
  url: string;
  currentPage: PageName;
}) {
  const { linkPage, url, currentPage } = props;
  const pageTexts: { [key in PageName]: string } = {
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
