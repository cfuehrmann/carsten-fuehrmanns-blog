import Layout from "../components/layout";

export default function Publications() {
  return (
    <Layout
      title="Publications"
      description="Publications by Carsten Führmann"
      page="publications"
    >
      <h1>Publications by Carsten Führmann</h1>
      <p>In reverse chronological order:</p>
      <BibItem
        authors="Carsten Führmann and David Pym"
        title="On categorical models of classical logic and the Geometry of
                Interaction"
        target="geometry-of-interaction-mscs"
      >
        <em>Mathematical Structures in Computer Science</em>, 17(5):957-1027,
        October 2007
      </BibItem>
      <BibItem
        authors="Carsten Führmann and David Pym"
        title="Order-enriched categorical models of the classical sequent calculus"
        target="order-enriched-models-for-classical-sequent-calculus"
      >
        <em>J. Pure Applied Algebra</em>, 204(1):21-78, January 2006
      </BibItem>
      <BibItem
        authors="Carsten Führmann and David Pym"
        title="On the Geometry of Interaction for Classical Logic"
        target="geometry-of-interaction-lics"
      >
        In{" "}
        <em>
          Proceedings of the Nineteenth Annual IEEE Symposium on Logic in
          Computer Science (LICS 2004)
        </em>
        , pages 211-220, Turku (Finland), 2004
      </BibItem>
      <BibItem
        authors="Carsten Führmann and Hayo Thielecke"
        title="On the call-by-value CPS transform and its semantics"
        target="call-by-value-continuations"
      >
        <em>Information and Computation</em>, 188(2):241-283, 2004
      </BibItem>
      <BibItem
        authors="Anna Bucalo, Carsten Führmann, and Alex Simpson"
        title="An equational notion of lifting monad"
        target="lifting-monads-tcs"
      >
        <em>Theoretical Computer Science</em>, 294:31-60, 2003
      </BibItem>
      <BibItem
        authors="Carsten Führmann"
        title="Varieties of effects"
        target="varieties-of-effects"
      >
        In{" "}
        <em>
          Proceedings of the 5th International Conference on Foundations of
          Software Science and Computation Structures (FOSSACS 2002)
        </em>
        , volume 2303 of <em>LNCS</em>, pages 144-158, Grenoble, 2002.
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
        In{" "}
        <em>
          Proceedings of the 8th annual conference on Category Theory and
          Computer Science (CTCS’99)
        </em>
        , Electronic Notes in Theoretical Computer Science, pages 207-260,
        Edinburgh, 1999. Elsevier
      </BibItem>
      <BibItem
        authors="Carsten Führmann"
        title="Direct models of the computational lambda-calculus"
        target="direct-models-of-computational-lambda"
      >
        In{" "}
        <em>
          Proceedings of the 15th Conference on Mathematical Foundations of
          Programming Semantics (MFPS XV)
        </em>
        , volume 20 of <em>Electronic Notes in Theoretical Computer Science</em>
        , pages 147-172, New Orleans, 1999. Elsevier
      </BibItem>

      <h2>Unpublished notes</h2>

      <BibItem
        authors="Carsten Führmann"
        title="A pattern-matching calculus for *-autonomous categories"
        target="lambda-star-autonomous"
      >
        <em>Unpublished notes</em>
      </BibItem>
    </Layout>
  );
}

function BibItem({
  children,
  authors,
  target,
  title,
}: {
  children: React.ReactNode;
  authors: string;
  target: string;
  title: string;
}) {
  return (
    <>
      <a
        href={`/papers/${target}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div className="w3-card w3-text-black">
          <div className="w3-container">
            <h2>{title}</h2>
            <p>{authors}</p>
            <p>{children}</p>
          </div>
        </div>
        <br />
      </a>
    </>
  );
}
