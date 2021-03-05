export const Reference = ({ children }: { children: React.ReactNode }) => (
  <p>{children}</p>
);

export const LinkedReference = ({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) => (
  <a
    href={target}
    rel="noopener noreferrer"
    target="_blank"
    style={{ textDecoration: "none" }}
  >
    <div className="w3-card w3-text-black">
      <p className="w3-padding-large">{children}</p>
    </div>
  </a>
);
