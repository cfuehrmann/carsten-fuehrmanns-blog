import "katex/dist/katex.css";

import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import Date from "../components/date";
import { K, KD } from "../components/math";
import { Image, Video } from "../components/media";
import { LinkedReference } from "../components/references";
import Comment from "../components/comments";
import meta from "../meta/foray-physics-meta";

function ForayPhysics(props: { staticHtml: string }) {
  const { staticHtml } = props;

  return (
    <Layout page={meta.target}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}

export default ForayPhysics;

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <>
      <h1>{meta.title}</h1>
      <p>
        <small>
          <Date dateString={meta.date} />
        </small>
      </p>
      <p>
        It has long bothered me that I know so little about physics and the
        maths that goes along with it. There are some great popular-science
        books on physics, but I wanted to dig deeper. So I turned myself into a
        “self-taught undergraduate” last year (on a tiny, after-work time
        budget).
      </p>
      <p>
        Like any university course in physics, I started with the sub-field of{" "}
        <em>Classical Mechanics</em>, which is concerned with the “set of
        physical laws describing the motion of bodies under the action of a
        system of forces” (Wikipedia).
      </p>
      <p>
        So I bought some books (primarily the notorious Landau/Lifshitz) and
        began. Some of the exercises, even simple-looking ones, lead into
        remarkably big calculations. Even though I usually enjoy calculating, it
        felt like a chore sometimes, and I looked for a remedy. Luckily, we have
        computer algebra systems these days, and after some thought and trial I
        ended up using the <em>Mathematica</em> software.
      </p>
      <p>
        I soon found the computer-aided approach addictive. Not only does the
        software help with big, boring, error-prone calculations. The need to
        formulate solutions in a machine-tractable way also makes me think more
        deeply and conceptually about the maths. Plus, the software leads me to
        discover useful maths I don’t yet know, like any programming language
        leads to discovering new useful libraries. Finally, the software makes
        it easy to play around with the parameters of an exercise and visualize
        the solutions.
      </p>
      <p>
        This post shows an example of an exercise aced with computer help. It is
        about a mass that can move around on some surface, in the presence of
        gravity, with no friction. Like a piece of soap in a bath tub. Here is a
        concrete case:
      </p>
      <Video
        fileName="soap"
        caption="A mass tied to a surface, in the presence of gravity, with no friction"
      />
      <p>
        Classical mechanics has a neat way of describing a whole system of
        moving parts by a mathematical term called <em>Lagrangian</em>. It’s
        beyond the scope of this post to explain the theory behind Lagrangians,
        but they are really cool. The Lagrangian for this system is:
      </p>
      <KD>
        {String.raw`
      \frac{m}{2}(\dot{x}^2 +\dot{y}^2 +\dot{z}^2) - m g z`}
      </KD>
      <KD>{String.raw`+ \lambda(z - h(x,y)`}</KD>
      <p>
        The symbol <K>{String.raw`m`}</K> stands for the particle's mass,{" "}
        <K>{String.raw`g`}</K> is the gravity constant, <K>{String.raw`x`}</K>,{" "}
        <K>{String.raw`y`}</K> and <K>{String.raw`z`}</K> are the particle's
        coordinates, and <K>{String.raw`\dot{x}`}</K>,{" "}
        <K>{String.raw`\dot{y}`}</K> and <K>{String.raw`\dot{z}`}</K> the
        corresponding speeds. The function <K>{String.raw`h`}</K> describes the
        shape of the surface. It can be any sufficiently well-behaved function.
        In our example, I used a certain polynomial to obtain an interesting
        hilly terrain. The most interesting part of our Lagrangian is probably
        the <em>constraint</em>, <K>{String.raw`\lambda`}</K>, which
        corresponds, up to constants, to the force that keeps the mass on the
        surface.
      </p>
      <p>
        The Lagrangian is a succinct description of the system, but it does not
        lend itself well to calculate the actual motion. We need to calculate
        the <em>laws of motion</em> from a Lagrangian. The laws of motion are
        also called <em>Euler-Lagrange Equations</em>, or just{" "}
        <em>Euler Equations</em> or <em>Lagrange Equations</em>. They form a{" "}
        <em>system of ordinary differential equations</em> (ODEs). There is an
        easy method, which I won't introduce here, to obtain the laws of motion
        from the Lagrangian. Mathematica even has an optional package, called
        "VariationalMethods", which contains a command "EulerEquations", which
        does exactly this: get the laws of motions from a Lagrangian. The
        result, in our case, turns out to be this system of ODEs:
      </p>
      <KD>
        {String.raw`
      \begin{aligned} 
        m \ddot{x} &= -\lambda \frac{\partial h}{\partial x} \\ \\
        m \ddot{y} &= -\lambda\frac{\partial h}{\partial y} \\ \\
        m \ddot{z} &= -\lambda - m g \\ \\
        0 &= z - h 
      \end{aligned}`}
      </KD>
      <p>
        Things are beginning to look quite Newtonian here: the first three
        equations have on the left side terms describing "mass times
        acceleration". On the right side, they have terms that at close
        inspection turn out to be forces. The last equation results from the
        constraint and just states that the vertical <K>{String.raw`z`}</K>{" "}
        coordinate results from applying the surface description{" "}
        <K>{String.raw`h`}</K> to the horizontal coordinates{" "}
        <K>{String.raw`x`}</K> and <K>{String.raw`y`}</K>.
      </p>
      <p>
        We are now a step closer to calculating the actual motion, but we must
        still obtain the actual function that describes the movement. That
        function, which maps time to coordinates, is a solution of of the above
        system of ODEs. I wrote "a" solution and not "the" solution, because
        there is one solution for each <em>initial condition</em>, by which we
        mean the particle's coordinates and speeds at the start of its journey.
        Of course, we must also fill in the mass <K>{String.raw`m`}</K>, the
        gravity constant <K>{String.raw`g`}</K>, and the surface shape{" "}
        <K>{String.raw`h`}</K> to determine the system fully.
      </p>
      <p>
        In lucky circumstances, the "motion function" corresponding to a system
        of ODEs can be given as a symbolic formula. But often, the solution can
        only be approximated numerically. In our case, we can find symbolic
        solutions for certain very simple surfaces <K>{String.raw`h`}</K>, e.g.
        non-curved surfaces, but not for interesting ones like the one in the
        animation above. In our case, the surface is actually
      </p>
      <KD>
        {String.raw`
      \begin{aligned}
        h(x,y) &= (x-3)(x-2)(x-1) \\ 
        & \quad (x+1)(x+2)(x+3) \\ 
        & \quad (y-3)(y-2)(y-1) \\ 
        & \quad (y+1)(y+2)(y+3) 
      \end{aligned}`}
      </KD>
      <p>
        Neither I nor Mathematica can find a symbolic solution for this{" "}
        <K>{String.raw`h`}</K>. (It's most likely impossible, but I don't know
        how to prove that.) Even when we ask only for a numerical solution,
        Mathematica cannot give one straight away, because the system of ODEs
        contains certain snags. For Mathematica to succeed, I had to eliminate{" "}
        <K>{String.raw`z`}</K> and <K>{String.raw`\lambda`}</K> first, and then
        solve for <K>{String.raw`\ddot{x}`}</K> and{" "}
        <K>{String.raw`\ddot{y}`}</K>. I'll spare you the details, what counts
        is that finally, Mathematica is able to give a numerical solution.
      </p>
      <p>
        Before I created the animation above, I played around with the initial
        conditions and let Mathematica visualize the trajectory of the particle:
      </p>
      <Image
        fileName="orbit"
        caption="The orbit of the sliding mass"
        width={486}
        height={461}
        extension="jpg"
      />
      <p>
        After I found a nice trajectory to show off, I created the animation.
        The Mathematica programming language has convenient primitives for
        creating animations. The animation turned out to be very slow, because
        of the time the software needs to calculate the numerical solution of
        the ODE system. But that didn't matter for this post, because I had to
        export the animation as a animated GIF anyway. Mathematica has a nice
        trick for doing this: there a command, called <em>Table</em>, which
        allows to create a sequence of images instead of an animation, like a
        thumb cinema. That image sequence can than be exported as a GIF.
      </p>
      <p>
        In summary, we have seen: Classical Mechanics provides a great way to
        model systems by so-called Lagrangians. These lead automatically to the
        laws of motion. These form a system of ODEs that can be solved either by
        hand or with software. The software can also help explore and visualize
        the system.
      </p>
      <h1>Comments</h1>
      <Comment author="William Bliss" date="2014-05-27">
        <p>
          Very nice animation.It reminded me of a problem, rude of me to present
          to you this way, but who knows you might find it rewarding.
        </p>
        <p>
          There is a valuable concept missing from many people especially climat
          deniers.This concept concerns how nonlinear systems often have multip
          semi-stable zones where local restoring forces act until the system
          gets bumped over the hill into a different zone.
        </p>
        <p>
          Our atmosphere is presumed to be such a system, though with many, man
          dimensions.If, though, we knew the equations which described t
          atmosphere and plotted two of them, say average global temperature and
          average global cloud cover, we might get a graph similar to yours.
        </p>
        <p>
          The educational trick would be to show how changes in atmospheric ga
          content can change the heights of the hills surrounding the local sta
          zone that our current global climate point is bound to.As these h
          change shape it becomes possible for our global climate to ra climb
          too far up one of these, now lower, valleys and fal neighboring stable
          zone.Of course, the danger of this is th f these stable zones might be
          the “snowball earth” zone which Earth seems to have fallen into
          several times in the past.
        </p>
        <p>
          A few modifications to your animation program (labels, colors, changin
          hill heights, etc.) could be a wonderful tool to demonstrating this
          rather abstract concern that atmospheric scientists have.
        </p>
        <p>
          Just a thought from a fellow physicist.
          <br /> Thanks
        </p>
        <Comment author="Carsten Führmann" date="2014-05-27">
          <p>
            Wow, a comment on the blog as opposed to social media – that doesn’
            happen often!The whole climate issue has been on my mind for quite
            while.I know the models are very complex and still maturing.While I
            think it would be great to use convincing, educational simulation
            they would have to be created or at least supervised by an expert in
            the field, to avoid becoming an easy target.
          </p>
          <p>
            However, I learned something very depressing recently that makes m
            reconsider the whole strategy for convincing people about the real
            of global warming: recent research into people’s (in)ability to c
            their beliefs, by Brendan Nyhan, a professor of political science at
            Dartmouth.Here is an article about it:
          </p>
          <LinkedReference target="http://www.newyorker.com/online/blogs/mariakonnikova/2014/05/why-do-people-persist-in-believing-things-that-just-arent-true.html">
            http://www.newyorker.com/online/blogs/mariakonnikova/2014/05/why-do-people-persist-in-believing-things-that-just-arent-true.html
          </LinkedReference>
          <p>
            Basically, the finding is that people change their beliefs accordin
            to evidence if and only if the belief is not tied up with their se
            of identity.In some cases, e.g.the structure of the solar syst
            beliefs are not tied up with people’s identities.In other cases,
            global warming, they are.(How could it come to this?) It pro means
            that the way to communicate the scientific findings is not a matter
            of well-presented simulation, but one of psychology.
          </p>
        </Comment>
      </Comment>
      <Comment author="Richard McKinley" date="2015-02-18">
        <p>
          Hi Carsten!I came looking for your publications, and found this
          instead!(I’m essentially retired,or at least on hiatus, from logic, (
          now work in machine-learning for medical applications) but a review
          request came in that I felt needed specialist attention)
        </p>
        <p>
          I fully sympathise with your frustrations regarding physics: actuall
          for me it’s a little more shameful, since I actually took seve
          low-level theoretical physics courses during my undergrad degree.Last
          year I took on
        </p>
        <LinkedReference target="https://www.coursera.org/learn/statistical-mechanics">
          statistical mechanics,
        </LinkedReference>
        <p>
          which I think would appeal to your programming-driven approach t
          physics: I guess it’s too late to pick up the course now, but I highly
          recommend “auditing” a few of the lectures and homeworks.
        </p>
        <Comment author="Carsten Führmann" date="2014-05-27">
          <p>Hi Richard,</p>
          <p>
            After a long pause, I’m doing some admin work on my blog, and I’v
            just stumbled upon your comments.That’s strange, because I’m suppos
            to receive email notifications when someone adds a comment, and that
            used to work.
          </p>
          <p>
            Anyway, it’s very interesting to hear that you moved from logic into
            different field.It’s probably not a bad idea to get in a differe
            mode and study something appliable.I don’t do much science th days,
            but I’ve never dropped the ball completely.I’m learning phy out of
            curiosity, and to to fill embarrasing white spots on my science.I’ve
            just finished an online quantum mechanics co learned a lot; the main
            problem for me wasn’t the maths envisage the experiments whose
            results the maths is s predict… In classical mechanics, it’s easy: I
            can imaging a bouncing ball; but I don’t seem to have any items at
            home that show me quanta.
          </p>
          <p>
            Best,
            <br /> Carsten
          </p>
        </Comment>
      </Comment>
    </>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
