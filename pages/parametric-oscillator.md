---
title: "Parametric oscillator: a close look"
date: "2014-07-23"
type: "post"
---

This post contains my research notes about the _parametric oscillator_. Here is an introduction from Wikipedia (see references section):

> A parametric oscillator is a harmonic oscillator whose parameters oscillate in time. For example, a well known parametric oscillator is a child pumping a swing by periodically standing and squatting to increase the size of the swing's oscillations. The varying of the parameters drives the system. Examples of parameters that may be varied are its resonance frequency $\omega$ and damping $\beta$.

As that Wikipedia article shows, a certain coordinate change can eliminate damping. So we focus on the case where there is only a resonance frequency $\omega$, which varies with time. That is, we consider the differential equation

$$
\displaystyle\ddot{x}(t) + \omega(t)^2 x(t) = 0 \quad
$$

where $\omega(t)$ repeats itself after some time interval $T$.

The main purpose of this post is to preserve what I learned, for my own future reference. I am bad at maintaining handwritten notes, so I am moving to a digital medium. On the off chance that this interests others, I put it on the web. This post contains some work of my own that goes beyond the material in the references section. Most or all of my findings are likely known by experts. The proofs are mine, and so are the mistakes.

## Floquet theory

A suitable mathematical background for the parametric oscillator is _Floquet theory_ (see references section). It deals with linear differential equations of the form

$$
\dot{x}(t) = A(t) x(t)
$$

where $x:\mathbb{R}\to\mathbb{R}^n$, and the function $A:\mathbb{R}\to\mathbb{R}^{n\times n}$ is periodic with $T$. We could also consider complex numbers as the elements of $x$ and $A$, but we shall stick with the reals here, in accordance with the physics. We can write a parametric oscillator as a Floquet equation:

$$
\frac{d}{dt} \left(\begin{array}{c} x \\ v\end{array}\right) = \left(\begin{array}{cc} 0 & 1 \\-\omega(t)^2 & 0\end{array}\right)\left(\begin{array}{c} x \\ v\end{array}\right)
$$

I encountered Floquet theory in the well-known "Mechanics" book by Landau and Lifshitz (see references section), which we shall call "the book" in this post. The book contains a chapter on _parametric resonance_, which deals with parametric oscillators and their resonance behavior. The book uses Floquet theory in specialized form, without calling it so. Part of my motivation here is to obviate the exact way in which that book chapter ties in with general Floquet theory.

## The monodromy matrix

We shall now introduce the notion of _monodromy_, which is pivotal for Floquet theory. Let $\Psi: \mathbb{R}\to \mathbb{R}^{n\times n}$ be a fundamental matrix for a Floquet differential equation. Then $\Psi_T(t) := \Psi(t + T)$ is also a fundamental matrix, because $A(t+T)=A(t)$. So we have $\Psi(t + T) = \Psi(t) M$ for some invertible $n\times n$-matrix $M$. This $M$ describes the change of the solution after each period. It is called the _monodromy matrix_. Rightly so, since in Greek "mono" means "one" and "dromos" means "course" or "running".

One checks easily that different $\Psi$ for the same $A$ can yield different $M$. But:

Lemma: _The monodromy matrix of a Floquet equation is determined up to isomorphism._

So see this, let $\Phi$ be another fundamental matrix for $A$. Let $N$ be the corresponding monodromy matrix. We have $\Phi(t) = \Psi(t) Q$ for some invertible $n\times n$-matrix $Q$. So

$$
\begin{aligned}\Psi(t) Q N &= \Phi(t)N = \Phi(t+T) \\&= \Psi(t+T)Q = \Psi(t) M Q\end{aligned}
$$

Because $\Psi(t)$ and $Q$ are invertible, we get $N = Q^{-1} M Q$ □

Importantly, it follows that any two monodromy matrices have the same Jordan normal forms, and therefore the same eigenvalues.

Now recall that we assumed that the matrix $A$ from our Floquet equation has only real entries. Naturally, we are only interested in real solutions $\Psi$. So any resulting $M$ too has only real entries.

## Floquet's theorem

