import Date from "./date";

export default function BlogPost(props: {
  children: React.ReactNode;
  title: string;
  date: string;
}) {
  const { children, title, date } = props;
  return (
    <>
      <h1>{title}</h1>
      <p>
        <small className="w3-text-grey">
          <Date dateString={date} />
        </small>
      </p>
      {children}
    </>
  );
}
