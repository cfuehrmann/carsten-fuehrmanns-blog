import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import BlogPost from "../components/blog-post";
import { LinkedReference } from "../components/references";

const meta = {
  title: "A quick review of Joe Abercrombie’s “Red Country”",
  target: "review_red_country",
  date: "2013-04-05",
};

export default function ReviewRedCountry(props: { staticHtml: string }) {
  const { staticHtml } = props;

  return (
    <Layout page={meta.target}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>I just posted this book review of Joe Abercrombie’s</p>
      <LinkedReference target="https://joeabercrombie.com/books/red-country/">
        Red Country
      </LinkedReference>
      <p>on Amazon:</p>
      <p>
        I "read" the audiobook from Audible. It blew me away. I like all of
        Abercrombie's books, yet I'm tempted to say this is the best one yet
        (maybe tied with The Heroes). There is no single wasted word. The
        characters are vivid, the story riveting from beginning to end. The
        character's fates are masterfully intertwined in remarkable ways. The
        story is set in the same world as Abercrombie's previous books, and some
        old characters return. There is tragedy, comedy, and farce. While
        knowing Abercrombie's earlier books is not strictly necessary for
        enjoying this one, it seems recommendable to read them first.
      </p>
      <p>
        The speaker Steven Pacey does an incredible job lending a unique and
        memorable voice to every main character, of which there are many.
      </p>
      <p>
        I'm fairly sure this is one of the few books I will read a second time.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
