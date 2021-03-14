import hljs from "highlight.js";

export default function Code(props: { children: string }) {
  const { children } = props;

  return (
    <pre style={{ backgroundColor: "white" }}>
      <code
        style={{ backgroundColor: "white" }}
        dangerouslySetInnerHTML={{
          __html: hljs.highlight("csharp", children).value,
        }}
      />
    </pre>
  );
}
