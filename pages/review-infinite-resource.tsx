import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { ExternalImage } from "../components/media";
import { Link } from "../components/links";
import { StaticHtml, StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: '"The Infinite Resource” by Ramez Naam"',
  date: "2013-05-23",
  description:
    "A review of Ramez Naam's book \"The Infinite Resource\", concerning human (ab)use of Earth's resources",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async (
  context
) => {
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
        will continue if we don’t act. Besides climate, he also discusses other
        kinds of resource depletion, for example the over-fishing of the oceans.
        Throughout, he succeeds in remaining factual and gives lots of
        convincing data.
      </p>
      <p>
        After this – sobering – account of the status quo, Raam describes how
        humanity, through the “infinite resource” of innovation, has again and
        again achieved incredible improvements in the usage of natural
        resources. One example is the staggering drop of agricultural area
        needed to feed one person. Other examples are the successful fight
        against acid rain (caused by SO2) and ozone depletion (caused by CFCs).
      </p>
      <p>
        In the later parts of the book, Naam argues that we have a good chance
        of succeeding again. However, the suffering we will cause along the way
        will be a lot less if we act proactively. He proposes a remarkably
        concrete (and convincing) course of action, including:
      </p>
      <ul>
        <li>Fixing the market to include the costs for environmental damage</li>
        <li>Investing in long-term R&D</li>
        <li>
          Overcoming our reflexes and embrace technologies that seem alien
        </li>
        <li>Driving education, in particular in the developing world</li>
      </ul>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
