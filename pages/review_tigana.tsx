import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { LinkedReference } from "../components/links";
import StaticHtml from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "A short review of “Tigana” by Guy Gavriel Kay",
  date: "2013-05-16",
};

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        Given how many great fantasy authors I’ve read (Tolkien, Martin,
        Abercrombie, Rothfuss, Sanderson among them), it is surprising how late
        I stumbled upon this gem from 1990 by
      </p>
      <LinkedReference target="https://www.penguinrandomhouse.ca/authors/15215/guy-gavriel-kay">
        Guy Gavriel Kay
      </LinkedReference>
      <p>
        Of all fantasy books I discovered so far, this is probably the most
        intellectual, in a good way. The plot is brilliant and contains many
        surprises, and the prose is beautiful. There are no simple notions of
        good and evil, but a number of complex people driven into tragic
        conflict by past events or inclination. I cared about some of the
        characters so much that I could hardly bring myself to read on for fear
        of their fate. If I were pressed to state any shortcomings of the book,
        the only one I’d mention is this: like Tolkien’s books, and unlike some
        other modern ones by Martin and Abercrombie, Tigana does not play with
        incompetence, ugliness, and dirt: there is no fun to be had with
        incompetent, foolish military leaders; there is no ugly character, and
        all women are beautiful; there are some physical injuries, but there is
        never infection.
      </p>
      <p>
        In truth, these “shortcomings” don’t harm the book at all, it is
        fantastic. I just wanted to point out what the book does and what it
        does not.
      </p>
      <p>
        In summary, I think that Tigana represents a pinnacle in fantasy
        writing. It probably comes close to the limit of what can be achieved in
        the genre, except in the aforementioned “ugliness, incompetence, and
        dirt” dimension.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
