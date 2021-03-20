import katex from "katex";

export const K = ({ children }: { children: string }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(children),
    }}
  />
);

export const KD = ({ children }: { children: string }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(children, {
        displayMode: true,
      }),
    }}
  />
);

export const Lemma = ({ children }: { children: React.ReactNode }) => (
  <p>
    Lemma: <em>{children}</em>
  </p>
);

export const Theorem = ({ children }: { children: React.ReactNode }) => (
  <p>
    Theorem: <em>{children}</em>
  </p>
);

export const Corollary = ({ children }: { children: React.ReactNode }) => (
  <p>
    Corollary: <em>{children}</em>
  </p>
);

export const Observation = ({ children }: { children: React.ReactNode }) => (
  <p>
    Corollary: <em>{children}</em>
  </p>
);

export const Proof = ({ children }: { children: React.ReactNode }) => (
  <p>
    <em>Proof</em>: {children}
  </p>
);
