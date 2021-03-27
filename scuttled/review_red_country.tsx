import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Link } from "../components/links";
import { ExternalImage } from "../components/media";
import BlockQuote from "../components/block-quote";
import StaticHtml from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "A quick review of Joe Abercrombie’s “Red Country”",
  date: "2013-04-05",
};

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        I just posted this book review of Joe Abercrombie’s Red Country on
        Amazon:
      </p>
      <Link target="https://joeabercrombie.com/books/red-country/">
        <ExternalImage
          src="https://i2.wp.com/joeabercrombie.com/wp-content/uploads/2014/03/red-country-uk-pb.jpg"
          caption="Joe Abercrombie's Red Country"
          width={426}
          height={650}
          hideCaption
        />
      </Link>
      <BlockQuote>
        <p>
          I "read" the audiobook from Audible. It blew me away. I like all of
          Abercrombie's books, yet I'm tempted to say this is the best one yet
          (maybe tied with The Heroes). There is no single wasted word. The
          characters are vivid, the story riveting from beginning to end. The
          character's fates are masterfully intertwined in remarkable ways. The
          story is set in the same world as Abercrombie's previous books, and
          some old characters return. There is tragedy, comedy, and farce. While
          knowing Abercrombie's earlier books is not strictly necessary for
          enjoying this one, it seems recommendable to read them first.
        </p>
        <p>
          The speaker Steven Pacey does an incredible job lending a unique and
          memorable voice to every main character, of which there are many.
        </p>
        <p>
          I'm fairly sure this is one of the few books I will read a second
          time.
        </p>
      </BlockQuote>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
