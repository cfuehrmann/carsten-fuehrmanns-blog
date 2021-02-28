export const Reference = ({ children }: { children: React.ReactNode }) => (
  <div className="w3-card w3-round-large">
    <p className="w3-padding-large">{children}</p>
  </div>
);

export const LinkedReference = ({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) => (
  <a href={target} rel="noopener noreferrer" target="_blank">
    <div className="w3-card w3-round-large w3-light-grey">
      <p className="w3-padding-large">{children}</p>
    </div>
  </a>
);
