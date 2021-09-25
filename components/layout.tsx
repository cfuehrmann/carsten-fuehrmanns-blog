import { useState } from "react";
import Head from "next/head";

import styles from "./misc.module.css";

const pageTexts: { [key in string]: string | undefined } = {
  "": "Home",
  publications: "Publications",
  lectures: "Lectures",
  "about-me": "About",
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
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav
        className={
          "w3-sidebar w3-bar-block w3-collapse w3-card " +
          (menuOpen ? "w3-show" : "w3-hide")
        }
      >
        <LinkButton target="" />
        <LinkButton target="publications" />
        <LinkButton target="lectures" />
        <LinkButton target="about-me" />
      </nav>
      <br />
      <main className="markdown-body w3-container">
        <div className={styles["layout"]}>{children}</div>
      </main>
      <footer className="w3-bottom">
        <nav className="w3-center">
          <button
            className="w3-button w3-xlarge w3-indigo"
            onClick={toggleMenu}
          >
            {menuOpen ? "Close Menu" : "Menu"}
          </button>
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

    const className = "w3-bar-item w3-button w3-xlarge";

    return (
      <a href={target ? `/${target}/` : "/"} className={className}>
        {target === page ? <u>{pageTexts[target]}</u> : pageTexts[target]}
      </a>
    );
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
}
