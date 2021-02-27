export const Reference = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <div className="w3-card w3-round-large">
      <p className="w3-padding-large">{children}</p>
    </div>
  );
};

export const LinkedReference = (props: {
  children: React.ReactNode;
  target: string;
}) => {
  const { children, target } = props;
  return (
    <a href={target} rel="noopener noreferrer">
      <div className="w3-card w3-round-large w3-light-grey">
        <p className="w3-padding-large">{children}</p>
      </div>
    </a>
  );
};
