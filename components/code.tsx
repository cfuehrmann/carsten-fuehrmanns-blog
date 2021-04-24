import hljs from "highlight.js";
import styles from "./code.module.css";

export function CSharp({ children }: { children: string }) {
  return <Code language="csharp">{children}</Code>;
}

export function CSharpInline({ children }: { children: string }) {
  return <Inline language="csharp">{children}</Inline>;
}

export function Xml({ children }: { children: string }) {
  return <Code language="XML">{children}</Code>;
}

export function Dos({ children }: { children: string }) {
  return <Code language="DOS">{children}</Code>;
}

export function DosInline({ children }: { children: string }) {
  return <Inline language="DOS">{children}</Inline>;
}

export function TypeScript({ children }: { children: string }) {
  return <Code language="typescript">{children}</Code>;
}

export function TypeScriptInline({ children }: { children: string }) {
  return <Inline language="typescript">{children}</Inline>;
}

export function JavaScript({ children }: { children: string }) {
  return <Code language="javascript">{children}</Code>;
}

export function JavaScriptInline({ children }: { children: string }) {
  return <Inline language="javascript">{children}</Inline>;
}

export function Json({ children }: { children: string }) {
  return <Code language="json">{children}</Code>;
}

function Code(props: { language: string; children: string }) {
  const { language, children } = props;

  return (
    <div className={`w3-border ${styles["code-display"]}`}>
      <pre className="w3-margin-left">
        <code
          className={styles["code"]}
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(language, children).value,
          }}
        />
      </pre>
    </div>
  );
}

function Inline(props: { language: string; children: string }) {
  const { language, children } = props;

  return (
    <code
      className={`w3-border ${styles["code"]}`}
      dangerouslySetInnerHTML={{
        __html: hljs.highlight(language, children).value,
      }}
    />
  );
}