Floquet equations cannot not generally be solved symbolically. However, Floquet's theorem makes a useful statement about the solutions. The version of the theorem that interests me here is:

Theorem: _Any fundamental matrix $\Psi$ of a Floquet equation with period $T$ has the form_

$$
\Psi(t) = \Pi(t) e^{t B}
$$

_for some $T$-periodic matrix function $\Pi$ and some matrix $B$ of matching dimension._

Note that the statement employs the _matrix exponential_ $e^{t B}$ (see references section).

_Proof:_ Because $M$ is invertible, it has a _matrix logarithm_ (see references section), that is, a matrix of which it $M$ is the exponential. (Important properties of the matrix logarithm are: they exist for every invertible matrix; and as in the special case of scalar logarithms, they can be complex-valued even if the exponential is real-valued, and they are not unique. For example, $i(2k+1)\pi$ is a logarithm of minus one for every integer $k$.) Let $B$ be a logarithm of $M$, divided by $T$. That is, $e^{T B} = M$. Let $\Pi(t) := \Psi(t) e^{-t B}$. To see that $\Pi$ is $T$-periodic, consider

$$
\begin{aligned}\Pi(t+T) &= \Psi(t+T) e^{-(t+T)B} \\ &= \Psi(t) M e^{-T B -t B} \\ &= \Psi(t) e^{T B} e^{-T B} e^{-t B} \\ &= \Psi(t) e^{-t B} = \Pi(t) \end{aligned}
$$

## Applying the theorem to the oscillator

First we perform a coordinate change into the eigensystem of the monodromy matrix $M$. This is tantamount to assuming that $M$ is in Jordan normal form. As for any $2\times 2$-Matrix, the Jordan normal form is

$$
M = \left(\begin{array}{cc}\mu_1 & \delta \\0 & \mu_2\end{array}\right)
$$

where the $\mu_i$ are the eigenvalues and $\delta$ is zero ore one. The book considers only the case where the two eigenvalues differ, and therefore $\delta$ is zero. We shall also consider the case where $\delta$ is one. This can happen, as we shall see later.

We shall now apply the Floquet theorem. First, we need a logarithm of $M$. We shall deal first with the more difficult case where $\delta$ is one, and therefore $\mu_1=\mu_2=\mu$.

As explained in a Wikipedia article referenced below, the logarithm can be calculated as a _Mercator series_:

