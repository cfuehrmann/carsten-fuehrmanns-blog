import "katex/dist/katex.css";

import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import BlogPost from "../components/blog-post";
import {
  K,
  KD,
  Lemma,
  Theorem,
  Corollary,
  Observation,
  Proof,
} from "../components/math";
import { Image, Video } from "../components/media";
import { Reference, LinkedReference } from "../components/references";

export const meta = {
  title: "Parametric oscillator: a close look",
  date: "2014-07-23",
};

export default function Post(props: { staticHtml: string }) {
  const { staticHtml } = props;

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />

      <h2>References</h2>

      <Reference>
        L.D.Landau and E.M.Lifschitz.Lehrbuch der theoretischen Physik I:
        Mechanik.Verlag Harry Deutsch, 14. Auflage.
      </Reference>
      <LinkedReference target="http://en.wikipedia.org/wiki/Floquet_theory">
        Wikipedia: Floquet theory
      </LinkedReference>
      <LinkedReference target="http://en.wikipedia.org/wiki/Liouville's_formula">
        Wikipedia: Liouville's formula
      </LinkedReference>
      <LinkedReference target="http://en.wikipedia.org/wiki/Matrix_exponential">
        Wikipedia: Matrix exponential
      </LinkedReference>
      <LinkedReference target="https://en.wikipedia.org/wiki/Logarithm_of_a_matrix">
        Wikipedia: Logarithm of a matrix
      </LinkedReference>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        This post contains my research notes about the{" "}
        <em>parametric oscillator</em>. Here is an introduction from Wikipedia
        (see references section):
      </p>
      <blockquote>
        A parametric oscillator is a harmonic oscillator whose parameters
        oscillate in time. For example, a well known parametric oscillator is a
        child pumping a swing by periodically standing and squatting to increase
        the size of the swing's oscillations. The varying of the parameters
        drives the system. Examples of parameters that may be varied are its
        resonance frequency <K>\omega</K> and damping <K>\beta</K>.
      </blockquote>
      <p>
        As that Wikipedia article shows, a certain coordinate change can
        eliminate damping. So we focus on the case where there is only a
        resonance frequency <K>\omega</K>, which varies with time. That is, we
        consider the differential equation
        <KD>
          {String.raw`\displaystyle\ddot{x}(t) + \omega(t)^2 x(t) = 0 \quad`}
        </KD>
        where <K>\omega(t)</K> repeats itself after some time interval <K>T</K>.
      </p>
      <p>
        The main purpose of this post is to preserve what I learned, for my own
        future reference. I am bad at maintaining handwritten notes, so I am
        moving to a digital medium. On the off chance that this interests
        others, I put it on the web. This post contains some work of my own that
        goes beyond the material in the references section. Most or all of my
        findings are likely known by experts. The proofs are mine, and so are
        the mistakes.
      </p>
      <h2>Floquet theory</h2>
      <p>
        A suitable mathematical background for the parametric oscillator is{" "}
        <em>Floquet theory</em> (see references section). It deals with linear
        differential equations of the form{" "}
        <KD>{String.raw`\dot{x}(t) = A(t) x(t)`}</KD> where{" "}
        <K>{String.raw`x:\mathbb{R}\to\mathbb{R}^n`}</K>, and the function{" "}
        <K>{String.raw`A:\mathbb{R}\to\mathbb{R}^{n\times n}`}</K> is periodic
        with <K>T</K>. We could also consider complex numbers as the elements of{" "}
        <K>x</K> and <K>A</K>, but we shall stick with the reals here, in
        accordance with the physics. We can write a parametric oscillator as a
        Floquet equation:
        <KD>
          {String.raw`
      \frac{d}{dt} 
      \left(\begin{array}{c} x \\ v\end{array}\right) =`}
        </KD>
        <KD>
          {String.raw`
      \left(\begin{array}{cc} 0 & 1 \\ -\omega(t)^2 & 0\end{array}\right)
      \left(\begin{array}{c} x \\ v\end{array}\right)`}
        </KD>
      </p>
      <p>
        I encountered Floquet theory in the well-known "Mechanics" book by
        Landau and Lifshitz (see references section), which we shall call "the
        book" in this post. The book contains a chapter on{" "}
        <em>parametric resonance</em>, which deals with parametric oscillators
        and their resonance behavior. The book uses Floquet theory in
        specialized form, without calling it so. Part of my motivation here is
        to obviate the exact way in which that book chapter ties in with general
        Floquet theory.
      </p>
      <h2>The monodromy matrix</h2>
      <p>
        We shall now introduce the notion of <em>monodromy</em>, which is
        pivotal for Floquet theory. Let{" "}
        <K>{String.raw`\Psi: \mathbb{R}\to \mathbb{R}^{n\times n}`}</K> be a
        fundamental matrix for a Floquet differential equation. Then{" "}
        <K>\Psi_T(t) := \Psi(t + T)</K> is also a fundamental matrix, because{" "}
        <K>A(t+T)=A(t)</K>. So we have <K>\Psi(t + T) = \Psi(t) M</K> for some
        invertible <K>n\times n</K>-matrix <K>M</K>. This <K>M</K> describes the
        change of the solution after each period. It is called the{" "}
        <em>monodromy matrix</em>. Rightly so, since in Greek "mono" means "one"
        and "dromos" means "course" or "running".
      </p>
      <p>
        One checks easily that different <K>\Psi</K> for the same <K>A</K> can
        yield different <K>M</K>. But:
      </p>
      <Lemma>
        The monodromy matrix of a Floquet equation is determined up to
        isomorphism.
      </Lemma>
      <p>
        So see this, let <K>\Phi</K> be another fundamental matrix for <K>A</K>.
        Let <K>N</K> be the corresponding monodromy matrix. We have{" "}
        <K>\Phi(t) = \Psi(t) Q</K> for some invertible <K>n\times n</K>-matrix{" "}
        <K>Q</K>. So
        <KD>
          {String.raw`
      \begin{aligned}
        \Psi(t) Q N &= \Phi(t)N \\
        &= \Phi(t+T) \\
        &= \Psi(t+T)Q \\
        &= \Psi(t) M Q
      \end{aligned}`}
        </KD>
      </p>
      <p>
        Because <K>\Psi(t)</K> and <K>Q</K> are invertible, we get{" "}
        <K>{String.raw`N = Q^{-1} M Q`}</K> □
      </p>
      <p>
        Importantly, it follows that any two monodromy matrices have the same
        Jordan normal forms, and therefore the same eigenvalues.
      </p>
      <p>
        Now recall that we assumed that the matrix <K>A</K> from our Floquet
        equation has only real entries. Naturally, we are only interested in
        real solutions <K>\Psi</K>. So any resulting <K>M</K> too has only real
        entries.
      </p>
      <h2>Floquet's theorem</h2>
      <p>
        Floquet equations cannot not generally be solved symbolically. However,
        Floquet's theorem makes a useful statement about the solutions. The
        version of the theorem that interests me here is:
      </p>
      <Theorem>
        <>
          Any fundamental matrix <K>\Psi</K> of a Floquet equation with period{" "}
          <K>T</K> has the form <KD>{String.raw`\Psi(t) = \Pi(t) e^{t B}`}</KD>{" "}
          for some <K>T</K>-periodic matrix function <K>\Pi</K> and some matrix{" "}
          <K>B</K> of matching dimension.
        </>
      </Theorem>
      <p>
        Note that the statement employs the <em>matrix exponential</em>{" "}
        <K>{String.raw`e^{t B}`}</K> (see references section).
      </p>
      <Proof>
        Because <K>M</K> is invertible, it has a <em>matrix logarithm</em> (see
        references section), that is, a matrix of which it <K>M</K> is the
        exponential. (Important properties of the matrix logarithm are: they
        exist for every invertible matrix; and as in the special case of scalar
        logarithms, they can be complex-valued even if the exponential is
        real-valued, and they are not unique. For example, <K>i(2k+1)\pi</K> is
        a logarithm of minus one for every integer <K>k</K>.) Let <K>B</K> be a
        logarithm of <K>M</K>, divided by <K>T</K>. That is,{" "}
        <K>{String.raw`e^{T B} = M`}</K>. Let{" "}
        <K>{String.raw`\Pi(t) := \Psi(t) e^{-t B}`}</K>. To see that <K>\Pi</K>{" "}
        is <K>T</K>-periodic, consider
        <KD>
          {String.raw`
      \begin{aligned}
        \Pi(t+T) &= \Psi(t+T) e^{-(t+T)B} \\ 
        &= \Psi(t) M e^{-T B -t B} \\ 
        &= \Psi(t) e^{T B} e^{-T B} e^{-t B} \\ 
        &= \Psi(t) e^{-t B} = \Pi(t) 
      \end{aligned}`}
        </KD>
      </Proof>
      <h2>Applying the theorem to the oscillator</h2>
      <p>
        First we perform a coordinate change into the eigensystem of the
        monodromy matrix <K>M</K>. This is tantamount to assuming that <K>M</K>{" "}
        is in Jordan normal form. As for any <K>{String.raw`2\times 2`}</K>{" "}
        -Matrix, the Jordan normal form is{" "}
        <KD>
          {String.raw`
      M = \left(\begin{array}{cc}\mu_1 & \delta \\0 & \mu_2\end{array}\right)`}
        </KD>
        where the <K>{String.raw`\mu_i`}</K> are the eigenvalues and{" "}
        <K>{String.raw`\delta`}</K> is zero ore one. The book considers only the
        case where the two eigenvalues differ, and therefore{" "}
        <K>{String.raw`\delta`}</K> is zero. We shall also consider the case
        where <K>{String.raw`\delta`}</K> is one. This can happen, as we shall
        see later.
      </p>
      <p>
        We shall now apply the Floquet theorem. First, we need a logarithm of{" "}
        <K>{String.raw`M`}</K>. We shall deal first with the more difficult case
        where <K>{String.raw`\delta`}</K> is one, and therefore{" "}
        <K>{String.raw`\mu_1=\mu_2=\mu`}</K>.
      </p>
      <p>
        As explained in a Wikipedia article referenced below, the logarithm can
        be calculated as a <em>Mercator series</em>:
        <KD>
          {String.raw`
      \ln (1+x) =`}
        </KD>
        <KD>
          {String.raw`
      x-\frac{x ^ 2}{2}+\frac{x ^ 3}{3}-\frac{x ^ 4}{4}+\cdots`}
        </KD>
        We have <K>{String.raw`M = \mu(I + K)`}</K> where <K>{String.raw`I`}</K>{" "}
        stands for the identity matrix, and
        <KD>
          {String.raw`
      K =\left(\begin{array}{cc}0 & 1/\mu \\0 & 0\end{array}\right)`}
        </KD>
        Using the fact that <K>{String.raw`K^n`}</K> vanishes for{" "}
        <K>{String.raw`n`}</K> greater than two, we get
        <KD>
          {String.raw`
      \begin{aligned}
        \ln M &=\ln \big(\mu(I+K)\big) \\
        &= \ln (\mu I) +\ln (I+K) \\
        &= (\ln \mu) I \\
        & \quad + K-\frac{K^2}{2}+\frac{K^3}{3}-\cdots \\
        &= (\ln \mu) I + K \\
        &= \left(\begin{array}{cc}\ln\mu & 1/\mu \\0 & \ln\mu\end{array}\right)
      \end{aligned}`}
        </KD>
        From the proof of the theorem, we know that we can choose{" "}
        <K>{String.raw`B = T^{-1}\ln M`}</K>. Some calculation involving the
        matrix exponential yields
        <KD>
          {String.raw`
      e^{t B} =\left(\begin{array}{cc}\mu^{t/T} & \frac{t}{T}\mu^{t/T-1} \\0 & \mu^{t/T}\end{array}\right)`}
        </KD>
        Note that <K>{String.raw`e^{T B} = M`}</K>, as required. Now suppose we
        have a fundamental matrix
        <KD>
          {String.raw`
      \Psi(t) =\left(\begin{array}{cc}x_1(t) & x_2(t) \\v_1(t) & v_2(t)\end{array}\right)`}
        </KD>
        When we spell out the Floquet theorem elementwise, and ignore the{" "}
        <K>{String.raw`v_i`}</K>, we get:
      </p>
      <Corollary>
        If <K>{String.raw`\delta = 1`}</K>, there are <K>{String.raw`T`}</K>
        -periodic functions <K>{String.raw`\pi_1`}</K>,{" "}
        <K>{String.raw`\pi_2`}</K> and <K>{String.raw`\pi_3`}</K> such that
        <KD>
          {String.raw`
        \begin{aligned}
          x_1(t) &= \mu^{t/T} \pi_1(t) + \frac{t}{T}\mu^{t/T-1} \pi_3(t) \\ 
          x_2(t) &= \mu^{t/T} \pi_2(t)
        \end{aligned}`}
        </KD>
      </Corollary>
      <p>
        If <K>{String.raw`\delta = 0`}</K>, we get the result from the book:
      </p>
      <Corollary>
        If <K>{String.raw`\delta = 0`}</K>, there are <K>{String.raw`T`}</K>
        -periodic functions <K>{String.raw`\pi_1`}</K> and{" "}
        <K>{String.raw`\pi_2`}</K> such that
        <KD>
          {String.raw`
      \begin{aligned}
      x_1(t) &= \mu_1^{t/T} \pi_1(t) \\ 
      x_2(t) &= \mu_2^{t/T} \pi_2(t)
      \end{aligned}`}
        </KD>
      </Corollary>
      <p>
        The calculation is much simpler than for <K>{String.raw`\delta=1`}</K>.
        I leave it away here.
      </p>
      <h2>Possible eigenvalues</h2>
      <p>First, we observe, like the book:</p>
      <Observation>
        The eigenvalues of the monodromy matrix <K>{String.raw`M`}</K> of a
        parametric oscillator are either real or complex conjugates of one
        another.
      </Observation>
      <p>
        This follows simply from the fact that <K>{String.raw`M`}</K> has only
        real entries. Now the book deduces, for <K>{String.raw`\delta = 0`}</K>,
        that the eigenvalues must be mutually reciprocal. We shall show this
        even for <K>{String.raw`\delta = 1`}</K>:
      </p>
      <Lemma>
        The product of the eigenvalues of the monodromy matrix{" "}
        <K>{String.raw`M`}</K> of a parametric oscillator is one.
      </Lemma>
      <Proof>
        <em>Liouvilles formula</em> (see references section) entails for every
        fundamental matrix <K>{String.raw`\Psi`}</K> of a Floquet equation that
        <KD>
          {String.raw`
      \frac{d}{dt}\det\,\Psi(t) = \mathrm{tr}\,A(t) \cdot\det\,\Psi(t)`}
        </KD>
        Here <K>{String.raw`\mathrm{tr}`}</K> stands for trace, which is the sum
        of the diagonal elements of a matrix. For a parametric oscillator, that
        trace is zero. So <K>{String.raw`\det\,\Psi(t)`}</K> is constant.
        Because <K>{String.raw`\Psi(t+T) = \Psi(t)M`}</K>, we have{" "}
        <K>{String.raw`\det\,\Psi(t+T)=\det\Psi(t)\det M`}</K>. Since{" "}
        <K>{String.raw`\Psi`}</K> is constant, we have{" "}
        <K>{String.raw`\det\,\Psi(t+T)=\det\Psi(t)`}</K>, and since{" "}
        <K>{String.raw`\det\,\Psi(t)\neq 0`}</K> we have{" "}
        <K>{String.raw`\det\,M = 1`}</K>. The claim follows because the
        determinant is the product of the eigenvalues □
      </Proof>
      <p>
        Combining the results of this section, we see that the eigenvalues are
        either reciprocal reals, or two non-reals on the complex unit circle
        which are complex conjugates of one another. When{" "}
        <K>{String.raw`\delta = 1`}</K>, we know also that the two eigenvalues
        are the same, and so they are both one or both minus one.
      </p>
      <h2>Classification of possible behaviors</h2>
      <p>
        First, suppose that <K>{String.raw`\delta = 1`}</K>. Then the
        eigenvalues are both one or both minus one.
      </p>
      <p>
        If <K>{String.raw`\mu = 1`}</K>, we have by an earlier corollary
        <KD>
          {String.raw`
      \begin{aligned}
        x_1(t) &= \pi_1(t) + \frac{t}{T}\pi_3(t) \\x_2(t) &= \pi_2(t)
      \end{aligned}`}
        </KD>
        for <K>{String.raw`T`}</K>-periodic <K>{String.raw`\pi_1`}</K>,{" "}
        <K>{String.raw`\pi_2`}</K>, and <K>{String.raw`\pi_3`}</K>, where{" "}
        <K>{String.raw`x_1`}</K> and <K>{String.raw`x_2`}</K> are coordinates
        which go along with the eigensystem of the monodromy matrix.
      </p>
      <p>
        If <K>{String.raw`\mu = -1`}</K>, we have
        <KD>
          {String.raw`
      \begin{aligned}
        x_1(t) &= (-1)^{t/T} \pi_1(t) \\
        & \quad + \frac{t}{T}(-1)^{t/T-1} \pi_3(t) \\ 
        x_2(t) &= (-1)^{t/T} \pi_2(t)
      \end{aligned}`}
        </KD>
        Note that this entails that we have <K>{String.raw`2T`}</K>-periodic{" "}
        <K>{String.raw`\rho_1`}</K>, <K>{String.raw`\rho_2`}</K>, and{" "}
        <K>{String.raw`\rho_3`}</K> such that
        <KD>
          {String.raw`
      \begin{aligned}
        x_1(t) &= \rho_1(t) + \frac{t}{T}\rho_3(t) \\x_2(t) &= \rho_2(t)
      \end{aligned}`}
        </KD>
      </p>
      <p>
        Now suppose that <K>{String.raw`\delta = 0`}</K>. We concluded above
        that <K>{String.raw`x_1(t) = \mu_1^{t / T} \pi_1(t)`}</K> and{" "}
        <K>{String.raw`x_2(t) = \mu_2^{t / T} \pi_2(t)`}</K> for{" "}
        <K>{String.raw`T`}</K>-periodic <K>{String.raw`\pi_1`}</K> and{" "}
        <K>{String.raw`\pi_2`}</K>.
      </p>
      <p>
        If the eigenvalues are both one, we have <K>{String.raw`T`}</K>-periodic
        behavior, respectively. Note that in this case <K>{String.raw`M`}</K> is
        not just isomorphic to, but <em>equal</em> to the identity matrix. So
        any coordinate system is an eigensystem, that is, we can choose the{" "}
        <K>{String.raw`x_i`}</K> freely.
      </p>
      <p>
        If the eigenvalues are both minus one, we have <K>{String.raw`2T`}</K>
        -periodic behavior. In this case <K>{String.raw`T`}</K> is not just
        isomorphic to, but <em>equal</em> to minus one times the identity
        matrix. So here too, any coordinate system is an eigensystem, so we can
        choose the <K>{String.raw`x_i`}</K> freely.
      </p>
      <p>
        If the eigenvalues are other reals, the one whose absolute value is
        greater than one "wins" as <K>{String.raw`t`}</K> goes towards infinity.
        So the amplitude grows exponentially. If the eigenvalues are not reals,
        they are on the complex unit circle, and the amplitude has an upper
        bound.
      </p>
      <h2>Example: the Mathieu equation</h2>
      <p>
        The Mathieu equation is the parametric oscillator with
        <KD>
          {String.raw`
      \omega(t)^2 = \omega_0^2(1 + h \cos (\gamma t))`}
        </KD>
        If this <K>{String.raw`\omega(t)`}</K> came from a child on a swing, it
        would be a strange child: one that stands and squats at a frequency{" "}
        <K>{String.raw`\gamma`}</K> independent of the resonance frequency{" "}
        <K>{String.raw`\omega_0`}</K> of the swing. Still, the Mathieu equation
        is important in physics.
      </p>
      <p>
        Here is a graph showing the monodromy's eigenvalues for the Mathieu
        equation with <K>{String.raw`\omega_0 = 1`}</K> and{" "}
        <K>{String.raw`h = 1`}</K>. The vertical axis corresponds to{" "}
        <K>{String.raw`\gamma`}</K>, which ranges from <K>{String.raw`0.2`}</K>{" "}
        to <K>{String.raw`5`}</K>. Horizontally, we have the complex plane. For
        each <K>{String.raw`\gamma`}</K>, the graph contains <em>both</em>{" "}
        eigenvalues of the corresponding monodromy matrix. I refrained from
        drawing the coordinate axes, to avoid clutter.
      </p>
      <Video
        fileName="mathieu-bunny"
        caption="The eigenvalues of a Mathieu equation as gamma changes"
      />
      <p>
        The graph shows that, for every <K>{String.raw`\gamma`}</K>, the
        eigenvalues are either (1) on a circle, which happens to be the unit
        circle, or (2) opposite one another on a perpendicular of the circle,
        actually, reciprocal reals. This agrees with our mathematical results
        about the possible eigenvalues. In case (1) we have no resonance. In
        case (2), we have resonance.
      </p>
      <p>
        The greatest resonance is represented by the "face of the bunny", around{" "}
        <K>{String.raw`\gamma = 2\omega_0 = 2`}</K>, connected to the circle at{" "}
        <K>{String.raw`-1 + 0i`}</K>. The second greatest resonance is
        represented by the bunny's (uppermost) tail, around{" "}
        <K>{String.raw`\gamma = \omega_0 = 1`}</K>, connected to the circle at{" "}
        <K>{String.raw`1 + 0i`}</K>. This second greatest resonance corresponds
        to a normal child that stands and squats once during a period of the
        swing. The greatest resonance corresponds to an eager child that turns
        around at the apex, facing down again, and stands and squats again on
        the way back.
      </p>
      <p>
        There are also resonances for smaller <K>{String.raw`\gamma`}</K>, their
        connection points with the circle alternating between{" "}
        <K>{String.raw`1 + 0i`}</K> and <K>{String.raw`1 + 0i`}</K>.
      </p>
      <p>
        It is worth noting that, for smaller <K>{String.raw`h`}</K>, the
        resonance areas can shrink in such a way that only the bunny's face at{" "}
        <K>{String.raw`\gamma = 2`}</K> remains, while all resonances at smaller{" "}
        <K>{String.raw`\gamma`}</K> vanish. That is: if the child's standing and
        squatting have a small amplitude <K>{String.raw`h`}</K>, the child needs
        to stand and squat more often to achieve resonance.
      </p>
      <h2>The transition into and out of resonance</h2>
      <h3>Possible shapes of the monodromy matrix</h3>
      <p>
        As we have seen, the transitions into and out of resonance happen where
        the eigenvalues are both one or both minus one. This means that the
        Jordan normal form of the monodromy matrix is
        <KD>
          {String.raw`
      \left(\begin{array}{cc}1 & \delta \\0 & 1\end{array}\right)\quad \mathrm{or} \quad
      \left(\begin{array}{cc}-1 & \delta \\0 & -1\end{array}\right)`}
        </KD>
        where <K>{String.raw`\delta`}</K> is zero or one. So:
      </p>{" "}
      <p>
        <em>
          To fully understand the transitions into and out of resonance, we must
          know <K>{String.raw`\delta`}</K>!
        </em>
      </p>
      <p>
        From the start, I wondered about the case where <K>{String.raw`M`}</K>{" "}
        cannot be diagonalized, that is, <K>{String.raw`\delta = 1`}</K>, since
        that was left aside in the book. Next, I was intrigued by the
        instantaneous ninety-degree turns where the bunny's body meets the face
        or a tail. Those points turned out to be the only ones where{" "}
        <K>{String.raw`M`}</K> might be undiagonalizable. So I kept running into
        the question about <K>{String.raw`\delta`}</K>.
      </p>
      <p>
        I checked, with Mathematica, the bunny's two transition points for the
        resonance at <K>{String.raw`\gamma = 2`}</K>, and its two transition
        points for the resonance at <K>{String.raw`\gamma = 1`}</K>. In all
        cases, we have <K>{String.raw`\delta = 1`}</K>. So the question arises:
      </p>
      <p>
        <em>
          Is it true for all parametric oscillators that the monodromy matrix is
          undiagonalizable at all transitions into and out of resonance?
        </em>
      </p>
      <p>We shall now shed light on this question.</p>
      <h3>The meaning of diagonalizability and lack thereof</h3>
      <p>
        First, suppose that <K>{String.raw`\delta = 0`}</K>. If{" "}
        <K>{String.raw`\mu = 1`}</K>, we have, as observed above, two linearly
        independent solutions <K>{String.raw`x_1(t) = \pi_1(t)`}</K> and{" "}
        <K>{String.raw`x_2(t) = \pi_2(t)`}</K> where the{" "}
        <K>{String.raw`\pi_i`}</K> are <K>{String.raw`T`}</K>-periodic. Since
        every solution <K>{String.raw`x(t)`}</K> is a linear combination of
        those <K>{String.raw`x_i`}</K>, it follows that <em>every</em> solution
        is <K>{String.raw`T`}</K>-periodic. So, for every initial phase{" "}
        <K>{String.raw`(x(t_0), v(t_0))`}</K> at some <K>{String.raw`t_0`}</K>,
        the corresponding solution is <K>{String.raw`T`}</K>-periodic. If{" "}
        <K>{String.raw`\mu = -1`}</K>, we can deduce by a similar argument: for
        every initial phase <K>{String.raw`(x(t_0), v(t_0))`}</K> at some{" "}
        <K>{String.raw`t_0`}</K>, the corresponding solution is{" "}
        <K>{String.raw`2T`}</K>-periodic.
      </p>
      <p>
        Now suppose that <K>{String.raw`\delta = 1`}</K>. If{" "}
        <K>{String.raw`\mu = 1`}</K>, we have, as observed above, two linearly
        dependent solutions <K>{String.raw`x_1(t) = \pi_1(t)`}</K> and{" "}
        <K>{String.raw`x_2(t) = \pi_2(t) + \frac{t}{T} \pi_3(t)`}</K> where the{" "}
        <K>{String.raw`\pi_i`}</K> are <K>{String.raw`T`}</K>-periodic. So the
        solution space, which is two-dimensional, has a one-dimensional subspace
        of <K>{String.raw`T`}</K>-periodic functions. All other solutions grow
        linearly with time. So for every <K>{String.raw`t_0`}</K>, the (also
        two-dimensional) space of initial conditions at <K>{String.raw`t_0`}</K>{" "}
        has a one-dimensional subspace of <K>{String.raw`T`}</K>-periodic
        solutions. For all other initial conditions, the solutions grow linearly
        with time. For <K>{String.raw`\mu = -1`}</K>, we get something similar:
        for every <K>{String.raw`t_0`}</K>, the space of initial conditions has
        a one-dimensional subspace of periodic solutions, this time with period{" "}
        <K>{String.raw`2T`}</K>. Again, all other solutions grow linearly.
      </p>
      <p>
        In summary: for <K>{String.raw`\delta = 0`}</K>, all solution are
        periodic, while for <K>{String.raw`\delta = 1`}</K> only some are
        periodic. In the latter case, we can destabilize a periodic solution by
        arbitrarily small changes of the initial conditions.
      </p>
      <h3>Undiagonizable examples</h3>
      <p>
        We shall now give a stringent example, more illuminating than the
        Mathieu equation, where <K>{String.raw`\delta = 1`}</K>, that is,{" "}
        <K>{String.raw`M`}</K> cannot be diagonalized. Here{" "}
        <K>{String.raw`\omega`}</K> will be a certain rectangular pulse:
        <KD>
          {String.raw`
        \omega(t) =`}
        </KD>
        <KD>
          {String.raw`
        \begin{cases}
          1 & 0 \leq (t\, \mathrm{mod}\, T) < t_1\\
          \omega_{\mathrm{max}} & t_1 \leq t\,\mathrm{mod}\, T) < t_2\\
          0 & t_2 \leq (t\,\mathrm{mod}\, T) < t_3 < \frac{\pi}{2}\\
          1 & t_3 \leq (t\, \mathrm{mod} \,T) < T
        \end{cases}`}
        </KD>
      </p>
      <p>
        Here <K>{String.raw`T`}</K> is the period, which we must still
        determine. And <K>{String.raw`\omega_{\mathrm{max}}`}</K> is a value
        greater than one, which we must still determine. For the construction,
        we assume temporarily as initial conditions{" "}
        <K>{String.raw`x(0) = 1`}</K> and <K>{String.raw`v(0) = 0`}</K>. That
        is, the solution is the cosine for <K>{String.raw`0 \leq t < t_1`}</K>.
        We let <K>{String.raw`t_2 = t_1 + \Delta t`}</K> for a small{" "}
        <K>{String.raw`\Delta t`}</K>. The{" "}
        <K>{String.raw`\omega_{\mathrm{max}} > 1`}</K> "accelerates the swing",
        that is, the solution increases its descent more than a cosine while{" "}
        <K>{String.raw`\omega_{\mathrm{max}}`}</K> lasts. We choose{" "}
        <K>{String.raw`\omega_{\mathrm{max}}`}</K> in such a way that at{" "}
        <K>{String.raw`t_2`}</K> the solution's first derivative is minus one.
        There it remains until <K>{String.raw`t_3`}</K> since{" "}
        <K>{String.raw`\omega`}</K> is zero there. We let{" "}
        <K>{String.raw`t_3`}</K> be the point where the solution is zero for the
        first time for positive <K>{String.raw`t`}</K>. So, from{" "}
        <K>{String.raw`t_3`}</K>, the solution is again a like cosine with
        amplitude one, <em>but shifted a little to the left</em>. We let{" "}
        <K>{String.raw`T`}</K> be the time, slightly less than{" "}
        <K>{String.raw`2\pi`}</K>, where the solution is zero the second time
        for positive <K>{String.raw`t`}</K>. Obviously, the solution is periodic
        with <K>{String.raw`T`}</K>. It looks like a cosine, except that in the
        first quadrant there is a "fast forward" lasting from{" "}
        <K>{String.raw`t_1`}</K> to <K>{String.raw`t_3`}</K>.
      </p>
      <p>
        So, our constructed parametric oscillator has a periodic solution. But
        are <em>all</em> solutions periodic? No! We fine-tuned{" "}
        <K>{String.raw`\omega(t)`}</K> so that it would have a periodic solution
        specifically for the initial condition <K>{String.raw`x(0) = 1`}</K> and{" "}
        <K>{String.raw`v(0) = 0`}</K>. As can be easily checked, that there are
        other initial conditions with non-periodic solutions. So, owing to
        earlier observations, the initial conditions with periodic solutions
        form a one-dimensional subspace. That is, the only periodic solutions
        arise from initial conditions that are scalar multiples of{" "}
        <K>{String.raw`x(0) = 1, v(0) = 0`}</K>. The period of our{" "}
        <K>{String.raw`\omega`}</K> function happens to agree with that of the
        oscillator's solution, so the eigenvalues are one. In summary, our
        constructed parametric oscillator has
        <KD>
          {String.raw`
      M = \left(\begin{array}{cc}1 & 1 \\0 & 1\end{array}\right)`}
        </KD>
      </p>
      <p>
        Our constructed <K>{String.raw`\omega`}</K> supplies one impulse in the
        first quadrant of the movement. So four quadrants pass between impulses.
        Obviously, we could modify our construction to have an impulse in the
        first <em>and</em> third quadrant. Then two quadrants would pass between
        impulses. So the solution's period would be twice that of{" "}
        <K>{String.raw`\omega`}</K>, and the eigenvalues would be minus one. We
        could also modify our construction to have six quadrants between
        impulses (eigenvalues minus one), or eight (eigenvalues one), or ten
        (eigenvalues minus one), and so on.
      </p>
      <h3>Diagonalizable examples</h3>
      <p>
        First I conjectured, in this post, that there is no parametric
        oscillator with non-constant <K>{String.raw`\omega`}</K> that has{" "}
        <K>{String.raw`M = \mathrm{Id}`}</K> or{" "}
        <K>{String.raw`M = -\mathrm{Id}`}</K>. My conjecture was inspired by the
        previous section. But John Baez proved me wrong.
      </p>
      <p>
        First, an example where <K>{String.raw`M = \mathrm{Id}`}</K>. Consider
        the following non-constant <K>{String.raw`\omega`}</K>:
        <KD>
          {String.raw`
      \frac{\omega(t)}{2\pi} =`}
        </KD>
        <KD>
          {String.raw`
      \begin{cases}
        1 & 0 \leq (t\, \mathrm{mod} \,0.75) < 0.5\\
        2 & 0.5 \leq (t\, \mathrm{mod}\, 0.75) < 0.75
      \end{cases}`}
        </KD>
      </p>
      <p>
        The solution for <K>{String.raw`x(0) = 0`}</K> and{" "}
        <K>{String.raw`v(0) = 1`}</K> is composed of two sine curves of
        different frequency:
      </p>{" "}
      <Image
        fileName="MonodromyIdSin"
        caption="Solution for M = Id, x(0) = 0 and v(0) = 1"
        width={494}
        height={293}
        extension="png"
      />
      <p>
        It is periodic, with period <K>{String.raw`0.75`}</K>. The solution for{" "}
        <K>{String.raw`x(0) = 1`}</K> and <K>{String.raw`v(0) = 0`}</K> is
        composed of two cosine curves of different frequency:
      </p>
      <Image
        fileName="MonodromyId"
        caption="Solution for M = Id, x(0) = 1 and v(0) = 0"
        width={498}
        height={307}
        extension="png"
      />
      <p>
        This too is periodic with period <K>{String.raw`0.75`}</K>. Since the
        solution space is spanned by those two solutions, every solution is
        periodic with period <K>{String.raw`0.75`}</K>. Since{" "}
        <K>{String.raw`0.75`}</K> is also the period of{" "}
        <K>{String.raw`\omega`}</K>, both eigenvalues are one. So the monodromy
        matrix is the identity.
      </p>
      <p>
        Now an example where <K>{String.raw`M = -\mathrm{Id}`}</K>. Consider the
        following non-constant <K>{String.raw`\omega`}</K>:
      </p>
      <KD>
        {String.raw`
      \frac{\omega(t)}{2\pi} =
      \begin{cases}
        1 & 0 \leq (t\,\mathrm{mod}\, 1) < 0.5\\2 & 0.5 \leq (t\,\mathrm{mod}\, 1) \lt 1
      \end{cases}`}
      </KD>
      <p>
        The solution for <K>{String.raw`x(0) = 0`}</K> and{" "}
        <K>{String.raw`v(0) = 1`}</K> is composed of two sine/cosine curves of
        different frequency:
      </p>
      <Image
        fileName="MonodromyMinusId01"
        caption="Solution for M = -Id, x(0) = 0 and v(0) = 1"
        width={499}
        height={290}
        extension="png"
      />
      <p>
        This is periodic, with period two. The solution for{" "}
        <K>{String.raw`x(0) = 1`}</K> and <K>{String.raw`v(0) = 0`}</K> too is
        composed of two sine/cosine curves of different frequency:
      </p>
      <Image
        fileName="MonodromyMinusId10"
        caption="Solution for M = -Id, x(0) = 1 and v(0) = 0"
        width={490}
        height={305}
        extension="png"
      />
      <p>
        This too is periodic with period two. Since the solution space is
        spanned by those two solutions, <em>every</em> solution is periodic with
        period two. Since that is twice the period of{" "}
        <K>{String.raw`\omega`}</K>, both eigenvalues are minus one. So the
        monodromy matrix is the minus identity.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);

  return { props: { staticHtml } };
};
