import Layout from "../components/layout";

export default function Lectures() {
  return (
    <Layout page="lectures">
      <h1>Lectures</h1>

      <p>
        I gave the two courses below at the Department of Computer Science of
        the University of Bath in Semester 2 of 2004.
      </p>

      <p>Click on any lecture for a PDF.</p>

      <h2>CM10020: Computability and decidability</h2>

      <Handout
        title="1. Introduction, Sets & Enumerability"
        target="computability-01"
      />

      <Handout
        title="2. Enumerability & diagonalization"
        target="computability-02"
      />

      <Handout title="3. Automata" target="computability-03" />

      <Handout
        title="4. Non-deterministic finite automata"
        target="computability-04"
      />

      <Handout title="5. NFAs & regular languages " target="computability-05" />

      <Handout
        title="6. Regular languages continued & Formal grammars"
        target="computability-06"
      />

      <Handout title="7. Context-free grammars" target="computability-07" />

      <Handout
        title="8. Limits of computability & Turing Machines"
        target="computability-08"
      />

      <Handout
        title="9. Uncomputability (for Turing machines)"
        target="computability-09"
      />

      <Handout
        title="9a. Proofs that the diagonal function, the self-halting function, and the halting function are not Turing-computable"
        target="computability-09a"
      />

      <Handout title="10. Abacus machines" target="computability-10" />

      <Handout
        title="11. Recursive functions – Part 1: primitive recursion"
        target="computability-11"
      />

      <Handout
        title="12. Recursive functions – Part 2: primitive recursion (second part) & minimization"
        target="computability-12"
      />

      <Handout
        title="13. Recursive relations – Part 1"
        target="computability-13"
      />

      <Handout
        title="14. Recursive relations – Part 2"
        target="computability-14"
      />

      <Handout title="15. Closing the circle" target="computability-15" />

      <Handout
        title="16. Universal Turing Machine, semi-recursive relations"
        target="computability-16"
      />

      <Handout title="17. Revision" target="computability-17" />

      <Handout title="18. Revision Part 2" target="computability-18" />

      <h2>CM30071: Logic and its applications</h2>

      <Handout title="1a. Introduction" target="logic-01a" />
      <Handout
        title="1b. Propositional logic (revision) & semantic entailment"
        target="logic-01b"
      />
      <Handout title="2. Natural deduction" target="logic-02" />
      <Handout title="3. Soundness & Completeness" target="logic-03" />
      <Handout
        title="4. Completeness & Predicate Logic"
        target="logic-04"
        isPsGz
      />
      <Handout
        title="5. Natural deduction for predicate logic"
        target="logic-05"
        isPsGz
      />
      <Handout
        title="6. Natural deduction for predicate logic"
        target="logic-06"
        isPsGz
      />
      <Handout title="7. Hoare logic" target="logic-07" isPsGz />
      <Handout title="8. Hoare logic (part 2)" target="logic-08" />
      <Handout title="9. Sequent calculus" target="logic-09" />
      <Handout
        title="10. Sequent calculus vs. natural deduction"
        target="logic-10"
      />
      <Handout
        title="11. Sequent calculus, proof search & logic programming"
        target="logic-11"
      />
      <Handout
        title="12. Sequent calculus, proof search & logic programming (addendum). Preview of modal logic"
        target="logic-12"
      />
      <Handout title="13. Modal logic" target="logic-13" />
      <Handout
        title="14. Natural deduction for modal logic"
        target="logic-14"
      />
      <Handout title="15. Intuitionistic logic (part 1)" target="logic-15" />
      <Handout title="16. Intuitionistic logic (part 2)" target="logic-16" />
      <Handout
        title="17. Lambda-calculus & Propositions-as-Types"
        target="logic-17"
      />
      <Handout title="18. Revision" target="logic-18" />
    </Layout>
  );
}

function Handout(props: { target: string; title: string; isPsGz?: true }) {
  const { target, title, isPsGz } = props;
  const extension = isPsGz ? "ps.gz" : "pdf";

  return (
    <a
      href={`/lectures/${target}.${extension}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="w3-card w3-text-black">
        <p className="w3-padding-large">{title}</p>
      </div>
    </a>
  );
}
