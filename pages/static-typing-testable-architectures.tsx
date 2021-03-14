import Layout from "../components/layout";
import Date from "../components/date";
import { Image } from "../components/media";
import { LinkedReference } from "../components/references";
import meta from "../meta/static-typing-testable-architectures-meta";

const Post = () => (
  <Layout page={meta.target}>
    <h1>{meta.title}</h1>
    <p>
      <small>
        <Date dateString={meta.date} />
      </small>
    </p>
    <p>
      Generally, I’m all for static typing. After all, it make it possible to
      ensure aspects of program behaviour in a universal way, as opposed to unit
      tests, which operate on an anecdotal basis. Imagine my surprise when I
      realized that certain widely-used static type systems, like the ones of
      Java or C#, can lure programmers into an architectural trap, unlike
      dynamic type systems like the one of Python. Let me explain.{" "}
    </p>
    <p>
      Consider the following two classes (I am using C# syntax, but I might as
      well use Java):
    </p>
    <pre>
      <code>
        {String.raw`
public abstract class Car
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
}      
`}
      </code>
    </pre>
  </Layout>
);

export default Post;
