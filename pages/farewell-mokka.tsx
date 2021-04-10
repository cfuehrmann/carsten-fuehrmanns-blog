import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Image } from "../components/media";
import { StaticHtml, StaticHtmlProps } from "../components/static-html";

export default StaticHtml;

export const meta = {
  title: "Farewell, love",
  date: "2018-03-17",
  description: "A remembrance of my bygone cat Mokka",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async (
  context
) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        My wife Monika took this picture of our lovely cat Mokka last night.
        Today, we followed the vet’s advice and had her put to sleep forever.
        She hadn’t been able to eat for days, and yesterday the vet diagnosed a
        pancreatic tumor.
      </p>
      <Image
        caption="Mokka’s last night"
        fileName="mokkas-last-night-600"
        width={600}
        height={800}
        extension="jpg"
      />
      <p>
        Mokka must have felt quite sick and been in pain. But that didn’t keep
        her from seeking and giving affection until her last hour. Until one or
        two weeks ago, she was quite active. I thought we’d have her around for
        several more years. I’m quite angry at the universe right now.
      </p>
      <h2>It began in the animal shelter</h2>
      <p>
        We got Mokka and her pal Smolle from the animal shelter in the autumn of
        2012. Someone had handed in both cats together under shady
        circumstances. The animal shelter estimated their age to five years.
        (Smolle is still in perfect health.)
      </p>
      <h2>Quite a character</h2>
      <p>
        It is amazing how much personality such a small animal can have. In the
        beginning, I could hardly tell our two new black cats apart. About two
        years later, I could virtually read my cats’ thoughts, and they could
        read mine.
      </p>
      <p>Mokka had some very distinctive habits:</p>
      <ul>
        <li>
          When I returned home, she was frantic with joy and always jumped on
          that particular table where I could best pet her.
        </li>
        <li>
          She had lots of nuanced sounds, but she did not meow. Instead, she did
          some elaborate curring; sometimes demanding, sometimes asking,
          sometimes just expressing satisfaction. And she had a special sound
          for when she saw birds, something like “eh-eh-eh-eh”. And she purred
          like a champion.
        </li>
        <li>
          She loved sitting on my wife’s lap or on mine, and the greatest thing
          for her was having a laptop put on top of her. Boy, did she love to
          prop up that laptop.
        </li>
        <li>
          She loved to sit on our file server – a floor heating specifically
          designed for cats (see foto).
        </li>
        <li>
          We didn’t let our cats outside (the traffic is too dangerous), but we
          let them into the big staircase of the three-family house in which we
          lived. She loved to inspect every corner, having cobwebs in her face
          when she returned to the flat. And she loved to visit our neighbours,
          who in turn enjoyed her visits.
        </li>
        <li>
          She was smaller than our tomcat Smolle, and occasionally he chased
          her. But she jumped and climbed better than the chubby male. Sooner or
          later she would find an elevated position where she had “airspace
          sovereignty” and could strike down on him.
        </li>
      </ul>
      <p>
        We won’t forget her anytime soon. I may never forget her beautiful,
        inquiring eyes searching my face, and I will miss that joyful greeting
        when I come home.
      </p>
      <p>Farewell, darling.</p>
      <hr />
      <p>
        Addendum, September 16, 2018: What is left of Mokka are our memories of
        her. And her ashes, which reside in a grapefruit-sized urn in our
        garden. Mokka loved watching that garden from the flat – so many birds
        and squirrels! – so it seemed fitting for her to come to rest there.
      </p>
      <Image
        caption="Mokka’s remains"
        fileName="mokka-urn-300"
        width={300}
        height={414}
        extension="jpg"
      />
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
