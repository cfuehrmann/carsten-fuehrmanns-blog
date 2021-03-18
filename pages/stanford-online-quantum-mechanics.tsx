import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import BlogPost from "../components/blog-post";
import { Image } from "../components/media";
import { LinkedReference } from "../components/references";

export const meta = {
  title: "Stanford online quantum mechanics",
  target: "stanford-online-quantum-mechanics",
  date: "2015-03-21",
};

export default function Post(props: { staticHtml: string }) {
  const { staticHtml } = props;

  return (
    <Layout page={meta.target}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        In September 2014, I embarked on the Stanford online quantum mechanics
        course by Prof. David Miller,
      </p>
      <LinkedReference target="https://online.stanford.edu/courses/soe-yeeqmse01-quantum-mechanics-scientists-and-engineers">
        Quantum Mechanics for Scientists and Engineers
      </LinkedReference>
      <p>Just when I thought “I’ve done it!”, a sequel</p>
      <LinkedReference target="https://online.stanford.edu/courses/soe-yeeqmse-02-quantum-mechanics-scientists-and-engineers-2">
        Quantum Mechanics for Scientists and Engineers 2
      </LinkedReference>
      <p>
        was announced, from January to March 2015. It too seemed essential, and
        I decided to continue. Now that I’ve finished both courses, here is a
        quick review, including the overall syllabus, and an account of my
        personal experience.
      </p>
      <p>
        <Image
          caption="Quantum Encounter"
          fileName="stanford-quantum-pulp"
          width={332}
          height={508}
          extension="jpg"
          hideCaption
        />
      </p>

      <h2>Syllabus of the Stanford online quantum mechanics courses</h2>

      <p>First course, September – December 2014:</p>

      <ul>
        <li>Schrödinger’s wave equation</li>
        <li>Diffraction by two slits</li>
        <li>Particles in potential wells</li>
        <li>Solutions of the time-dependent Schrödinger equation</li>
        <li>The coherent state</li>
        <li>Wave packets, group velocity</li>
        <li>Quantum-mechanical measurement</li>
        <li>Expectation values and operators</li>
        <li>Time evolution and the Hamiltonian</li>
        <li>The uncertainty principle</li>
        <li>Dirac notation</li>
        <li>Unitary and Hermitian operators</li>
        <li>Angular momentum</li>
        <li>Spherical harmonics</li>
        <li>The hydrogen atom</li>
        <li>Perturbation theory</li>
      </ul>

      <p>Second course, January – March 2015:</p>

      <ul>
        <li>Quantum mechanics in crystals: band structure etc.</li>
        <li>Optical absorption in semiconductors</li>
        <li>Electron spin</li>
        <li>Quantizing the electromagnetic field</li>
        <li>Fermions and bosons</li>
        <li>Creation and annihilation operators</li>
        <li>Spontaneous and stimulated emission</li>
        <li>Mixed states and the density matrix</li>
        <li>Quantum measurements and encryption</li>
        <li>Quantum computing, teleportation and entanglement</li>
        <li>Hidden variables and Bell’s inequalities</li>
        <li>Interpretation of quantum mechanics</li>
      </ul>

      <h2>Delivery of the courses</h2>

      <p>
        Every week, there where video lectures, about 90 minutes in total. Most
        lectures were followed by a quiz, and at the end of each week came a
        graded test. The quizzes and the tests where multiple choice, carefully
        designed so that one couldn’t score highly just by guessing. Many of the
        questions were aimed at conceptual understanding. Quite a few others
        asked for results of calculations.
      </p>

      <p>
        There were also ten optional, non-graded lectures on the background
        mathematics.
      </p>

      <h2>My personal experience with the courses</h2>

      <p>
        I’m sure the difficulty of these courses, and the workload, differ
        wildly depending on the students background. I can speak only of myself
        here. I have a good mathematical background, though I’m not specialized
        on the kind maths that prevails in physics, like differential equations,
        Taylor series, etc. I knew little about quantum physics before the
        course. But I <em>had</em> studied some classical mechanics.
      </p>

      <p>
        As the syllabus shows, the course covers a lot of ground. I’m glad I had
        looked at classical mechanics before, that may have kept me anchored.
      </p>

      <p>
        Most of the lectures where clear and as simple as the material
        permitted.
      </p>

      <p>
        In a small number lectures, I struggled for orientation. This happened
        typically when there were references to other areas of physics I hadn’t
        looked at. For example I haven’t studied electromagnetism yet, and there
        were lectures about quantizing the electromagnetic field. While I could
        follow much of that, some notions meant little to me, like ‘magnetic
        dipole moment’. In those cases, I ended up understanding most of the
        maths, but lacking a clear understanding of the physical meaning. In
        particular, I sometimes could not envisage experiments that illustrate
        these concepts.
      </p>

      <p>
        Despite these hiccups, I repeat that most of the lectures were clear and
        helpful.
      </p>

      <p>
        Against to the large scope of the lectures, the quizzes and tests were
        short and easy. During my university life I have seen many lectures with
        simpler content and harder exercises. In some discussion, Prof. Miller
        mentioned that the main focus was on conceptual understanding. This
        explains why the exercises involve no very challenging calculations.
      </p>

      <p>On average, I spent maybe six hours per week on the course.</p>

      <h2>
        Quantum mechanics vs. classical mechanics from a learning point of view
      </h2>

      <p>
        Independently of this particular course, I learned a lot about the{" "}
        <em>didactic</em> difference between classical mechanics and quantum
        mechanics:
      </p>

      <p>
        In classical mechanics, one may encounter hard maths; but one has
        usually a clear idea of the real life phenomena. For example, it may be
        hard to calculate the trajectory of a bouncing elastic ball. Or there
        may be no analytic way to deal with the three-body problem. But these
        things can be pictured easily in the mind.
      </p>

      <p>
        In quantum mechanics, the maths is not particularly hard, because it is
        based on linear algebra. But the wave nature of things can be
        disorienting. For example, an electron can be seen as a moving wave
        packet that results from a superposition of single-frequency waves. Each
        of those single-frequency waves moves at a certain speed, the ‘phase
        velocity’; but the whole electron is construed to move at a different
        speed, the ‘group velocity’, which results from the superposition. Also,
        the electron is not clearly localized in space. Now imagine a discussion
        of a crystal that contains many electrons. As you see, it’s easy for a
        beginner to get lost when trying to visualize these things. (Ultimately,
        electrons in a crystal are accounted for by a ‘band structure’, which is
        very different from a bunch of classical particles moving about.)
      </p>

      <h2>Conclusion</h2>

      <p>
        So, was this course worth the extensive burning of midnight oil after my
        day job? Well, my motivation was to fill white spaces on my mental map
        of science, and to learn more about the inner workings of nature. I
        think this was mostly a success. Some things I understood very well,
        like the hydrogen atom. Others things I still need to understand better,
        like electromagnetic fields. But I have surely learned how quantum
        mechanics ticks. Now I only need to stay in touch with the material,
        lest it fade from my memory…
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