$$
\ln (1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots
$$

We have $M = \mu(I + K)$ where $I$ stands for the identity matrix, and

$$
K =\left(\begin{array}{cc}0 & 1/\mu \\0 & 0\end{array}\right)
$$

Using the fact that $K^n$ vanishes for $n$ greater than two, we get

$$
\begin{aligned}\ln M &=\ln \big(\mu(I+K)\big) \\&=\ln (\mu I) +\ln (I+K) \\&= (\ln \mu) I + K-\frac{K^2}{2}+\frac{K^3}{3}-\cdots \\&= (\ln \mu) I + K \\&=\left(\begin{array}{cc}\ln\mu & 1/\mu \\0 & \ln\mu\end{array}\right)\end{aligned}
$$

From the proof of the theorem, we know that we can choose $B = T^{-1}\ln M$. Some calculation involving the matrix exponential yields

$$
e^{t B} =\left(\begin{array}{cc}\mu^{t/T} & \frac{t}{T}\mu^{t/T-1} \\0 & \mu^{t/T}\end{array}\right)
$$

Note that $e^{T B} = M$, as required. Now suppose we have a fundamental matrix

$$
\Psi(t) =\left(\begin{array}{cc}x_1(t) & x_2(t) \\v_1(t) & v_2(t)\end{array}\right)
$$

When we spell out the Floquet theorem elementwise, and ignore the $v_i$, we get:

Corollary: _If $\delta = 1$, there are $T$-periodic functions $\pi_1$, $\pi_2$ and $\pi_3$ such that_

$$
\begin{aligned}x_1(t) &= \mu^{t/T} \pi_1(t) + \frac{t}{T}\mu^{t/T-1} \pi_3(t) \\ x_2(t) &= \mu^{t/T} \pi_2(t)\end{aligned}
$$

If $\delta = 0$, we get the result from the book:

Corollary: _If $\delta = 0$, there are $T$-periodic functions $\pi_1$ and $\pi_2$ such that_

$$
x_1(t) = \mu_1^{t/T} \pi_1(t) \qquad x_2(t) = \mu_2^{t/T} \pi_2(t)
$$

The calculation is much simpler than for $\delta=1$. I leave it away here.

## Possible eigenvalues

First, we observe, like the book:

Observation: _The eigenvalues of the monodromy matrix $M$ of a parametric oscillator are either real or complex conjugates of one another._

This follows simply from the fact that $M$ has only real entries. Now the book deduces, for $\delta = 0$, that the eigenvalues must be mutually reciprocal. We shall show this even for $\delta = 1$:

Lemma: _The product of the eigenvalues of the monodromy matrix $M$ of a parametric oscillator is one._

Proof: _Liouvilles formula_ (see reference section) entails for every fundamental matrix $\Psi$ of a Floquet equation that

$$
\frac{d}{dt}\det\,\Psi(t) = \mathrm{tr}\,A(t) \cdot\det\,\Psi(t)
$$

Here $\mathrm{tr}$ stands for trace, which is the sum of the diagonal elements of a matrix. For a parametric oscillator, that trace is zero. So $\det\,\Psi(t)$ is constant. Because $\Psi(t+T) = \Psi(t)M$, we have $\det\,\Psi(t+T)=\det\Psi(t)\det M$. Since $\Psi$ is constant, we have $\det\,\Psi(t+T)=\det\Psi(t)$, and since $\det\,\Psi(t)\neq 0$ we have $\det\,M = 1$. The claim follows because the determinant is the product of the eigenvalues □

Combining the results of this section, we see that the eigenvalues are either reciprocal reals, or two non-reals on the complex unit circle which are complex conjugates of one another. When $\delta = 1$, we know also that the two eigenvalues are the same, and so they are both one or both minus one.

## Classification of possible behaviors

First, suppose that $\delta = 1$. Then the eigenvalues are both one or both minus one.

If $\mu = 1$, we have by an earlier corollary

$$
\begin{aligned}x_1(t) &= \pi_1(t) + \frac{t}{T}\pi_3(t) \\x_2(t) &= \pi_2(t)\end{aligned}
$$

for $T$-periodic $\pi_1$, $\pi_2$, and $\pi_3$, where $x_1$ and $x_2$ are coordinates which go along with the eigensystem of the monodromy matrix.

If $\mu = -1$, we have

$$
\begin{aligned}x_1(t) &= (-1)^{t/T} \pi_1(t) + \frac{t}{T}(-1)^{t/T-1} \pi_3(t) \\ x_2(t) &= (-1)^{t/T} \pi_2(t)\end{aligned}
$$

Note that this entails that we have $2T$-periodic $\rho_1$, $\rho_2$, and $\rho_3$ such that

$$
\begin{aligned}x_1(t) &= \rho_1(t) + \frac{t}{T}\rho_3(t) \\x_2(t) &= \rho_2(t)\end{aligned}
$$

Now suppose that $\delta = 0$. We concluded above that $x_1(t) = \mu_1^{t/T} \pi_1(t)$ and $x_2(t) = \mu_2^{t/T} \pi_2(t)$ for $T$-periodic $\pi_1$ and $\pi_2$.

If the eigenvalues are both one, we have $T$-periodic behavior, respectively. Note that in this case $M$ is not just isomorphic to, but _equal_ to the identity matrix. So any coordinate system is an eigensystem, that is, we can choose the $x_i$ freely.

If the eigenvalues are both minus one, we have $2T$-periodic behavior. In this case $M$ is not just isomorphic to, but _equal_ to minus one times the identity matrix. So here too, any coordinate system is an eigensystem, so we can choose the $x_i$ freely.

If the eigenvalues are other reals, the one whose absolute value is greater than one "wins" as $t$ goes towards infinity. So the amplitude grows exponentially. If the eigenvalues are not reals, they are on the complex unit circle, and the amplitude has an upper bound.

## Example: the Mathieu equation

The Mathieu equation is the parametric oscillator with

$$
\omega(t)^2 = \omega_0^2(1 + h \cos (\gamma t))
$$

If this $\omega(t)$ came from a child on a swing, it would be a strange child: one that stands and squats at a frequency $\gamma$ independent of the resonance frequency $\omega_0$ of the swing. Still, the Mathieu equation is important in physics.

Here is a graph showing the monodromy's eigenvalues for the Mathieu equation with $\omega_0 = 1$ and $h = 1$. The vertical axis corresponds to $\gamma$, which ranges from $0.2$ to $5$. Horizontally, we have the complex plane. For each $\gamma$, the graph contains _both_ eigenvalues of the corresponding monodromy matrix. I refrained from drawing the coordinate axes, to avoid clutter.

<figure>
  <video autoplay loop muted playsinline controls>
    <source src="../images/MathieuBunny.webm" type="video/webm">
    <source src="../images/MathieuBunny.mp4" type="video/mp4">
  </video>
  <figcaption>The eigenvalues of a Mathieu equation as gamma changes</figcaption>
</figure>

The graph shows that, for every $\gamma$, the eigenvalues are either (1) on a circle, which happens to be the unit circle, or (2) opposite one another on a perpendicular of the circle, actually, reciprocal reals. This agrees with our mathematical results about the possible eigenvalues. In case (1) we have no resonance. In case (2), we have resonance.

The greatest resonance is represented by the "face of the bunny", around $\gamma = 2\omega_0 = 2$, connected to the circle at $-1 + 0i$. The second greatest resonance is represented by the bunny's (uppermost) tail, around $\gamma = \omega_0 = 1$, connected to the circle at $1 + 0i$. This second greatest resonance corresponds to a normal child that stands and squats once during a period of the swing. The greatest resonance corresponds to an eager child that turns around at the apex, facing down again, and stands and squats again on the way back.

There are also resonances for smaller $\gamma$, their connection points with the circle alternating between $-1 + 0i$ and $1 + 0i$.

It is worth noting that, for smaller $h$, the resonance areas can shrink in such a way that only the bunny's face at $\gamma = 2$ remains, while all resonances at smaller $\gamma$ vanish. That is: if the child's standing and squatting have a small amplitude $h$, the child needs to stand and squat more often to achieve resonance.

## The transition into and out of resonance

### Possible shapes of the monodromy matrix

As we have seen, the transitions into and out of resonance happen where the eigenvalues are both one or both minus one. This means that the Jordan normal form of the monodromy matrix is

$$
\left(\begin{array}{cc}1 & \delta \\0 & 1\end{array}\right)\qquad \mathrm{or} \qquad\left(\begin{array}{cc}-1 & \delta \\0 & -1\end{array}\right)
$$

where $\delta$ is zero or one. So:

_To fully understand the transitions into and out of resonance, we must know $\delta$!_

From the start, I wondered about the case where $M$ cannot be diagonalized, that is, $\delta = 1$, since that was left aside in the book. Next, I was intrigued by the instantaneous ninety-degree turns where the bunny's body meets the face or a tail. Those points turned out to be the only ones where $M$ might be undiagonalizable. So I kept running into the question about $\delta$.

I checked, with Mathematica, the bunny's two transition points for the resonance at $\gamma = 2$, and its two transition points for the resonance at $\gamma = 1$. In all cases, we have $\delta = 1$. So the question arises:

_Is it true for all parametric oscillators that the monodromy matrix is undiagonalizable at all transitions into and out of resonance?_

We shall now shed light on this question.

### The meaning of diagonalizability and lack thereof

First, suppose that $\delta = 0$. If $\mu = 1$, we have, as observed above, two linearly independent solutions $x_1(t) = \pi_1(t)$ and $x_2(t) = \pi_2(t)$ where the $\pi_i$ are $T$-periodic. Since every solution $x(t)$ is a linear combination of those $x_i$, it follows that _every_ solution is $T$-periodic. So, for every initial phase $(x(t_0), v(t_0))$ at some $t_0$, the corresponding solution is $T$-periodic. If $\mu = -1$, we can deduce by a similar argument: for every initial phase $(x(t_0), v(t_0))$ at some $t_0$, the corresponding solution is $2T$-periodic.

Now suppose that $\delta = 1$. If $\mu = 1$, we have, as observed above, two linearly dependent solutions $x_1(t) = \pi_1(t)$ and $x_2(t) = \pi_2(t) + \frac{t}{T} \pi_3(t)$ where the $\pi_i$ are $T$-periodic. So the solution space, which is two-dimensional, has a one-dimensional subspace of $T$-periodic functions. All other solutions grow linearly with time. So for every $t_0$, the (also two-dimensional) space of initial conditions at $t_0$ has a one-dimensional subspace of $T$-periodic solutions. For all other initial conditions, the solutions grow linearly with time. For $\mu = -1$, we get something similar: for every $t_0$, the space of initial conditions has a one-dimensional subspace of periodic solutions, this time with period $2T$. Again, all other solutions grow linearly.

In summary: for $\delta = 0$, all solution are periodic, while for $\delta = 1$ only some are periodic. In the latter case, we can destabilize a periodic solution by arbitrarily small changes of the initial conditions.

### Undiagonizable examples

We shall now give a stringent example, more illuminating than the Mathieu equation, where $\delta = 1$, that is, $M$ cannot be diagonalized. Here $\omega$ will be a certain rectangular pulse:

$$
\omega(t) =\begin{cases}1 & 0 \leq (t\, \mathrm{mod}\, T) < t_1\\\omega_{\mathrm{max}} & t_1 \leq t\,\mathrm{mod}\, T) < t_2\\0 & t_2 \leq (t\,\mathrm{mod}\, T) < t_3 < \frac{\pi}{2}\\1 & t_3 \leq (t\, \mathrm{mod} \,T) < T\end{cases}
$$

