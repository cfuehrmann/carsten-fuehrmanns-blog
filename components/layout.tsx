import Head from "next/head";

import styles from "./misc.module.css";

const pageTexts: { [key in string]: string | undefined } = {
  "": "Home",
  publications: "Publications",
  lectures: "Lectures",
  "about-me": "?",
};

export default function Layout({
  children,
  page,
  title,
  description,
}: {
  children: React.ReactNode;
  page?: string;
  title: string;
  description: string;
}) {
  const fullTitle = `${title} - Carsten Führmann`;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            fullTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={fullTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{fullTitle}</title>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TJT8C600ZY"
        />
        <script async src="/google-analytics.js" />
      </Head>
      <br />
      <main className="markdown-body w3-container">
        <div className={styles["layout"]}>{children}</div>
      </main>
      <footer className="w3-bottom">
        <nav className="w3-center">
          <LinkButton target="" /> <LinkButton target="publications" />
          <LinkButton target="lectures" /> <LinkButton target="about-me" />
        </nav>
      </footer>
      <br />
      <br />
      <br />
      <br />
    </>
  );

  function LinkButton(props: { target: string }) {
    const { target } = props;

    const className = "w3-bar-item w3-button w3-round-xlarge w3-indigo";

    return (
      <a href={target ? `/${target}/` : "/"} className={className}>
        {target === page ? <u>{pageTexts[target]}</u> : pageTexts[target]}
      </a>
    );
  }
}
