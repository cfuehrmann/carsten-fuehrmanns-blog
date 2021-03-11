import Date from "./date";

export default function Comment(props: {
  author: string;
  date: string;
  children: React.ReactNode;
}) {
  const { author, date, children } = props;

  return (
    <div className="w3-card">
      <div className="w3-container">
        <br />
        <p>
          {author}
          <p>
            <small>
              <Date dateString={date} />
            </small>
          </p>
        </p>
        {children}
      </div>
      <br />
    </div>
  );
}
