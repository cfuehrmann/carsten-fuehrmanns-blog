import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Picture } from "../components/media";
import { StaticHtmlWithComments } from "../components/comments";
import { StaticHtmlProps } from "../components/static-html";

export default StaticHtmlWithComments;

export const meta = {
  title: "On HDR photography with the smartphone",
  date: "2012-11-01",
  description: "An early experiment with HDR photography with the smartphone",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        Nature confronts us with scenes of high contrast, for example the sun
        shining through a tree. Human eyes can deal with this much better than
        artificial cameras: when looking through the tree, we may still see that
        the sky is blue and contains clouds, and that the leaves are green,
        while a camera might only see black silhouettes against a blindingly
        white sky. That’s because the human eye has a higher “dynamic range”
        than a typical camera. One way to address this problem, in a limited
        way, is a very good (and expensive) camera. But there is another, cheap
        way for smartphones: get an app that takes several shots of the same
        scene with different exposure times, and computes a final, improved
        image using the combined information from all those shots. A tried this
        with my Android smartphone, a Samsung Galaxy Nexus, using the app “HDR
        Camera+”. First, I took the following shot without HDR, a forest track
        when the sunlight came from the front and was reflected off the ground.
        In the darkest patches of the image, we can hardly see the leaves, and
        in the brightest patches the reflection is so strong that we cannot see
        any structure:
      </p>
      <Picture
        caption="Without HDR"
        fileName="hdr-without-800"
        width={800}
        height={1066}
        extension="jpg"
      />
      <p>
        Next, I took a shot of the same scene with HDR Camera+. Note how well we
        can see the leaves in the darkest patches now, and that we can also see
        more structure in the brightest patches. The HDR image is very close to
        what my eyes actually saw. (They saw a bit more detail still.) So HDR
        clearly brought an increase in realism.
      </p>
      <Picture
        caption="With HDR Camera+"
        fileName="hdr-with-800"
        width={800}
        height={1066}
        extension="jpg"
      />
      <p>
        Strangely enough, one might still consider the first, more unrealistic
        shot to be the better one, because the exaggerated contrast has an
        artistic, film-noir feel to it. But that was involuntary, so it can
        hardly count as a reason to stay away from HDR.
      </p>
      <p>
        Of course, even from a technical point of view, the HDR shot is far from
        perfect: the bright patches in particular look slightly artificial. I
        needed a dozen or so experiments, each consisting of shooting some scene
        with and without HDR, to get a feel for the strengths and limitations of
        the method. Considering the low price of the app, I can easily recommend
        to give it a try.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
