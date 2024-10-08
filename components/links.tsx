import styles from "./misc.module.css";

export const Reference = ({ children }: { children: React.ReactNode }) => (
  <p>{children}</p>
);

export function LinkedReference({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) {
  return (
    <Link target={target}>
      <div className="w3-card w3-text-black">
        <p className="w3-padding-large">{children}</p>
      </div>
    </Link>
  );
}

export function InternalReference({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) {
  return (
    <InternalLink target={target}>
      <div className="w3-card w3-text-black">
        <p className="w3-padding-large">{children}</p>
      </div>
    </InternalLink>
  );
}

export function Link({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) {
  return (
    <a href={target} className={styles["no-text-decoration"]}>
      {children}
    </a>
  );
}

export function InternalLink({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) {
  return (
    <a href={target} className={styles["no-text-decoration"]}>
      {children}
    </a>
  );
}
