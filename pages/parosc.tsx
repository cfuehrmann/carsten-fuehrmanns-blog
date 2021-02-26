import Layout from "../components/layout";
import Date from "../components/date";
import { K, KD, Lemma, Theorem, Corollary, Proof } from "../components/math";

const ParOsc = () => (
  <Layout page="parametric-oscillator">
    <h1>Parametric oscillator: a close look</h1>

    <p>
      <small>
        <Date dateString="2014-07-23" />
      </small>
    </p>

    <p>
      This post contains my research notes about the{" "}
      <em>parametric oscillator</em>. Here is an introduction from Wikipedia
      (see references section):
    </p>

    <blockquote>
      A parametric oscillator is a harmonic oscillator whose parameters
      oscillate in time. For example, a well known parametric oscillator is a
      child pumping a swing by periodically standing and squatting to increase
      the size of the swing's oscillations. The varying of the parameters drives
      the system. Examples of parameters that may be varied are its resonance
      frequency <K>\omega</K> and damping <K>\beta</K>.
    </blockquote>

    <p>
      As that Wikipedia article shows, a certain coordinate change can eliminate
      damping. So we focus on the case where there is only a resonance frequency{" "}
      <K>\omega</K>, which varies with time. That is, we consider the
      differential equation
      <KD>
        {String.raw`\displaystyle\ddot{x}(t) + \omega(t)^2 x(t) = 0 \quad`}
      </KD>
      where <K>\omega(t)</K> repeats itself after some time interval <K>T</K>.
    </p>

    <p>
      The main purpose of this post is to preserve what I learned, for my own
      future reference. I am bad at maintaining handwritten notes, so I am
      moving to a digital medium. On the off chance that this interests others,
      I put it on the web. This post contains some work of my own that goes
      beyond the material in the references section. Most or all of my findings
      are likely known by experts. The proofs are mine, and so are the mistakes.
    </p>

    <h2>Floquet theory</h2>

    <p>
      A suitable mathematical background for the parametric oscillator is{" "}
      <em>Floquet theory</em> (see references section). It deals with linear
      differential equations of the form{" "}
      <KD>{String.raw`\dot{x}(t) = A(t) x(t)`}</KD> where{" "}
      <K>{String.raw`x:\mathbb{R}\to\mathbb{R}^n`}</K>, and the function
      <K>{String.raw`A:\mathbb{R}\to\mathbb{R}^{n\times n}`}</K> is periodic
      with <K>T</K>. We could also consider complex numbers as the elements of
      <K>x</K> and <K>A</K>, but we shall stick with the reals here, in
      accordance with the physics. We can write a parametric oscillator as a
      Floquet equation:
      <KD>
        {String.raw`
        \frac{d}{dt} 
        \left(\begin{array}{c} x \\ v\end{array}\right) = 
        \left(\begin{array}{cc} 0 & 1 \\ -\omega(t)^2 & 0\end{array}\right)
        \left(\begin{array}{c} x \\ v\end{array}\right)`}
      </KD>
    </p>

    <p>
      I encountered Floquet theory in the well-known "Mechanics" book by Landau
      and Lifshitz (see references section), which we shall call "the book" in
      this post. The book contains a chapter on <em>parametric resonance</em>,
      which deals with parametric oscillators and their resonance behavior. The
      book uses Floquet theory in specialized form, without calling it so. Part
      of my motivation here is to obviate the exact way in which that book
      chapter ties in with general Floquet theory.
    </p>

    <h2>The monodromy matrix</h2>

    <p>
      We shall now introduce the notion of <em>monodromy</em>, which is pivotal
      for Floquet theory. Let{" "}
      <K>{String.raw`\Psi: \mathbb{R}\to \mathbb{R}^{n\times n}`}</K>
      be a fundamental matrix for a Floquet differential equation. Then{" "}
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
          \Psi(t) Q N &= \Phi(t)N = \Phi(t+T) \\
          &= \Psi(t+T)Q = \Psi(t) M Q
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
      equation has only real entries. Naturally, we are only interested in real
      solutions <K>\Psi</K>. So any resulting <K>M</K> too has only real
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
      exponential. (Important properties of the matrix logarithm are: they exist
      for every invertible matrix; and as in the special case of scalar
      logarithms, they can be complex-valued even if the exponential is
      real-valued, and they are not unique. For example, <K>i(2k+1)\pi</K> is a
      logarithm of minus one for every integer <K>k</K>.) Let <K>B</K> be a
      logarithm of <K>M</K>, divided by <K>T</K>. That is,{" "}
      <K>{String.raw`e^{T B} = M`}</K>. Let{" "}
      <K>{String.raw`\Pi(t) := \Psi(t) e^{-t B}`}</K>. To see that <K>\Pi</K> is{" "}
      <K>T</K>-periodic, consider
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
      First we perform a coordinate change into the eigensystem of the monodromy
      matrix <K>M</K>. This is tantamount to assuming that <K>M</K> is in Jordan
      normal form. As for any <K>{String.raw`2\times 2`}</K>-Matrix, the Jordan
      normal form is{" "}
      <KD>
        {String.raw`
        M = \left(\begin{array}{cc}\mu_1 & \delta \\0 & \mu_2\end{array}\right)`}
      </KD>
      where the <K>{String.raw`\mu_i`}</K> are the eigenvalues and{" "}
      <K>{String.raw`\delta`}</K> is zero ore one. The book considers only the
      case where the two eigenvalues differ, and therefore{" "}
      <K>{String.raw`\delta`}</K> is zero. We shall also consider the case where{" "}
      <K>{String.raw`\delta`}</K> is one. This can happen, as we shall see
      later.
    </p>

    <p>
      We shall now apply the Floquet theorem. First, we need a logarithm of{" "}
      <K>{String.raw`M`}</K>. We shall deal first with the more difficult case
      where <K>{String.raw`\delta`}</K> is one, and therefore{" "}
      <K>{String.raw`\mu_1=\mu_2=\mu`}</K>.
    </p>

    <p>
      As explained in a Wikipedia article referenced below, the logarithm can be
      calculated as a <em>Mercator series</em>:
      <KD>
        {String.raw`
        \ln (1+x)=x-\frac{x ^ 2}{2}+\frac{x ^ 3}{3}-\frac{x ^ 4}{4}+\cdots`}
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
          &= (\ln \mu) I + K-\frac{K^2}{2}+\frac{K^3}{3}-\cdots \\
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
      -periodic functions <K>{String.raw`\pi_1`}</K>, <K>{String.raw`\pi_2`}</K>{" "}
      and <K>{String.raw`\pi_3`}</K> such that
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
        x_1(t) = \mu_1^{t/T} \pi_1(t) \qquad x_2(t) = \mu_2^{t/T} \pi_2(t)`}
      </KD>
      The calculation is much simpler than for <K>{String.raw`\delta=1`}</K>. I
      leave it away here.
    </Corollary>
  </Layout>
);

export default ParOsc;