Here $T$ is the period, which we must still determine. And $\omega_{\mathrm{max}}$ is a value greater than one, which we must still determine. For the construction, we assume temporarily as initial conditions $x(0) = 1$ and $v(0) = 0$. That is, the solution is the cosine for $0 \leq t < t_1$. We let $t_2 = t_1 + \Delta t$ for a small $\Delta t$. The $\omega_{\mathrm{max}} > 1$ "accelerates the swing", that is, the solution increases its descent more than a cosine while $\omega_{\mathrm{max}}$ lasts. We choose $\omega_{\mathrm{max}}$ in such a way that at $t_2$ the solution's first derivative is minus one. There it remains until $t_3$ since $\omega$ is zero there. We let $t_3$ be the point where the solution is zero for the first time for positive $t$. So, from $t_3$, the solution is again a like cosine with amplitude one, _but shifted a little to the left_. We let $T$ be the time, slightly less than $2\pi$, where the solution is zero the second time for positive $t$. Obviously, the solution is periodic with $T$. It looks like a cosine, except that in the first quadrant there is a "fast forward" lasting from $t_1$ to $t_3$.

So, our constructed parametric oscillator has a periodic solution. But are _all_ solutions periodic? No! We fine-tuned $\omega(t)$ so that it would have a periodic solution specifically for the initial condition $x(0) = 1$ and $v(0) = 0$. As can be easily checked, that there are other initial conditions with non-periodic solutions. So, owing to earlier observations, the initial conditions with periodic solutions form a one-dimensional subspace. That is, the only periodic solutions arise from initial conditions that are scalar multiples of $x(0) = 1, v(0) = 0$. The period of our $\omega$ function happens to agree with that of the oscillator's solution, so the eigenvalues are one. In summary, our constructed parametric oscillator has

