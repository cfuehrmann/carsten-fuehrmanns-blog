import "highlight.js/styles/a11y-light.css";

import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import Layout from "../components/layout";
import BlogPost from "../components/blog-post";
import meta from "../meta/static-typing-testable-architectures-meta";
import Code from "../components/code";
import { LinkedReference } from "../components/references";

export default function StaticTypingTestableArchitectures(props: {
  staticHtml: string;
}) {
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
        Generally, I’m all for static typing. After all, it make it possible to
        ensure aspects of program behaviour in a universal way, as opposed to
        unit tests, which operate on an anecdotal basis. Imagine my surprise
        when I realized that certain widely-used static type systems, like the
        ones of Java or C#, can lure programmers into an architectural trap,
        unlike dynamic type systems like the one of Python. Let me explain.{" "}
      </p>
      <p>
        Consider the following two classes (I am using C# syntax, but I might as
        well use Java):
      </p>

      <Code>
        {String.raw`public abstract class Car
{
  public void Drive()
  {
    // some code involving the methods
    // Accelerate, Brake and Turn below
  }

  public bool Check()
  {
    return CheckEngine() && CheckBreaks();
  }

  public void Repair()
  {
    RepairEngine();
    RepairBrakes();
  }

  protected abstract void Accelerate();
  protected abstract void Brake();
  protected abstract void Turn();

  protected abstract bool CheckEngine();
  protected abstract bool CheckBrakes();

  protected abstract void RepairEngine();
  protected abstract void RepairBrakes();
}

public class Workshop
{
  public void Fix(Car car)
  {
    if (!car.Check())
      car.Fix();
  }

  public void RunAdvertising()
  {
    // some code
  }
}`}
      </Code>
      <p>
        We have a Car class and a Workshop class. Car is a typical “framework”
        class in the sense that, to produce an instance, we need a subclass
        which overrides some virtual methods (Accelerate, Brake, Turn,
        CheckBrakes, CheckEngine, and RepairBrakes, and RepairEngine). By
        contrast, code that consumes instances of Car, as does the Fix method of
        Workshop, can only call non-virtual methods of Car (Drive, Check, and
        Repair). (In C#, methods are non-virtual by default, while in Java one
        would use the modifier “final”. At any rate, Drive, Check, and Repair
        are cleary intended to be non-virtual from a framework point of view.)
      </p>
      <p>
        Cars and workshops are very different things, and therefore should be
        considered separate units for testing. For example, if the team
        responsible for Car breaks the implementation of Repair, the unit tests
        for Workshop should still succeed, because the code there has not
        changed and all that matters is that it calls the Check and Repair
        methods in a particular way. So a good unit test for Workshop would
        introduce a mocked Car that records the actions of its callers, then
        apply the Fix method to it, and finally check if the records are
        correct. Here is a first attempt:
      </p>
      <Code>
        {String.raw`private class MockedBrokenCar : Car
{
  private ArrayList _trace = new ArrayList();

  public override bool Check()
  {
    _trace.Add("Check");
    return false;
  }

  public override void Repair()
  {
    _trace.Add("Repair");
  }

  public ArrayList GetTrace() { return _trace; }
}

[TestMethod]
public void TestRepairOfBrokenCar()
{
  var workshop = new Workshop();
  var car = new MockedBrokenCar();

  workshop.Repair(car);

  var trace = car.GetTrace();
  Assert.AreEqual(2, trace.Count);
  Assert.AreEqual("Check", trace[0]);
  Assert.AreEqual("Repair", trace[1]);
}`}
      </Code>
      <p>
        Unfortunately, this unit test does not compile: the methods Check and
        Repair cannot be overridden, because they are not virtual!
        (Incidentally, I am avoiding mocking frameworks on purpose here, because
        I do not want to distract from the language issues.)
      </p>
      <p>
        A good solution to our problem would be to introduce interface(s) for
        the non-virtual, public methods of Car, e.g. like this:
      </p>
      <Code>
        {String.raw`public interface IRepairable
{
  bool Check();
  void Repair();
}

public interface IDrivable
{
  void Drive();
}

public abstract class Car : IRepairable, IDrivable
{
  void IDrivable.Drive()
  {
    // some code involving the methods Accelerate, Brake and Turn
  }

  bool IRepairable.Check()
  {
    return CheckEngine() && CheckBrakes();
  }

  void IRepairable.Repair()
  {
    RepairEngine();
    RepairBrakes();
  }

  protected abstract void Accelerate();
  protected abstract void Brake();
  protected abstract void Turn();

  protected abstract bool CheckEngine();
  protected abstract bool CheckBrakes();

  protected abstract void RepairEngine();
  protected abstract void RepairBrakes();
}

public class Workshop
{
  public void Repair(IRepairable car)
  {
    if (!car.Check())
      car.Repair();
  }

  public void RunAdvertising()
  {
    // some code
  }
}`}
      </Code>
      <p>
        This improved version allows us to write a compilable version of the
        above unit tests:
      </p>
      <Code>
        {String.raw`private class MockedBrokenCar : IRepairable
{
  private ArrayList _trace = new ArrayList();

  bool IRepairable.Check()
  {
    _trace.Add("Check");
    return false;
  }

  void IRepairable.Repair()
  {
    _trace.Add("Repair");
  }

  public ArrayList GetTrace() { return _trace; }
}

[TestMethod]
public void TestRepairOfBrokenCar()
{
  var workshop = new Workshop();
  var car = new MockedBrokenCar();

  workshop.Repair(car);

  var trace = car.GetTrace();
  Assert.AreEqual(2, trace.Count);
  Assert.AreEqual("Check", trace[0]);
  Assert.AreEqual("Repair", trace[1]);
}`}
      </Code>
      <p>
        So far, I have said nothing a good programmer does not already know. But
        is important to note that (1) the first Car/Workshop example, which
        thwarts the unit test, still occurs a lot in modern software, and the
        unit test simply remains unwritten, and (2) the refactoring needed to
        obtain the testable, interface-based example can be very costly in
        realistic scenarios. (I am speaking from experience). In fact, code as
        in the first example abounds so much that articles and books are written
        about how to get rid of it. (The transition to the second version is not
        the same as “Inversion of Control” or “Dependency Injection”, but
        closely related to those.)
      </p>
      <p>Now the funny thing is this:</p>
      <p>
        <b>
          The mistake in the first example is not even possible in a
          dynamically-typed language. In such a language one can always mock,
          because there are no static types that prevent it.
        </b>
      </p>
      <p>
        A Python programmer, for example, could never fall into the above trap,
        and would likely produce better and more complete unit tests. So we have
        a real-life example where a particular kind of static typing is harmful
        in that it lures programmers into an architectural trap.
      </p>
      <p>
        Where does that leave us? I think these are the conclusions we should
        draw:
      </p>
      <ul>
        <li>
          We might consider the following approach to writing object-oriented
          software: whenever we use implementation-carrying types (like Car) in
          public signatures, we should think very hard if they might harm
          testability and, if necessary, replace them by interfaces.
        </li>
        <li>
          We could go even further. If, like me, you find it hard to see any
          justification for implementation-carrying types in public signatures,
          you may want to avoid them entirely.
        </li>
        <li>
          If we decided to prohibit implementation-carrying types in public
          signatures, we probably could and should enforce that by automatic
          compile-time checks (probably with existing tools, like FxCop).
        </li>
        <li>
          If we decided in favor of the prohibition, we might end up seeing the
          type systems of Java, C# and the like as the true culprits, because
          they fail to prevent the above architectural trap.
        </li>
      </ul>
      <p>
        EDIT (13 Feb 2013): I have just learned that Microsoft already spotted
        the problem I described, and gave an (expensive) solution fairly
        recently: “shims”, see
      </p>
      <LinkedReference target="https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2015/test/isolating-code-under-test-with-microsoft-fakes?view=vs-2015&redirectedfrom=MSDN#shims">
        Microsoft Fakes
      </LinkedReference>
      <p>
        Shims are a technique to mock the unmockable – the unmockable being
        implementation classes without an interface. I don’t know if similar
        approach exists for Java. Regardless, my point remains that the problem
        only exists because of the languages’ type systems.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  return { props: { staticHtml } };
};
