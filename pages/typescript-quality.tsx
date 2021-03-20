import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Image, Video } from "../components/media";
import { Link, LinkedReference } from "../components/links";
import StaticHtml from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "TypeScript for quality of web code",
  date: "2015-12-04",
};

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        In this blog post, I shall discuss the programming language TypeScript
        as a way to improve the quality of web code. I shall illustrate this
        with a
      </p>
      <LinkedReference target="https://github.com/cfuehrmann/GameOfLife">
        demo project on GitHub
      </LinkedReference>
      <p>It's a simple web application that visualizes </p>
      <LinkedReference target="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
        Conway's Game of Life
      </LinkedReference>
      <p>
        with rules that can be chosen by the user. You can play with the hosted
        web application by clicking on the image below.
      </p>
      <Link target="http://gameoflife.carstenfuehrmann.org/">
        <Image
          caption="Click to play the GameOfLife demo (I never said I was a GUI designer)"
          fileName="game-of-life-app"
          width={273}
          height={465}
          extension="png"
        />
      </Link>
      <p>The demo will produce animations as in the two images below</p>
      <Video
        fileName="game-of-life-s23-b3"
        caption="Animation from our TypeScript demo"
      />
      <Video
        fileName="game-of-life-s234-s231"
        caption="Animation with alternative rules"
      />
      <p>
        Instructions for building this project from source follow later in this
        post.
      </p>
      <p>
        TypeScript emerged from Microsoft and is open source. There is
        increasing support for it, for example in Microsoft Visual Studio, and
        in the Atom editor. (Visual Studio in particular has its “Intellisense”
        technology working for TypeScript, as well as some basic refactoring.)
        Also, Google and Microsoft will apparently write Version 2 of the
        important <em>AngularJS</em> framework in TypeScript, see
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
