import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { LinkedReference } from "../components/links";
import { StaticHtml, StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "Why do I start my own blog?",
  date: "2012-08-28",
  description: "My 2012 arguments for starting my own blog, still mostly valid",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>There are three reasons:</p>
      <p>
        First, I sometimes feel the urge to post a photo or a thought, or to
        review a book, film, or game. Until now, I did such things on social
        networks or specialized places like Amazon product reviews. But the
        popular German blogger Sascha Lobo convinced me in
      </p>
      <LinkedReference target="https://www.spiegel.de/netzwelt/web/sascha-lobos-kolumne-zum-niedergang-der-blogs-in-deutschland-a-827995.html">
        this widely regarded article
      </LinkedReference>
      <p>
        that giving up content ownership is bad, and the comparative decline of
        blogs is lamentable. So I intend to put my posts here, and I will only
        copy them to other places when needed.
      </p>
      <p>
        Second, I have a university page with my publications and lectures in
        theoretical computer science. But I left academia years ago, and they
        may shut down my page some day. So I want to move the contents to this
        blog. EDIT: I have created the pages
      </p>
      <LinkedReference target="/publications/">My publications</LinkedReference>
      <LinkedReference target="/lectures">My lectures</LinkedReference>
      <LinkedReference target="/publications/">
        My academic talks and notes
      </LinkedReference>
      <p>on this blog and uploaded my material.</p>
      <p>
        Third, I am a software engineer who wants to share his insights. My
        company has an internal Wiki for such things, but some of my findings
        may be of public interest. While there are great Q&A sites like Stack
        Overflow, they are not suited for proactive, Wiki-style content. So I
        intend to share my software-engineering wisdom on this blog.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
