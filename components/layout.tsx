import Head from "next/head";

export const siteTitle = "Carsten expounds";

const pageTexts: { [key in string]: string | undefined } = {
  "": "Home",
  publications: "Publications",
  lectures: "Lectures",
  "about-me": "About",
};

export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Carsten Führmann's web site" />
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
        <nav>
          <div className="w3-bar w3-light-grey w3-bottombar w3-border-indigo">
            <LinkButton target="" />
            <LinkButton target="publications" />
            <LinkButton target="lectures" />
            <LinkButton target="about-me" />
          </div>
        </nav>
      </header>
      <br />
      <br />
      <br />
      <br />
      <main className="markdown-body w3-container">{children}</main>
    </>
  );

  function LinkButton(props: { target: string }) {
    const { target } = props;

    const className = `w3-bar-item w3-button ${
      target === page ? "w3-indigo" : "w3-hover-indigo"
    }`;

    return (
      <a href={`/${target}`} className={className}>
        {pageTexts[target]}
      </a>
    );
  }
}
