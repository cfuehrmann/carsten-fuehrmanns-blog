import "katex/dist/katex.css";

import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { K, KD } from "../components/math";
import { Picture, Video } from "../components/media";
import { StaticHtmlWithComments } from "../components/comments";
import { StaticHtmlProps } from "../components/static-html";

export default StaticHtmlWithComments;

export const meta = {
  title: "An amateur’s foray into physics",
  date: "2014-05-25",
  description:
    "A physics simulation of a soap slipping around in a bath tub, formalized as a Lagrangian",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async (
  context,
) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        It has long bothered me that I know so little about physics and the
        maths that goes along with it. There are some great popular-science
        books on physics, but I wanted to dig deeper. So I turned myself into a
        “self-taught undergraduate” last year (on a tiny, after-work time
        budget).
      </p>
      <p>
        Like any university course in physics, I started with the sub-field of{" "}
        <em>classical mechanics</em>, which is concerned with the “set of
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
        discover useful maths I don't yet know, like any programming language
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
        moving parts by a mathematical term called <em>Lagrangian</em>. It's
        beyond the scope of this post to explain the theory behind Lagrangians,
        but they are really cool. The Lagrangian for this system is:
      </p>
      <KD>{`
        \\frac{m}{2}(\\dot{x}^2 +\\dot{y}^2 +\\dot{z}^2) - m g z`}</KD>
      <KD>{`
        + \\lambda(z - h(x,y))`}</KD>
      <p>
        The symbol <K>m</K> stands for the particle's mass, <K>g</K> is the
        gravity constant, <K>x</K>, <K>y</K> and <K>z</K> are the particle's
        coordinates, and{" "}
        <K>{`
          \\dot{x}`}</K>
        ,{" "}
        <K>{`
          \\dot{y}`}</K>{" "}
        and{" "}
        <K>{`
          \\dot{z}`}</K>{" "}
        the corresponding speeds. The function <K>h</K> describes the shape of
        the surface. It can be any sufficiently well-behaved function. In our
        example, I used a certain polynomial to obtain an interesting hilly
        terrain. The most interesting part of our Lagrangian is probably the{" "}
        <em>constraint</em>,{" "}
        <K>{`
          \\lambda`}</K>
        , which corresponds, up to constants, to the force that keeps the mass
        on the surface.
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
        {`
      \\begin{aligned} 
        m \\ddot{x} &= -\\lambda\\frac{\\partial h}{\\partial x} \\\\ \\\\
        m \\ddot{y} &= -\\lambda\\frac{\\partial h}{\\partial y} \\\\ \\\\
        m \\ddot{z} &= -\\lambda - m g \\\\ \\\\
        0 &= z - h 
      \\end{aligned}`}
      </KD>
      <p>
        Things are beginning to look quite Newtonian here: the first three
        equations have on the left side terms describing "mass times
        acceleration". On the right side, they have terms that at close
        inspection turn out to be forces. The last equation results from the
        constraint and just states that the vertical <K>z</K> coordinate results
        from applying the surface description <K>h</K> to the horizontal
        coordinates <K>x</K> and <K>y</K>.
      </p>
      <p>
        We are now a step closer to calculating the actual motion, but we must
        still obtain the actual function that describes the movement. That
        function, which maps time to coordinates, is a solution of of the above
        system of ODEs. I wrote "a" solution and not "the" solution, because
        there is one solution for each <em>initial condition</em>, by which we
        mean the particle's coordinates and speeds at the start of its journey.
        Of course, we must also fill in the mass <K>m</K>, the gravity constant{" "}
        <K>g</K>, and the surface shape <K>h</K> to determine the system fully.
      </p>
      <p>
        In lucky circumstances, the "motion function" corresponding to a system
        of ODEs can be given as a symbolic formula. But often, the solution can
        only be approximated numerically. In our case, we can find symbolic
        solutions for certain very simple surfaces <K>h</K>, e.g. non-curved
        surfaces, but not for interesting ones like the one in the animation
        above. In our case, the surface is actually
      </p>
      <KD>
        {`
      \\begin{aligned}
        h(x,y) &= (x-3)(x-2)(x-1) \\\\ 
        & \\quad (x+1)(x+2)(x+3) \\\\ 
        & \\quad (y-3)(y-2)(y-1) \\\\ 
        & \\quad (y+1)(y+2)(y+3) 
      \\end{aligned}`}
      </KD>
      <p>
        Neither I nor Mathematica can find a symbolic solution for this <K>h</K>
        . (It's most likely impossible, but I don't know how to prove that.)
        Even when we ask only for a numerical solution, Mathematica cannot give
        one straight away, because the system of ODEs contains certain snags.
        For Mathematica to succeed, I had to eliminate <K>z</K> and{" "}
        <K>{`
          \\lambda`}</K>{" "}
        first, and then solve for{" "}
        <K>{`
          \\ddot{x}`}</K>{" "}
        and{" "}
        <K>{`
          \\ddot{y}`}</K>
        . I'll spare you the details, what counts is that finally, Mathematica
        is able to give a numerical solution.
      </p>
      <p>
        Before I created the animation above, I played around with the initial
        conditions and let Mathematica visualize the trajectory of the particle:
      </p>
      <Picture
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
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
