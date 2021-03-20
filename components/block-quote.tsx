export default function BlockQuote({
  children,
}: {
  children: React.ReactNode;
}) {
  return <blockquote className="w3-panel w3-leftbar">{children}</blockquote>;
}