$$
M = \left(\begin{array}{cc}1 & 1 \\0 & 1\end{array}\right)
$$

Our constructed $\omega$ supplies one impulse in the first quadrant of the movement. So four quadrants pass between impulses. Obviously, we could modify our construction to have an impulse in the first _and_ third quadrant. Then two quadrants would pass between impulses. So the solution's period would be twice that of $\omega$, and the eigenvalues would be minus one. We could also modify our construction to have six quadrants between impulses (eigenvalues minus one), or eight (eigenvalues one), or ten( eigenvalues minus one), and so on.

### Diagonalizable examples

First I conjectured, in this post, that there is no parametric oscillator with non-constant $\omega$ that has $M = \mathrm{Id}$ or $M = -\mathrm{Id}$. My conjecture was inspired by the previous section. But John Baez proved me wrong.

First, an example where $M = \mathrm{Id}$. Consider the following non-constant $\omega$:

$$
\frac{\omega(t)}{2\pi} =\begin{cases}1 & 0 \leq (t\, \mathrm{mod} \,0.75) < 0.5\\2 & 0.5 \leq (t\, \mathrm{mod}\, 0.75) < 0.75\end{cases}
$$

The solution for $x(0) = 0$ and $v(0) = 1$ is composed of two sine curves of different frequency:

