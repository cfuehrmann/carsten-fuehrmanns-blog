import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { ExternalImage } from "../components/media";
import { Link } from "../components/links";
import StaticHtml from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "Book review: “The Infinite Resource” by Ramez Naam",
  date: "2013-05-23",
};

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        Suppose you want a clear picture of climate change, or more generally,
        the effects of humanity’s increasing usage of Earth’s resources. And
        suppose you want the information from someone who is very bright, has
        done a lot of research, is neither alarmist nor denialist, does not
        engage in party politics, but simply digs up facts. Finally, suppose you
        are not the type to resign and complain, but enjoy a constructive
        discussion aiming at a course of action. Then Ramez Naam’s book is for
        you.
      </p>
      <Link target="https://rameznaam.com/book/the-infinite-resource/">
        <ExternalImage
          src="https://rameznaam.com/wp-content/uploads/2019/09/infinite-resourse-ramez-naam.jpg"
          caption="The Infinite Resource by Ramez Naam"
          hideCaption
        />
      </Link>
      <p>
        In the first parts of the book, Naam gives a lot of information about
        the current state of Earth’s atmosphere and the dangerous changes that
        will continue if we don’t act (and, to a lesser extent, even if we do
        act). Besides climate, he also discusses other kinds of resource
        depletion, for example, the over-fishing of the oceans. Throughout, he
        succeeds in remaining factual and gives lots of convincing data.
      </p>
      <p>
        After this – sobering – account of the status quo, Raam describes how
        humanity, through the “infinite resource” of innovation, has again and
        again achieved incredible improvements in the usage of natural
        resources. Examples include the staggering drop of agricultural area
        needed to feed one person, the successful fight against acid rain
        (caused by SO2) and ozone depletion (caused by CFCs).{" "}
      </p>
      <p>
        In the later parts of the book, Naam argues that we have a good chance
        of succeeding again, but that the suffering we will cause along the way
        will be a lot less if we act proactively. And he proposes a remarkable
        concrete (and convincing) course of action, including: fixing the market
        to include the costs for environmental damage, investing in long-term
        R&D, overcome our reflexes and embrace technologies that seem alien, and
        drive education, in particular in the developing world.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};