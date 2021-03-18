import hljs from "highlight.js";

export function CSharp({ children }: { children: string }) {
  return <Code language="csharp">{children}</Code>;
}

export function Xml({ children }: { children: string }) {
  return <Code language="XML">{children}</Code>;
}

export function Dos({ children }: { children: string }) {
  return <Code language="DOS">{children}</Code>;
}

function Code(props: { language: string; children: string }) {
  const { language, children } = props;

  return (
    <div
      className="w3-border"
      style={{
        backgroundColor: "white",
        overflow: "scroll",
        overflowY: "hidden",
      }}
    >
      <pre className="w3-margin-left">
        <code
          style={{ backgroundColor: "white" }}
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(language, children).value,
          }}
        />
      </pre>
    </div>
  );
}