<figure>
  <picture>
    <source srcset="../images/MonodromyIdSin.webp" type="image/webp">
    <img src="../images/MonodromyIdSin.png" loading="lazy" alt="Solution for M = Id, x(0) = 0 and v(0) = 1">
  </picture>
  <figcaption>Solution for M = Id, x(0) = 0 and v(0) = 1</figcaption>
</figure>

It is periodic, with period $0.75$. The solution for $x(0) = 1$ and $v(0) = 0$ is composed of two cosine curves of different frequency:

<figure>
  <picture>
    <source srcset="../images/MonodromyId.webp" type="image/webp">
    <img src="../images/MonodromyId.png" loading="lazy" alt="Solution for M = Id, x(0) = 1 and v(0) = 0">
  </picture>
  <figcaption>Solution for M = Id, x(0) = 1 and v(0) = 0</figcaption>
</figure>

This too is periodic with period $0.75$. Since the solution space is spanned by those two solutions, every solution is periodic with period $0.75$. Since $0.75$ is also the period of $\omega$, both eigenvalues are one. So the monodromy matrix is the identity.

Now an example where $M = -\mathrm{Id}$. Consider the following non-constant $\omega$:

$$
\frac{\omega(t)}{2\pi} =\begin{cases}1 & 0 \leq (t\,\mathrm{mod}\, 1) < 0.5\\2 & 0.5 \leq (t\,\mathrm{mod}\, 1) \lt 1\end{cases}
$$

The solution for $x(0) = 0$ and $v(0) = 1$ is composed of two sine/cosine curves of different frequency:

<figure>
  <picture>
    <source srcset="../images/MonodromyMinusId01.webp" type="image/webp">
    <img src="../images/MonodromyMinusId01.png" loading="lazy" alt="Solution for M = -Id, x(0) = 0 and v(0) = 1">
  </picture>
  <figcaption>Solution for M = -Id, x(0) = 0 and v(0) = 1</figcaption>
</figure>

This is periodic, with period two. The solution for $x(0) = 1$ and $v(0) = 0$ too is composed of two sine/cosine curves of different frequency:

<figure>
  <picture>
    <source srcset="../images/MonodromyMinusId10.webp" type="image/webp">
    <img src="../images/MonodromyMinusId10.png" loading="lazy" alt="Solution for M = -Id, x(0) = 1 and v(0) = 0">
  </picture>
  <figcaption>Solution for M = -Id, x(0) = 1 and v(0) = 0</figcaption>
</figure>

This too is periodic with period two. Since the solution space is spanned by those two solutions, _every_ solution is periodic with period two. Since that is twice the period of $\omega$, both eigenvalues are minus one. So the monodromy matrix is the minus identity.

## References

1. L.D.Landau and E.M.Lifschitz. Lehrbuch der theoretischen Physik I: Mechanik. Verlag Harry Deutsch, 14. Auflage.
2. [Wikipedia: Floquet theory](http://en.wikipedia.org/wiki/Floquet_theory)
3. [Wikipedia: Liouville's formula](http://en.wikipedia.org/wiki/Liouville's_formula)
4. [Wikipedia: Matrix exponential](http://en.wikipedia.org/wiki/Matrix_exponential)
5. [Wikipedia: Logarithm of a matrix](http://en.wikipedia.org/wiki/Matrix_exponential)
