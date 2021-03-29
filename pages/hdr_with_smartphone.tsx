import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Image } from "../components/media";
import Comment from "../components/comments";
import { LinkedReference } from "../components/links";
import StaticHtml, { StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "On HDR photography with the smartphone",
  date: "2012-11-01",
  description: "An early experiment with HDR photography with the smartphone",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async (
  context
) => {
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
        in the brighest patches the reflection is so strong that we cannot see
        any structure:
      </p>
      <Image
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
      </p>{" "}
      <Image
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
      <Comment author="mkl" date="2014-06-16">
        <p>
          What is it that you see when you are in the forest in this situation?
          Is it not that the impression of the scene in your head is composed of
          tens to hundreds of different instantaneous impressions that your eyes
          make with differently wide opened iris?
        </p>
        <p>
          What is a good photo anyway? Is it what the camera saw at that
          instant? Is it what a single impression of your eyes saw? Or is it
          what the whole apparatus of your human senses pieced together for you?
          The actual, quantitative difference between bright and dark was as in
          the first picture, so the second is not a scientific measurement. What
          is reality?
        </p>
        <p>
          Also, the reason that the highlights are blown while the shadows are
          underexposed is because the exposure metering of your camera tries to
          find some middle ground between over- and underexposed areas in the
          picture. If your photo app supports this, try locking the exposure
          while pointing into the dark forest, then recompose and shoot: the
          leaves are green while the highlights are still (and even more)
          overexposed. Or do it the other way around to get visible structure in
          the sky against a black forest.
        </p>
        <Comment author="Carsten Führmann" date="2014-06-16">
          <p>
            Markus is that you? Anyway, when you ask what I see in the forest,
            you are getting into an interesting but difficult territory. In
            particular, once we’ve started asking such a question, we might go
            further and ask: is it desirable at all to capture what one sees?
            That is, do I want my foto to be realistic? If the answer where an
            unconditional “Yes”, then I’d probably have switch to 3D movies… Now
            that I think about it, I guess what I wanted here is be able to make
            *one* image that looses as little dynamic range as possible. You are
            right though that one could have different goals, e.g. under- or
            overexposing areas to emphasize certain parts.
          </p>
          <p>
            By the way, this post of mine is beginning to age, since more modern
            Android phones have a better HDR built straight into Google’s camera
            software.
          </p>
        </Comment>
        <Comment author="mkl" date="2014-06-17">
          <p>
            mkl? yup, that’s me 🙂 I started with photograpy a few months ago,
            so now I’m all interested in these kinda things.
          </p>
          <LinkedReference target="http://lambdanaut.net/">
            http://lambdanaut.net/
          </LinkedReference>
          <p>
            By the way, sometimes there is still enough information in the
            highlights of a single image, and you can recover it by creating a
            copy, tuning brightness of the copy and then blend together with the
            original using a gradient mask. That’s what I did on those to
            recover the sky:
          </p>
          <LinkedReference target="https://secure.flickr.com/photos/dermkl/13702766803/">
            Image 1
          </LinkedReference>
          <LinkedReference target="https://secure.flickr.com/photos/dermkl/13228100265/">
            Image 2
          </LinkedReference>
        </Comment>
        <Comment author="Carsten Führmann" date="2014-06-17">
          <p>
            Hi, I belatedly checked out you blog. Nice! (1) “Lambdanaut” is a
            pretty cool URL, (2) some really nice pictures, not least the
            startrails, (3) the flash bouncer is cool. In the past, I could
            never “save” an overexposed sky , you probably have a better camera
            or better method. To be honest, I’m not ambitious as a photographer.
            I guess what fascinates me most is how software can compensate for
            lacking hardware.
          </p>
        </Comment>
      </Comment>
      <Comment author="mkl" date="2014-07-28">
        <p>
          Sorry but I have to bring this up again 😉 As I want to show some
          images, I’ve made a blogpost. Here: [That link is now broken.]
        </p>
        <Comment author="Carsten Führmann" date="2014-07-29">
          <p>
            Hi, thanks for the thoughts! I guess one should distinguish two
            things: on the one hand, the poor implementation of HDR on my
            ex-smartphone. (My new Nexus 5 does it better.) And on the other
            hand, the fact that multiple exposure *can* capture more
            information, when done well. An extreme example is astronomical
            photography, where e.g. a galaxy is captured at several wavelengths,
            and the superimposed false-color images are presented. I guess it
            should be possible to build an every-day camera whose dynamic range
            is closer to that of humans. I guess such cameras already exist. But
            I haven’t checked.
          </p>
        </Comment>
      </Comment>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
