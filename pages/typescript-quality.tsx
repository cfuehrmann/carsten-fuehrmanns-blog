import "highlight.js/styles/a11y-light.css";

import reactDomServer from "react-dom/server";
import { GetStaticProps } from "next";

import BlogPost from "../components/blog-post";
import { Picture, Video } from "../components/media";
import { Link, LinkedReference, InternalReference } from "../components/links";
import BlockQuote from "../components/block-quote";
import {
  TypeScriptInline as Inline,
  TypeScript,
  JavaScript,
  Xml,
  DosInline,
  Json,
  Dos,
  CSharpInline,
  JavaScriptInline,
} from "../components/code";
import { StaticHtml, StaticHtmlProps } from "../components/static-html";

import codeStyles from "../components/code.module.css";
import miscStyles from "../components/misc.module.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = { codeStyles, miscStyles };

export default StaticHtml;

export const meta = {
  title: "TypeScript for quality of web code",
  date: "2015-12-04",
  description:
    "A long article where I made a bet on TypeScript before it went viral",
};

export const getStaticProps: GetStaticProps<StaticHtmlProps> = async () => {
  const inner = (
    <BlogPost {...meta}>
      <p>
        In this blog post, I shall discuss the programming language{" "}
        <em>TypeScript</em> as a way to improve the quality of web code. I shall
        illustrate this with a
      </p>
      <LinkedReference target="https://github.com/cfuehrmann/GameOfLife">
        Game of Life project on GitHub
      </LinkedReference>
      <p>It's a simple web application that visualizes </p>
      <LinkedReference target="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
        Conway's Game of Life
      </LinkedReference>
      <p>
        with rules that can be chosen by the user. You can play with the hosted
        web application by clicking on the image below.
      </p>
      <Link target="../game-of-life/index.html">
        <Picture
          caption="Click to play the GameOfLife demo (I never said I was a GUI designer)"
          fileName="game-of-life-app"
          width={273}
          height={465}
          extension="png"
        />
      </Link>
      <p>The demo will produce animations as in the two images .</p>
      <Video
        fileName="game-of-life-s23-b3"
        caption="Animation from our TypeScript demo"
      />
      <Video
        fileName="game-of-life-s234-s231"
        caption="Animation with alternative rules"
      />
      <p>
        Instructions for building this project from source follow later in this
        post.
      </p>
      <p>
        TypeScript emerged from Microsoft and is open source. There is
        increasing support for it, for example in Microsoft Visual Studio, and
        in the Atom editor. (Visual Studio in particular has its “Intellisense”
        technology working for TypeScript, as well as some basic refactoring.)
        Also, Google and Microsoft will apparently write Version 2 of the
        important <em>AngularJS</em> framework in TypeScript. (There was a link
        here to a blog post by a Microsoft employee, but the target was
        removed.)
      </p>
      <p>Moreover, a top computer scientist,</p>
      <LinkedReference target="https://en.wikipedia.org/wiki/Philip_Wadler">
        Phil Wadler
      </LinkedReference>
      <p>has come up with an interesting</p>
      <LinkedReference target="http://homepages.inf.ed.ac.uk/wadler/typescript-tng-phd-advert.html">
        research grant about improving TypeScript
      </LinkedReference>
      <p>
        (Incidentally, Phil Wadler is from my own academic field, programming
        language theory, and became a Professor at the School of Informatics of
        Edinburgh University soon after I left there having finished my PhD.)
      </p>
      <p>
        Still, this blog post isn’t specifically about TypeScript. TypeScript
        just acts as a representative of <em>any</em> decent, statically-typed
        language that compiles into JavaScript.
      </p>
      <b>Disclaimers</b>
      <p>
        First, I am not a web programmer. (I design business software on the
        .NET platform.) In this post I consider quality measures that are common
        for other languages and transfer them to the JavaScript technology
        stack.
      </p>
      <p>
        Second, to those who know my academic background: I’m still interested
        in programming language theory. But I’m untheoretical here on purpose,
        since I think this topic is best presented as software engineering.
      </p>
      <b>Thanks</b>
      <p>I would like to thank my employer</p>
      <LinkedReference target="https://www.interflex.de/de/index.html">
        Interflex Datensysteme GmbH & Co. KG
      </LinkedReference>
      <p>for admitting much of this work on our “Innovation Fridays”.</p>
      <h2>Overview of this post</h2>
      <InternalReference target="#prelude">
        Prelude: The unique rôle of JavaScript
      </InternalReference>
      <InternalReference target="#maintaining-code-quality">
        Ways of maintaining code quality
      </InternalReference>
      <ul>
        <li>
          <InternalReference target="#test-driven-design">
            Test-driven design (TDD)
          </InternalReference>
        </li>
        <li>
          <InternalReference target="#static-type-system">
            Static type system
          </InternalReference>
        </li>
        <li>
          <InternalReference target="#quality-oriented-build-process">
            Quality-oriented build process
          </InternalReference>
        </li>
      </ul>
      <InternalReference target="#typescript">TypeScript</InternalReference>
      <ul>
        <li>
          <InternalReference target="#type-system">
            The type system
          </InternalReference>
        </li>
        <li>
          <InternalReference target="#modules-and-libraries">
            Module systems, and using libraries
          </InternalReference>
        </li>
      </ul>
      <InternalReference target="#test-driven-design">
        Test-driven design with TypeScript
      </InternalReference>
      <InternalReference target="#build-process">
        Our build process
      </InternalReference>
      <h2 id="prelude">Prelude: the unique rôle of JavaScript</h2>
      <p>
        Remarkably, JavaScript is so far the only programming language that can
        be run straight away by almost every computer user. (Since we all have
        web browsers.)
      </p>
      <p>
        The beginnings of JavaScript are humble compared to the present. Quoting
        the "JavaScript" entry on Wikipedia:
      </p>
      <BlockQuote>
        Initially … many professional programmers denigrated the language
        because its target audience consisted of Web authors and other such
        “amateurs”, among other reasons. The advent of Ajax returned JavaScript
        to the spotlight and brought more professional programming attention.
        The result was a proliferation of comprehensive frameworks and
        libraries, improved JavaScript programming practices, and increased
        usage of JavaScript outside Web browsers, as seen by the proliferation
        of server-side JavaScript platforms.
      </BlockQuote>
      <p>
        One should also mention the ever-faster JavaScript engines, for example
        the V8 engine of Google’s Chrome browser.
      </p>
      <p>
        All statistics point in the same direction: JavaScript has become the
        most used programming language. Even technologies around JavaScript
        still make it into the charts, like “Node.js” and AngularJS in the 2015
        StackOverflow survey:
      </p>
      <Link target="https://insights.stackoverflow.com/survey/2015#tech">
        <Picture
          caption="Popularity of technologies according to a 2015 StackOverflow survey"
          fileName="stack-overflow-2015"
          width={378}
          height={444}
          extension="png"
        />
      </Link>
      <p>
        This blog post focuses on languages that can replace JavaScript as a{" "}
        <em>source</em> language, to improve quality and productivity in larger
        applications, while staying inside the JavaScript technology stack. So
        we are talking about web programming, and programming in server-side
        JavaScript frameworks like “Node.js”.
      </p>
      <p>
        There are two basic approaches to replacing JavaScript as a source
        language:
      </p>
      <ol>
        <li>
          Avoid JavaScript completely, and make browsers understand some
          improved language. This is what Google tried with its <em>Dart</em>{" "}
          language.
        </li>
        <li>
          Translate some improved language into JavaScript with a
          source-to-source compiler, a so-called <em>transpiler</em>. One tends
          to start with a language that is somewhat similar to JavaScript, like{" "}
          <em>CoffeeScript</em> or <em>TypeScript</em>. Often, the JavaScript
          produced by a transpiler can be easily matched with the source code.
        </li>
      </ol>
      <p>
        (Incidentally, CoffeeScript is probably <em>the</em> most popular
        JavaScript replacement, and definitely worth a look. However, it is
        lacks static types, and thus doesn’t meet my quality demands. For an
        interesting discussion of TypeScript vs. CoffeeScript, there was a link
        here. But the target has gone offline.)
      </p>
      <p>
        Google’s original Dart-approach was good in that it avoided the legacy
        language JavaScript completely, ultimately resulting in better machine
        code. But other companies did not adopt Dart, and in mid 2015 Google
        changed its strategy to compiling Dart into JavaScript! See this
      </p>
      <LinkedReference target="https://news.dartlang.org/2015/03/dart-for-entire-web.html">
        2015 news about the Dart language
      </LinkedReference>
      <p>
        (For completeness, it should be mentioned that JavaScript is also
        increasingly used as a transpiler target for <em>non-web</em> languages
        like C and C++. For an overview, see the Wikipedia entry on JavaScript.
        But that’s not the focus of this post.)
      </p>
      <h2 id="maintaining-code-quality">Ways of maintaining code quality</h2>
      <p>
        Every software engineer who took part in a major, long lived software
        project knows: it is hard to maintain enough code quality so that the
        development doesn’t bog down, because of bugs, illegible code, unwieldy
        integration processes, and a resulting fear of change.
      </p>
      <p>
        To maintain code quality, software professionals have developed various
        best practices, a few of which I shall now discuss.
      </p>
      <h3 id="test-driven-design">Test-driven design (TDD)</h3>
      <p>
        One very important quality measure is <em>test-driven design</em> (TDD):
        here, one writes <em>unit tests</em> that, when executed, test the
        behavior of code units. Ideally, all features of all code units are
        covered by such tests. The current stage of the software (the “build”)
        is only deemed okay if all test succeed. Unit tests are only used by the
        developers, and never shipped to the customer.
      </p>
      <h3 id="static-type-system">Static type system</h3>
      <p>
        Unit test are one way to catch programming mistakes early. There is
        another kind of error protection, so obvious that it’s easily
        overlooked: a static type system. For example, an ill-typed Java program
        won’t even compile. In some cases, the type error will even be shown in
        the editor before compilation. Type systems that work by just looking at
        the code (as opposed to running the code) are called <em>static</em>.
      </p>
      <p>
        JavaScript has a type system, but it finds errors only when the code is
        run. Such type systems are called <em>dynamic</em>. Unlike static type
        systems and unit tests, a dynamic type system on its own is no safeguard
        against releasing broken software. Because we may never run the code
        path with the type error before the software is shipped. This argument
        alone shows that JavaScript’s lack of a <em>static</em> type system is a
        problem for code quality!
      </p>
      <p>
        Also, people who code e.g. in C, C++, Java, C# often rely on the static
        type system without thinking. So it is a grave matter that this safety
        net of static types, which is standard in large parts of the software
        industry, is missing from the widely-used JavaScript!
      </p>
      <p>
        Adding a static type system to JavaScript is the main benefit of
        TypeScript. More on that soon.
      </p>
      <h3 id="quality-oriented-build-process">
        Quality-oriented build process
      </h3>
      <p>
        In the scope of this post, by “build process”, I mean the procedure that
        does two things: (1) turn the source code (which will be TypeScript +
        Html + Css) into executable code (which will be JavaScript + HTML +
        CSS). And (2) run all quality checks, ranging from <em>linters</em> to
        unit tests. (A <em>linter</em> is yet another kind of static code check,
        which checks for dubious coding patterns beyond type errors, see the
        Wikipedia on "lint".)
      </p>
      <p>
        The build process has clearly a lot to do with quality and productivity.
        It must be fast, hassle free, and ensure quality. We shall spend some
        time discussing the build process of our TypeScript demo.
      </p>
      <h2 id="typescript">TypeScript</h2>
      Roughly speaking, TypeScript is a JavaScript dialect with static types. I
      shall now describe the most important aspects of language. For an even
      deeper introduction, see
      <LinkedReference target="https://www.typescriptlang.org/">
        typescriptlang.org
      </LinkedReference>
      <h3 id="type-system">The type system</h3>
      <h4>Basic types</h4>
      <p>
        Firstly, TypeScript has some <em>basic types</em>, among them{" "}
        <Inline>number</Inline>, <Inline>boolean</Inline>,{" "}
        <Inline>string</Inline>, and <Inline>Array</Inline>.
      </p>
      <p>
        It is great to have such types, since they rule out mistakes, oversights
        in particular, that might result in long debugging sessions otherwise.
      </p>
      <p>
        But it must said that these types have deficits: first, they all allow{" "}
        <Inline>null</Inline> values. (In Java, say, strings can also be null,
        but that’s a questionable aspect of Java.) Worse, values of basic type
        can also be <Inline>undefined</Inline>. With numbers, there are more
        problems: a value of type number can be <Inline>Infinity</Inline>,{" "}
        <Inline>-Infinity</Inline>, or <Inline>NaN</Inline> (“Not a Number”,
        behold the irony). Also, TypeScript has no type for integers.
      </p>
      <p>
        Basically, these basic types of TypeScript are static versions of the
        corresponding dynamic types of JavaScript. That’s much better than
        nothing, but not as good as one could hope. It is is worth pondering how
        TypeScript’s basic types could be improved, but we must leave that to
        further work, like Phil Wadler’s aforementioned research grant.
      </p>
      <p>
        For completeness, it should be mentioned that the basic types also
        include an <Inline>enum</Inline> type, an <Inline>any</Inline> type, and
        a <Inline>void</Inline> type.
      </p>
      <h4>Classes and interfaces</h4>
      <p>
        Classes in TypeScript look quite similar to those of Java. Here is an
        example:
      </p>
      <TypeScript>
        {String.raw`class Person {
    private name: string;
    private yearOfBirth: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.yearOfBirth = age;
    }
    getName() { return this.name; }
    getAge() { return new Date().getFullYear() - this.yearOfBirth; }
}`}
      </TypeScript>
      <p>
        However, JavaScript’s approach to object-oriented programming is{" "}
        <em>prototype based</em>. Accordingly, the TypeScript transpiler
        translates the above class into JavaScript by using a well known
        pattern:
      </p>
      <JavaScript>
        {String.raw`var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.yearOfBirth = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.getAge = function () {
        return new Date().getFullYear() - this.yearOfBirth;
    };
    return Person;
})();`}
      </JavaScript>
      <p>TypeScript also knows interfaces, for example:</p>
      <TypeScript>
        {String.raw`interface IPerson {
    getName(): string;
    getAge(): number;
}`}
      </TypeScript>
      <p>
        Now an instance of <Inline>{String.raw`Person`}</Inline> can be used
        whenever a function expects an <Inline>IPerson</Inline>:
      </p>
      <TypeScript>
        {String.raw`function showName(p: IPerson) {
    window.alert(p.getName());
}

showName(new Person("John Doe", 42));`}
      </TypeScript>
      <p>
        Note that, unlike in Java, <Inline>Person</Inline> need <em>not</em>{" "}
        implement <Inline>IPerson</Inline> explicitly for this to work. So we
        have
      </p>{" "}
      <LinkedReference target="https://en.wikipedia.org/wiki/Structural_type_system">
        structural typing
      </LinkedReference>
      <p>Of course, a class can extend a parent class:</p>
      <TypeScript>
        {String.raw`class Resident extends Person {
    private address: string;

    constructor(name: string, age: number, address: string) {
        super(name, age);
        this.address = address;
    }
}`}
      </TypeScript>
      <p>
        Here, TypeScript generates the following code, where{" "}
        <JavaScriptInline>__extends</JavaScriptInline> is defined elsewhere in
        the output file by a five-liner:
      </p>
      <JavaScript>
        {String.raw`var Resident = (function (_super) {
    __extends(Resident, _super);
    function Resident(name, age, address) {
        _super.call(this, name, age);
        this.address = address;
    }
    return Resident;
})(Person);`}
      </JavaScript>
      <p>
        So the benefits of TypeScript classes and interfaces should be clear
        now: firstly, they increase readability compared with JavaScript.
        Secondly, as in other programming languages, classes and interfaces (1)
        help catch errors during compile time, (2) guide code design, and (3)
        help different teams negotiate code contracts.
      </p>
      <h4>Generic types</h4>
      <p>
        Generic types, also called <em>generics</em>, are types that depend on
        types. Like Java, C#, and many other languages, TypeScript has generics:
      </p>
      <p>
        On the one hand, there is the build-in type{" "}
        <Inline>{String.raw`Array<T>`}</Inline>, which has as values the arrays
        whose elements are of type <Inline>{String.raw`T`}</Inline>. So we have{" "}
        <Inline>{String.raw`Array<number>`}</Inline>,{" "}
        <Inline>{String.raw`Array<string>`}</Inline>, and so on. TypeScript also
        understands the popular notation <Inline>{String.raw`T[]`}</Inline> as a
        shorthand for <Inline>{String.raw`Array<T>`}</Inline>.
      </p>
      <p>
        On the other hand, we can define our own generics, as classes or
        interfaces. For example, our demo project has an interface{" "}
        <Inline>{String.raw`Seq<T>`}</Inline> for <em>arbitrary</em> enumerable
        collections, not just arrays. Our <Inline>{String.raw`Seq<T>`}</Inline>{" "}
        is in the same spirit as the{" "}
        <CSharpInline>{String.raw`IEnumerable<T>`}</CSharpInline> interface
        known to C#-programmers. We shall explain{" "}
        <Inline>{String.raw`Seq<T>`}</Inline> more in the next paragraph.
      </p>
      <h4>Function types</h4>
      <p>
        Here is our aforementioned generic interface{" "}
        <Inline>{String.raw`Seq<T>`}</Inline> for arbitrary enumerable
        collections. We use it here as a realistic example to motivate{" "}
        <em>function types.</em>
      </p>
      <TypeScript>
        {String.raw`interface Seq<T> {
    filter(condition: (element: T) => boolean): Seq<T>;

    map<TOut>(transform: (element: T) => TOut): Seq<TOut>;

    // some stuff we leave out in this blog post

    toArray(): T[];
}`}
      </TypeScript>
      <p>
        The <Inline>{String.raw`filter()`}</Inline> function is meant for
        transforming a sequence into a shorter one by leaving only those
        elements that satisfy a given condition. Here, the argument{" "}
        <Inline>{String.raw`condition`}</Inline> of the{" "}
        <Inline>{String.raw`filter`}</Inline> function has the{" "}
        <em>function type</em>{" "}
        <Inline>{String.raw`(element: T) => boolean`}</Inline>. That is,
        <Inline>{String.raw`condition`}</Inline> is a function that takes a
        value of the type <Inline>{String.raw`T`}</Inline> and produces a{" "}
        <Inline>{String.raw`boolean`}</Inline>, which decides whether the value
        should be in the sequence returned by the{" "}
        <Inline>{String.raw`filter`}</Inline> function.
      </p>
      <p>
        I leave it to the reader to discover the intended meaning of the{" "}
        <Inline>{String.raw`map`}</Inline> function.
      </p>
      <p>
        Our <Inline>{String.raw`Seq`}</Inline> interface enables very elegant,
        type safe <em>method chaining</em>, for example
      </p>
      <TypeScript>
        {String.raw`var seq: Seq<number> = ... // instance of some implementing class
seq.filter(elmt => elmt > 42).map(elmt => elmt * 2).toArray();`}
      </TypeScript>
      <p>
        The method chain above starts with some sequence{" "}
        <Inline>{String.raw`seq`}</Inline>, transforms it into a sub-sequence
        that consists only of the elements greater than 42, multiplies every
        element of that sub-sequence by two, and transforms the resulting
        sequence into an array. The terms{" "}
        <Inline>{String.raw`elmt => elmt > 42`}</Inline> and{" "}
        <Inline>{String.raw`elmt => elmt * 2`}</Inline> are{" "}
        <em>anonymous functions</em> of type{" "}
        <Inline>{String.raw`(element: T) => boolean`}</Inline>. The latter, for
        example, is the function that multiplies its input by two.
      </p>
      <p>
        If you know C#, you have probably figured out by now that our{" "}
        <Inline>{String.raw`Seq<T>`}</Inline> yields an analogue to{" "}
        <em>LINQ</em>.
      </p>
      <p>
        It should be clear now that function types can be very useful, in
        particular together with generics.
      </p>
      <p>
        Incidentally, JavaScript itself provides anonymous functions. But they
        have a terrible syntax: for example, the JavaScript counterpart of{" "}
        <Inline>{String.raw`elmt => elmt * 2`}</Inline> is
      </p>
      <TypeScript>
        {String.raw`function (elmt) { return elmnt * 2; }`}
      </TypeScript>
      <p>
        Streamlining the syntax for anonymous functions is a simple, yet very
        important feature of TypeScript.
      </p>
      <p>
        This ends our discussion of TypeScript’s type system. There is much more
        to say – see
      </p>
      <LinkedReference target="https://www.typescriptlang.org/">
        typescriptlang.org
      </LinkedReference>
      <h3 id="modules-and-libraries">Module systems, and using libraries</h3>
      <p>
        I shall first illustrate the importance of module systems by describing
        two problems they solve. Then I shall discuss actual module systems
        first for JavaScript, and then for TypeScript.
      </p>
      <h4>Namespaces</h4>
      <p>
        Providing namespaces is an obvious benefit of a module system: in larger
        projects, there are often multiple functions, classes, <em>or</em>{" "}
        interfaces with the same name. For example, there might be multiple
        classes called <Inline>{String.raw`Provider`}</Inline> or{" "}
        <Inline>{String.raw`Parser`}</Inline> or{" "}
        <Inline>{String.raw`Service`}</Inline>, or multiple functions called{" "}
        <Inline>{String.raw`create`}</Inline>. Each occurrence of such a class
        or function will occur in some larger code unit. For example, one code
        unit for database access, one for business logic, and so on. Any module
        system worth the name will allow for naming these larger units, for
        example <Inline>{String.raw`Database`}</Inline> and{" "}
        <Inline>{String.raw`BusinessLogic`}</Inline>, and allow the elements in
        those units to be addressed by their <em>qualified names</em>, for
        example <Inline>{String.raw`Database.Service`}</Inline> and{" "}
        <Inline>{String.raw`BusinessLogic.Service`}</Inline>.
      </p>
      <h4>Maintainable extensibility</h4>
      <p>
        This is a crucial point, which is strangely absent from most discussions
        of module systems. JavaScript is a great for illustrating this: major
        web applications tend to comprise many JavaScript files. These files
        must be loaded into the browser. The old-fashioned way to do this is to
        include, in the main HTML page, one script tag for each required file.
        So the main HTML page will contain code like this:
      </p>
      <Xml>
        {String.raw`<script src="AjaxUtils.js"></script>
<script src="MathFunctions.js"></script>
<script src="Graphics.js"></script>
// and much more`}
      </Xml>
      <p>
        This may look harmless at first. But it is a grave problem for
        medium-sized or large projects: there can be hundreds of required
        JavaScript files, and they can form a complex dependency tree, for
        example
      </p>
      <ul>
        <li>App.html needs App.js</li>
        <li>App.js needs ThirdPartyLibrary.js</li>
        <li>ThirdPartyLibrary.js needs OtherLibrary.js</li>
      </ul>
      <p>
        Now “ThirdPartyLibrary.js” gets an update and replaces “OtherLibrary.js”
        by some “OtherLibrary2.js”. Then “App.html” would have to be changed to
        load “OtherLibrary2.js” instead of “OtherLibrary.js” via a script tag,
        even though the libraries used by “ThirdPartyLibrary.js” should be of no
        concern to “App.html”! Now imagine a large JavaScript application with
        many evolving home-brewed and third-party libraries. Then the script
        tags in “App.html” would become an unmaintainable editing bottleneck!
      </p>
      <p>
        A module system removes the need to maintain a “central registry” of
        code units, typically by introducing a syntax of{" "}
        <Inline>{String.raw`import`}</Inline> statements by which each module
        describes what it needs from other modules. For example, a TypeScript
        file in our demo starts like this:
      </p>
      <TypeScript>
        {String.raw`import {Array2D} from "Imports/Core/Arrays";
import {RectRenderingContext, Renderer} from "Interfaces";
import {checkDefinedAndNotNull, checkInt} from "Imports/Core/TypeChecks";

export function create(context: RectRenderingContext, pointSize: number): Renderer {
 return new RectRenderer(context, pointSize);
}

class RectRenderer<T> { // more code follows`}
      </TypeScript>
      <p>
        Here we import various <em>members</em> (“Array2D”,
        “RectRenderingContext” and so on) from other modules called
        “Imports/Core/Arrays”, “Interfaces”, and “Imports/Core/TypeChecks”.
        These modules are just other files. Our application’s HTML page needs no
        script tags for these! (By the way, our module also <em>exports</em> a
        member, which therefore can be imported by other files. By contrast, the
        class “RectRenderer” in our module is <em>not</em> visible from other
        modules, since it lacks the <Inline>{String.raw`export`}</Inline>{" "}
        keyword.)
      </p>
      <h4>Module systems for JavaScript</h4>
      <p>
        Before the ECMAScript 6, which arrived (mostly) in 2015, JavaScript had
        no module syntax, that is, no syntax for imports and exports.
      </p>
      <p>
        Besides a module syntax, a JavaScript module system also needs a{" "}
        <em>module loader</em> to ensure that the imported modules are loaded at
        runtime. JavaScript still has no own module loader.
      </p>
      <p>
        There are two main standards for JavaScript module systems. Both are
        from third parties, and both provide a module syntax <em>and</em> a
        default module loader: (1) <em>CommonJS</em>, whose default module
        loader comes with “Node.js”, and (2){" "}
        <em>Asynchronous Module Definition</em> (AMD), whose default module
        loader is “RequireJS”.
      </p>
      <p>
        The ECMAScript 6 module syntax is great news: we can now choose that
        neutral module syntax, and (ideally) swap module loaders underneath. But
        there is still a catch: at the time of writing, the browsers still do
        not support the new module syntax. So authors of ECMAScript 6 still need
        a transpiler that translates the new syntax into, say, CommonJS or AMD.
        (As we shall see, TypeScript is such a transpiler.)
      </p>
      <p>For a more detailed overview of JavaScript module systems, see this</p>
      <LinkedReference target="https://2ality.com/2014/09/es6-modules-final.html">
        Post by Dr. Axel Rauschmayer
      </LinkedReference>
      <h4>Module systems for TypeScript </h4>
      <p>
        The module situation for TypeScript is like that for JavaScript: we need
        a module syntax, and a module loader. TypeScript has its own history
        concerning module syntax; but crucially, it adopted the ECMAScript 6
        module syntax starting with TypeScript 1.5! So every TypeScript project
        should use ECMAScript 6 modules now. (As our demo does.)
      </p>
      <p>
        The module <em>loaders</em> for TypeScript are the same ones as for
        JavaScript, since TypeScript is compiled to JavaScript before the code
        is run.
      </p>
      <p>
        Here TypeScript adds another great benefit besides types: it can
        translate ECMAScript 6 module syntax, which is no yet supported by
        browsers, into old-style module syntax. Specifically, the TypeScript
        transpiler <DosInline>tsc</DosInline> has a command-line option for the
        targeted module system. For example,{" "}
        <DosInline>tsc --module amd</DosInline> produces AMD module code.
        Besides <DosInline>amd</DosInline> the choices include:{" "}
        <DosInline>commonjs</DosInline>, <DosInline>system</DosInline>, and{" "}
        <DosInline>umd</DosInline>. (The list has been growing with new
        TypeScript versions.) Our demo specifies all <DosInline>tsc</DosInline>{" "}
        command-line options in the “tsconfig.json” file, which is a standard
        mechanism.
      </p>
      <p>
        Besides the ECMAScript 6 module syntax, TypeScript also has a notion of
        “namespaces” for optional use. Unlike TypeScript’s modules, its
        namespaces do not correspond one-to-one with files: there can be
        different namespaces within <em>one</em> file, and namespaces that
        stretch across several files. Our demo does not use namespaces.
      </p>
      <h4>Using JavaScript libraries from TypeScript</h4>
      <p>
        There are many great libraries written in JavaScript. How do we use them
        from TypeScript? Luckily, there is a mechanism analog to the way C
        programs can be compiled against native libraries by using header files:
        for a JavaScript module, one can create a so-called{" "}
        <em>ambient declaration</em>. This is a TypeScript file that represents
        the public elements of the JavaScript module, without the
        implementation. Typically, the file ending is “.d.ts".
      </p>
      <p>
        Our demo project is well suited for demonstrating this, since it has
        both a <Inline>{String.raw`Core`}</Inline> library, which contains
        basics like <Inline>{String.raw`Array2D<T>`}</Inline>, and the actual{" "}
        <Inline>{String.raw`GameOfLife`}</Inline> application. Building the
        latter does not imply building the former. Instead,{" "}
        <Inline>{String.raw`GameOfLife`}</Inline> imports the JavaScript
        “binaries” yielded by <Inline>{String.raw`Core`}</Inline>, together with
        their ambient declarations. For example,{" "}
        <Inline>{String.raw`Core`}</Inline> has the aforementioned class{" "}
        <Inline>{String.raw`Array2D<T>`}</Inline>, in a TypeScript
        implementation file named “Arrays.ts“. Building{" "}
        <Inline>{String.raw`Core`}</Inline> yields a JavaScript file
        “Arrays.js“. Since our build of <Inline>{String.raw`Core`}</Inline> uses
        a command-line switch <DosInline>{String.raw`--declaration`}</DosInline>
        , it also emits an ambient declaration file “Arrays.d.ts“:
      </p>
      <TypeScript>
        {String.raw`export declare class Array2D {
    height: number;
    width: number;
    constructor(height: number, width: number, initialValue: T);
    set(row: number, column: number, value: T): void;
    get(row: number, column: number): T;
}`}
      </TypeScript>
      <p>
        When the build for <Inline>{String.raw`GameOfLife`}</Inline> encounters
        an <Inline>{String.raw`import`}</Inline> like this
      </p>
      <TypeScript>
        {String.raw`import {Array2D} from "./Imports/Core/Arrays";`}
      </TypeScript>
      <p>
        it will be satisfied with “Arrays.d.ts” instead of “Arrays.ts“. However,
        we must ensure that the file “Arrays.js” is found during{" "}
        <em>run time</em>.
      </p>
      <p>
        TypeScript’s ambient declaration syntax goes way beyond our{" "}
        <Inline>{String.raw`Array2D`}</Inline> example. For more, see
      </p>
      <LinkedReference target="https://www.typescriptlang.org/">
        typescriptlang.org
      </LinkedReference>
      <p>
        Crucially, there is a repository containing TypeScript ambient
        declarations for a great number of libraries. That repository is called
      </p>
      <LinkedReference target="http://definitelytyped.org/">
        DefinitelyTyped
      </LinkedReference>
      <h2 id="test-driven-design">Test-driven design with TypeScript</h2>
      <p>
        Test-driven design involves writing tests for code units, module by
        module, class by class, and function by function. Each test, when run,
        can succeed or fail. The tests should cover as much functionality as
        possible. If tests fail, the software cannot be released.
      </p>
      <h3>Overview of test frameworks</h3>
      <p>
        Many programming languages have third-party <em>test frameworks</em>,
        that is, libraries with primitives for writing unit tests. Such
        primitives are mostly <em>assertions</em>, for example for checking that
        two values are equal. In contrast to a mere <em>assertion library</em>,
        a <em>test framework</em> has also ways to mark a class or a function as
        a test.
      </p>
      <p>
        A well known Java test framework is <em>JUnit</em>. For{" "}
        <em>Microsoft’s .Net framework</em>, there is for example the Microsoft
        Unit Test Framework, or the third-party framework <em>NUnit</em>.
      </p>
      <p>
        JavaScript too has unit test frameworks, among them <em>Jasmine</em>,{" "}
        <em>QUnit</em>, and <em>Mocha</em>. There is also the assertion library{" "}
        <em>Chai</em>.
      </p>
      <p>
        Jasmine, QUnit, Mocha, and Chai are also available in TypeScript,
        because they are covered by the aforementioned DefinitelyTyped
        repository! We see here how elegantly TypeScript continues to use
        JavaScript technology.
      </p>
      <h3>An example unit test file</h3>
      <p>
        Our demo happens to use the QUnit test framework, since QUnit has a wide
        adoption and I like its style. I shall now discuss an example of unit
        tests, namely the file “Sequences_ArraySeq_test.ts” from our demo. Don’t
        read the file just yet, since it’s best to start the discussion in the
        middle.
      </p>
      <TypeScript>
        {String.raw`import {createArraySeq, Seq} from "Sequences";
import {assertDefinedAndNotNull} from "TypeAssertions";

var seq: Seq<number>; // "var" because otherwise R# makes a type inference error

let functionName: string;
let name = (testCaseName: string) => "ArraySeq, " + functionName + ": " + testCaseName;

QUnit.testStart(() => {
    seq = createArraySeq([0, 1, 2, 3]);
});


functionName = "constructor";

test(name("Argument is defined"), () => {
    assertDefinedAndNotNull("seq", createArraySeq)();
});


functionName = "filter";

test(name("Argument is defined"), () => {
    assertDefinedAndNotNull("condition", seq.filter)();
});

test(name("function works"), () => {
    const result = seq.filter(n => [1, 3].indexOf(n) >= 0).toArray();

    deepEqual(result, [1, 3]);
});
// ... more test here`}
      </TypeScript>
      <p>
        Our test file uses three kinds of elements from QUnit. First, the
        function <Inline>{String.raw`test`}</Inline> that declares a single
        test. Second, the function <Inline>{String.raw`deepEquals`}</Inline> for
        comparing two values including nested properties. Third, the function{" "}
        <Inline>{String.raw`testStart`}</Inline>, for declaring code that runs
        before each test. QUnit has several other features not used in our test
        file, but our file contains enough QUnit to convey the spirit of that
        framework.
      </p>
      <p>
        The <Inline>{String.raw`test`}</Inline> function of QUnit takes two
        arguments: the name of the test, and the body of the test, whose
        execution is delayed by an anonymous function. The{" "}
        <Inline>{String.raw`name`}</Inline> function is provided by me for
        convenience, to help us group our tests: first the name of the tested
        class, then the name of the tested function, and finally the test case.
      </p>
      <p>The most straightforward test is probably this one:</p>
      <TypeScript>
        {String.raw`test(name("function works"), () => {
    const result = seq.filter(n => [1, 3].indexOf(n) >= 0).toArray();

    deepEqual(result, [1, 3]);
});`}
      </TypeScript>
      <p>
        We are testing the <Inline>{String.raw`filter`}</Inline> function of our{" "}
        <Inline>{String.raw`ArraySeq`}</Inline> class here. Our{" "}
        <Inline>{String.raw`ArraySeq`}</Inline> was created with the values 0,
        1, 2, 3 in the <Inline>{String.raw`testStart`}</Inline> function. We
        apply our <Inline>{String.raw`filter`}</Inline> function with a
        predicate that yields true only for 1 and 3. Finally we check that the
        result of the filtering, when turned into an array, is equal to{" "}
        <Inline>{String.raw`[1, 3]`}</Inline>.
      </p>
      <p>Then there are tests like this:</p>
      <TypeScript>
        {String.raw`test(name("Argument is defined"), () => {
    assertDefinedAndNotNull("condition", seq.filter)();
});`}
      </TypeScript>
      <p>
        This tests checks that our <Inline>{String.raw`filter`}</Inline>{" "}
        function throws an <Inline>{String.raw`ArgumentException`}</Inline> on
        an argument which is <Inline>{String.raw`null`}</Inline> or{" "}
        <Inline>{String.raw`undefined`}</Inline>. Similar checks also occur in
        Java or C# unit tests, but only for <Inline>{String.raw`null`}</Inline>,
        since Java and C# have no <Inline>{String.raw`undefined`}</Inline>. Our{" "}
        <Inline>{String.raw`ArgumentException`}</Inline> here is a class defined
        in the module <Inline>{String.raw`Exceptions`}</Inline> of our{" "}
        <Inline>{String.raw`Core`}</Inline> project.
      </p>
      <p>
        Since many unit tests check how a testee reacts to bad arguments, I
        provided an assertion library,{" "}
        <Inline>{String.raw`TypeAssertions`}</Inline>, which contains the above{" "}
        <Inline>{String.raw`assertDefinedAndNotNull`}</Inline> and some other
        assertions.
      </p>
      <p>
        There is also a production-code library{" "}
        <Inline>{String.raw`TypeChecks`}</Inline> that complements{" "}
        <Inline>{String.raw`TypeAssertions`}</Inline>. For example,{" "}
        <Inline>{String.raw`TypeChecks`}</Inline> contains a function
      </p>
      <TypeScript>
        {String.raw`checkDefinedAndNotNull(argumentName: string, value: any)`}
      </TypeScript>
      <p>
        That function, when put in the first line of another function{" "}
        <Inline>{String.raw`f`}</Inline>, will throw an{" "}
        <Inline>{String.raw`ArgumentException`}</Inline> for{" "}
        <Inline>{String.raw`argumentName`}</Inline> if{" "}
        <Inline>{String.raw`value`}</Inline> is{" "}
        <Inline>{String.raw`null`}</Inline> or{" "}
        <Inline>{String.raw`undefined`}</Inline>.
      </p>
      <h3>Unit tests for gaps in the type system</h3>
      <p>
        Types that admit null values are problematic. The first person to admit
        this is inventor of null references, the famous computer scientist
      </p>
      <LinkedReference target="https://en.wikipedia.org/wiki/Tony_Hoare">
        Tony Hoare
      </LinkedReference>
      <p>
        Speaking at a conference in 2009, he apologized for inventing the null
        reference.
      </p>
      <LinkedReference target="https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/">
        Video of Tony Hoare speaking about null references
      </LinkedReference>
      <BlockQuote>
        I call it my billion-dollar mistake. It was the invention of the null
        reference in 1965. At that time, I was designing the first comprehensive
        type system for references in an object oriented language (ALGOL W). My
        goal was to ensure that all use of references should be absolutely safe,
        with checking performed automatically by the compiler. But I couldn’t
        resist the temptation to put in a null reference, simply because it was
        so easy to implement. This has led to innumerable errors,
        vulnerabilities, and system crashes, which have probably caused a
        billion dollars of pain and damage in the last forty years.
      </BlockQuote>
      <p>
        JavaScript makes things worse by allowing{" "}
        <Inline>{String.raw`undefined`}</Inline> besides{" "}
        <Inline>{String.raw`null`}</Inline>. Sadly, this carries over to
        TypeScript, which has a static type{" "}
        <Inline>{String.raw`undefined`}</Inline>.
      </p>
      <p>
        Worse, JavaScript and TypeScript have no integer type, only{" "}
        <Inline>{String.raw`number`}</Inline>. Not only can a value of type{" "}
        <Inline>{String.raw`number`}</Inline> be an non-integer number; it can
        also be <Inline>{String.raw`null`}</Inline>,{" "}
        <Inline>{String.raw`undefined`}</Inline>,{" "}
        <Inline>{String.raw`Infinity`}</Inline>,{" "}
        <Inline>{String.raw`-Infinity`}</Inline>, or{" "}
        <Inline>{String.raw`NaN`}</Inline>.
      </p>
      <p>
        Now imagine we have a TypeScript project, and we want to ensure the same
        code quality as in Java, for example. Whenever a TypeScript function is
        meant for an integer argument, the type system can only ensure the
        argument is a <Inline>{String.raw`number`}</Inline>. So we are forced to
        add run-time checks that the argument is integer! (Our demo has such
        checks, using the <Inline>{String.raw`checkInt`}</Inline> method from
        our <Inline>{String.raw`TypeChecks`}</Inline> module.) Worse, for each
        argument intended to be integer, we need an extra unit test to check
        that an exception is thrown for a non-integer! (Our demo has such tests,
        using the <Inline>{String.raw`assertInt`}</Inline> method from our{" "}
        <Inline>{String.raw`TypeAssertions`}</Inline> module.)
      </p>
      <p>
        So we see, in quantitative way, how gaps in a type system force us into
        more coding. And the type system of TypeScript <em>has</em> gaps.
      </p>
      <p>
        Still, having static types at all is very helpful, since without them we
        would need even more run-time checks and unit tests! And we can address
        the remaining gaps with libraries containing run-time checks, plus
        libraries containing test assertions.
      </p>
      <h2 id="build-process">Our build process</h2>
      <h3>“Serious” build tools: not used here</h3>
      <p>
        A build process turns source code into deployable code, and runs quality
        checks. Build tools abound, and vary strongly between platforms. One
        example is the <DosInline>{String.raw`make`}</DosInline> command from
        the Unix world. Another is Microsoft’s MSBuild. The JavaScript world has
        several alternative build tools. I tried Gulp and Grunt In our case
        these must call special-purpose tools, like the TypeScript transpiler{" "}
        <DosInline>{String.raw`tsc`}</DosInline> or the test runner Karma. This
        happens via plugins, for example{" "}
        <DosInline>{String.raw`grunt-typescript`}</DosInline> and{" "}
        <DosInline>{String.raw`grunt-karma`}</DosInline>. Typically,{" "}
        <em>all</em> components (e.g. Grunt,{" "}
        <DosInline>{String.raw`tsc`}</DosInline>,{" "}
        <DosInline>{String.raw`grunt-typescript`}</DosInline>, Karma, and{" "}
        <DosInline>{String.raw`grunt-karma`}</DosInline>, and many more) are
        taken from the standard repository <em>npm</em> of “Node.js”! (More
        about npm later.) And all components are versioned! I found that this
        leads to a jungle of versioned dependencies which is unpleasant to
        maintain and upgrade. Plus, most plugins require an own configuration
        section in the build tool’s configuration file (e.g. the file
        “grunt.config”), which becomes bloated quickly. When faced with this, I
        found blog post by Keith Cirkel(?) that focussed on this issue, but that
        post is no longer available now. Following that post, I migrated to a
        much simpler build process, which I shall now describe.
      </p>
      <h3>“Node.js” as a build platform</h3>
      <p>
        “Node.js” is established as a server-side environment for JavaScript. It
        has its own package manager, <em>npm (Node Package Manager)</em>, which
        points to the standard NPM repository. All tools we need reside in the
        NPM repository: the TypeScript transpiler{" "}
        <DosInline>{String.raw`tsc`}</DosInline>, our test runner Karma, the
        linter ESLint, the module loader RequireJS, the unit test framework
        QUnit, and more.
      </p>
      <p>
        “Node.js” can be (easily) installed on various operating systems,
        including Windows, Mac OS, and Linux. So with “Node.js” we can define a
        build process that does not depend on the underlying operating system!
      </p>
      <p>
        Our projects “Core” and “GameOfLife” each have a file “package.json”
        that lists all tools needed for that project.
      </p>
      <h3>The “package.json” file</h3>
      <p>Here is the “package.json” of our Core project:</p>
      <Json>
        {String.raw`{
  "name": "Core",
  "version": "0.0.0",
  "description": "All dependencies of the Core project ",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {
    "eslint": "2.9.0",
    "karma": "0.13.22",
    "karma-chrome-launcher": "0.2.0",
    "karma-firefox-launcher": "0.1.6",
    "karma-ie-launcher": "0.2.0",
    "karma-junit-reporter": "0.3.3",
    "karma-phantomjs-launcher-nonet": "0.1.3",
    "karma-qunit": "0.1.5",
    "karma-requirejs": "0.2.2",
    "qunitjs": "1.18.0",
    "requirejs": "2.1.19",
    "tslint": "3.8.0",
    "typescript": "1.8.10"
  },
  "scripts": {
    "build": "eslint *.js && tslint *.ts && tsc && karma start",
    "quickBuild": "tslint *.ts && tsc && karma start"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/cfuehrmann/GameOfLife.git"
  },
  "keywords": [
    "key1",
    "key2"
  ],
  "author": "Carsten Führmann",
  "license": "LicenseToDo",
  "bugs": {
    "url": "https://github.com/cfuehrmann/GameOfLife/issues"
  },
  "homepage": "https://github.com/cfuehrmann/GameOfLife"
}`}
      </Json>
      <p>
        (The “package.json” of “GameOfLife” is almost the same. The reason why I
        have two “package.json” files, instead of one for both projects, is: I
        intend to split the projects in two GitHub repositories, since “Core” is
        to be used by other projects besides “GameOfLife”.)
      </p>
      <p>
        Let’s discuss our “package.json” file. The{" "}
        <DosInline>{String.raw`devDependencies`}</DosInline> section lists the
        tools we need. Most importantly,
      </p>
      <ul>
        <li>
          <DosInline>{String.raw`typescript`}</DosInline>, the TypeScript
          transpiler
        </li>
        <li>
          <DosInline>{String.raw`karma`}</DosInline>, our test runner
        </li>
        <li>
          <DosInline>{String.raw`tslint`}</DosInline>, a TypeScript linter
        </li>
      </ul>
      <p>
        There are some other packages, among them plugins that enable Karma to
        use other packages:{" "}
        <DosInline>{String.raw`karma-chrome-launcher`}</DosInline>,{" "}
        <DosInline>{String.raw`karma-qunit`}</DosInline>, and so on.
      </p>
      <p>
        The meaning of the <DosInline>scripts</DosInline> section will become
        clear soon.
      </p>
      <h3>Versioned installation of all tools with a single command!</h3>
      <p>
        Here is a great benefit of having all tools run under “Node.js”: when we
        run
      </p>
      <Dos>npm install</Dos>
      <p>
        from the command prompt, <em>from inside the Core directory</em>, all
        packages described in “package.json” are automatically installed from
        the npm repository on the web! (That might take a minute or two.) The
        packages are put in a subdirectory “node_modules” of the Core project.
        Similarly for the GameOfLife project.
      </p>
      <p>
        Because our “package.json” file contains the package versions, it
        defines our tools completely and precisely!
      </p>
      <p>Take a minute to ponder the elegance of this “Node.js” setup:</p>
      <ol>
        <li>
          Every programmer on Windows, Linux, and Mac OS can pull our project
          from GitHub and build it.
        </li>
        <li>The only prerequisite is “Node.js” and npm.</li>
        <li>
          All build tools, in the correct version, can be installed with a
          single command.
        </li>
        <li>
          But the build tools don’t clog our GitHub repository – they come
          directly from the NPM repository.
        </li>
      </ol>
      <h3>Local vs. global installation of npm packages</h3>
      <p>
        The <DosInline>{String.raw`npm install`}</DosInline> command described
        above, when run from e.g. the Core directory, installs the packages{" "}
        <em>locally</em> in that directory. This implies for example that we can{" "}
        <em>not</em> open a command prompt and run the TypeScript transpiler by
        entering <DosInline>{String.raw`tsc`}</DosInline> , even though we
        installed that npm package. We <em>could</em> run{" "}
        <DosInline>tsc</DosInline> in this simple way if we had installed{" "}
        <DosInline>{String.raw`tsc`}</DosInline> <em>globally</em>, which is
        also possible with npm.
      </p>
      <p>
        Indeed, many JavaScript projects require globally installed tools. I
        decided against that. Thus, I view the tools as an integral part of the
        project. This has a advantages: (1) Different projects on a developer’s
        machine can use different versions of the same tool. (2) Even if the
        developer has only one project on their machine, our setup rules out
        that the wrong version of a tool is used.
      </p>
      <p>
        Now we are ready for an explanation of the{" "}
        <DosInline>{String.raw`scripts`}</DosInline> section in our
        “package.json” file. We have seen that we can’t simply run our tools
        from the command line; but <DosInline>{String.raw`npm`}</DosInline>{" "}
        knows how to do that! For example, the command{" "}
        <DosInline>{String.raw`tsc`}</DosInline> is unknown at the command
        prompt, but it can still be run by{" "}
        <DosInline>{String.raw`npm tsc`}</DosInline> entered from the Core
        directory. Then <DosInline>{String.raw`npm`}</DosInline> runs the{" "}
        <DosInline>{String.raw`tsc`}</DosInline> version{" "}
        <em>installed in the local directory</em>. The elements in the scripts
        section of the “package.json” file are aliases for commands to be run
        via <DosInline>{String.raw`npm`}</DosInline>. For example,
      </p>
      <Dos>{String.raw`npm run build`}</Dos>
      <p>translates into</p>{" "}
      <Dos>{String.raw`eslint *.js && tslint *.ts && tsc && karma start`}</Dos>
      <p>
        using the <em>local</em> <DosInline>{String.raw`eslint`}</DosInline>,
        <DosInline>{String.raw`tslint`}</DosInline>,{" "}
        <DosInline>{String.raw`tsc`}</DosInline>, and{" "}
        <DosInline>{String.raw`karma`}</DosInline>.
      </p>
      <h3>The definition of our build</h3>
      <p>
        As we have just seen, our build just consists of four steps separated by
        a <DosInline>{String.raw`&&`}</DosInline> operator:
      </p>
      <Dos>{String.raw`eslint *.js && tslint *.ts && tsc && karma start`}</Dos>
      <p>
        Luckily, the <DosInline>{String.raw`&&`}</DosInline> operator exists on
        Windows <em>and</em> Linux. An expression{" "}
        <DosInline>{String.raw`command1 && command2`}</DosInline> means: execute
        command1 first, and only if that succeeds, execute{" "}
        <DosInline>{String.raw`command2`}</DosInline> .
      </p>
      <p>
        So our build first runs the JavaScript linter{" "}
        <DosInline>{String.raw`eslint`}</DosInline> on our JavaScript (not
        TypeScript!) files. Currently, our only JavaScript files are certain
        configuration files for Karma. It’s still good to check those, and in
        the future we may need more JavaScript files even though our project
        consists essentially of TypeScript.
      </p>
      <p>
        If <DosInline>{String.raw`eslint`}</DosInline> succeeds, the TypeScript
        linter <DosInline>{String.raw`tslint`}</DosInline> is run on our
        TypeScript files.
      </p>
      <p>
        If <DosInline>{String.raw`tslint`}</DosInline> succeeds, the TypeScript
        transpiler <DosInline>{String.raw`tsc`}</DosInline> is run. The
        parameters of <DosInline>{String.raw`tsc`}</DosInline>, including its
        input files, are given in an extra file, “tsconfig.json”.
      </p>
      <p>
        It <DosInline>{String.raw`tsc`}</DosInline> succeeds, the test runner{" "}
        <DosInline>{String.raw`karma`}</DosInline> is run. It is configured by
        the file “karma.conf.js”.
      </p>
      <p>
        Admittedly, our build is not incremental, and incapable of parallelism.
        A build tool like Grunt would enable such missing features. But, as
        discussed above, at the cost of many extra dependencies and way more
        configuration. In practice, our minimalistic build works as well as we
        could wish.
      </p>
      <h3>The BuildOutput directories</h3>
      <p>
        This is a detail that needs mentioning: our Core project and our
        GameOfLife project each have their own BuildOutput directory.
      </p>
      <p>The BuildOutput directory of Core contains:</p>
      <ol>
        <li>All JavaScript files that result from transpiling Core.</li>
        <li>
          All ambient declaration files that result from transpiling Core. (As
          explained in the modules section, these are needed so that other
          TypeScript code can use Core.)
        </li>
      </ol>
      <p>The BuildOutput directory of GameOfLife contains:</p>
      <ol>
        <li>All JavaScript files that result from transpiling GameOfLife.</li>
        <li>The JavaScript files imported from Core.</li>
        <li>
          The JavaScript files imported from third parties, here just
          “require.js”.
        </li>
        <li>Our HTML files and CSS files</li>
      </ol>
      <p>
        The key feature of the BuildOutput directory of GameOfLife is that it
        can be used straight away for hosting. For example, the
      </p>
      <LinkedReference target="../game-of-life/index.html">
        Hosted GameOfLife application
      </LinkedReference>
      <p>
        (For technical reasons, both BuildOutput directories also contain the
        JavaScript files that result from transpiling our unit tests. I am
        considering to change that.)
      </p>
      <h2>Open issues</h2>
      <p>
        Unit test frequently use <em>mocking</em>: the creation of replacement
        objects during a unit test, to check how they are used by the production
        code. For Java and .Net, for example, there are third-party mocking
        frameworks. Our GameOfLife demo didn’t compel me to use mocking, but
        mocking in TypeScript should be straightforward: for example, there is
        the mocking library typemoq. One should try this. (It is available via
        npm, like all our tools.)
      </p>
      <p>
        Here is another gap in our investigation: as mentioned in the modules
        sections, frameworks and libraries must be usable from TypeScript, via
        ambient declarations. Our demo uses QUnit in this way. But there are
      </p>
      <LinkedReference target="https://en.wikipedia.org/wiki/Comparison_of_JavaScript_frameworks">
        many frameworks usabe from Typescript
      </LinkedReference>
      <p>
        In particular, there are frameworks for graphical user interfaces, that
        one may want to use from TypeScript. I have tried no such framework so
        far. This should usually work, since DefinitelyTyped has ambient
        declarations for many such frameworks. Still, when starting a TypeScript
        project, one should check if the frameworks one plans to use have
        well-maintained ambient declarations.
      </p>
    </BlogPost>
  );

  const staticHtml = reactDomServer.renderToStaticMarkup(inner);
  const { title, description } = meta;
  return { props: { staticHtml, title, description } };
};
