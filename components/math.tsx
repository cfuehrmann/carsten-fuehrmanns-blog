import katex from "katex";
import { useCallback } from "react";

export const K = ({ children }: { children: string }) => (
  <span
    ref={useCallback((node) => {
      katex.render(children, node);
    }, [])}
  />
);

export const KD = ({ children }: { children: string }) => (
  <span
    ref={useCallback((node) => {
      katex.render(children, node, { displayMode: true });
    }, [])}
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
