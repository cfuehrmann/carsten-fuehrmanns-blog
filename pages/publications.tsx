import unified from "unified";
import parse from "remark-parse";
import remark2rehype from "remark-rehype";
import stringify from "rehype-stringify";

import Layout from "../components/layout";

export default function Publications() {
  return (
    <Layout page="publications">
      <article>
        <h1>Publications by Carsten Führmann</h1>
        <div className="markdown-body">
          <p>In reverse chronological order:</p>
          <BibItem
            authors="Carsten Führmann and David Pym"
            title="On categorical models of classical logic and the Geometry of
                Interaction"
            target="geometry-of-interaction-mscs"
          >
            _Mathematical Structures in Computer Science_, 17(5):957-1027,
            October 2007
          </BibItem>
          <BibItem
            authors="Carsten Führmann and David Pym"
            title="Order-enriched categorical models of the classical sequent calculus"
            target="order-enriched-models-for-classical-sequent-calculus"
          >
            _J. Pure Applied Algebra_, 204(1):21-78, January 2006
          </BibItem>
          <BibItem
            authors="Carsten Führmann and David Pym"
            title="On the Geometry of Interaction for Classical Logic"
            target="geometry-of-interaction-lics"
          >
            In _Proceedings of the Nineteenth Annual IEEE Symposium on Logic in
            Computer Science (LICS 2004)_, pages 211-220, Turku (Finland), 2004
          </BibItem>
          <BibItem
            authors="Carsten Führmann and Hayo Thielecke"
            title="On the call-by-value CPS transform and its semantics"
            target="call-by-value-continuations"
          >
            _Information and Computation_, 188(2):241-283, 2004
          </BibItem>
          <BibItem
            authors="Anna Bucalo, Carsten Führmann, and Alex Simpson"
            title="An equational notion of lifting monad"
            target="lifting-monads-tcs"
          >
            _Theoretical Computer Science_, 294:31-60, 2003
          </BibItem>
          <BibItem
            authors="Carsten Führmann"
            title="Varieties of effects"
            target="varieties-of-effects"
          >
            In _Proceedings of the 5th International Conference on Foundations
            of Software Science and Computation Structures (FOSSACS 2002)_,
            volume 2303 of _LNCS_, pages 144-158, Grenoble, 2002.
            Springer-Verlag
          </BibItem>
          <BibItem
            authors="Carsten Führmann"
            title="The structure of call-by-value"
            target="structure-of-call-by-value-thesis"
          >
            PhD thesis, Division of Informatics, University of Edinburgh, 2000
          </BibItem>
          <BibItem
            authors="Anna Bucalo, Carsten Führmann, and Alex Simpson"
            title="Equational lifting monads"
            target="lifting-monads-ctcs"
          >
            In _Proceedings of the 8th annual conference on Category Theory and
            Computer Science (CTCS’99)_, Electronic Notes in Theoretical
            Computer Science, pages 207-260, Edinburgh, 1999. Elsevier
          </BibItem>
          <BibItem
            authors="Carsten Führmann"
            title="Direct models of the computational lambda-calculus"
            target="direct-models-of-computational-lambda"
          >
            In _Proceedings of the 15th Conference on Mathematical Foundations
            of Programming Semantics (MFPS XV)_, volume 20 of _Electronic Notes
            in Theoretical Computer Science_, pages 147-172, New Orleans, 1999.
            Elsevier
          </BibItem>
        </div>
      </article>
    </Layout>
  );
}

function BibItem(props: {
  children: string;
  authors: string;
  target: string;
  title: string;
}) {
  const { children, authors, target, title } = props;

  const processedContent = unified()
    .use(parse)
    .use(remark2rehype)
    .use(stringify)
    .processSync(`${children}.`)
    .toString();

  return (
    <>
      <div className="w3-card-4">
        <header className="w3-container">
          <p className="w3-margin-top">
            <b>{title}</b>
          </p>
        </header>
        <div className="w3-container">
          <p>{authors}</p>
        </div>
        <div
          className="w3-container w3-margin-bottom"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
        <a
          className="w3-button w3-block w3-light-grey w3-hover-indigo"
          href={`papers/${target}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          PDF
        </a>
      </div>
      <br />
    </>
  );
}
