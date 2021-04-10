import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { IComment } from "../lib/comments";
import Date from "./date";
import Layout from "./layout";
import { StaticHtmlProps } from "./static-html";

export function StaticHtmlWithComments({
  staticHtml,
  title,
  description,
  page,
}: StaticHtmlProps) {
  return (
    <Layout title={title} description={description} page={page}>
      <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
      <CommentsFromApi />
    </Layout>
  );
}

function CommentsFromApi() {
  const { pathname } = useRouter();

  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    (async () => {
      const { origin } = window.location;

      const response = await fetch(`${origin}/api/comments${pathname}/`, {
        method: "GET",
      });

      if (!response.ok)
        throw Object.assign(new Error(await response.text()), {
          status: response.status,
        });

      const fetchedComments = await response.json();

      setComments(fetchedComments);
    })();
  }, []);

  return <Comments comments={comments} />;
}

function Comments(props: { comments: IComment[] }) {
  const { comments } = props;

  return (
    <>
      <h2>Comments</h2>
      {commentElements(comments)}
    </>
  );
}

function commentElements(comments: IComment[]) {
  return comments.map((c) => {
    const replyElements = c.replies ? (
      <>
        {commentElements(c.replies)}
        <br />
      </>
    ) : (
      []
    );

    return c.type === "deleted" ? (
      <Deleted key={c.id}>{replyElements}</Deleted>
    ) : (
      <Comment
        key={c.id}
        email={c.email}
        author={c.author}
        date={c.date}
        text={c.text}
      >
        {replyElements}
      </Comment>
    );
  });
}

function Comment(props: {
  email?: string;
  author?: string;
  date: string;
  text: string;
  children: React.ReactNode;
}) {
  const { email, author, date, text, children } = props;

  return (
    <div className="w3-card">
      <div
        className="w3-container"
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {author ? (
          <p>{email ? `${author}<${email}>` : author}</p>
        ) : (
          <p>{email}</p>
        )}
        <p>
          <small className="w3-text-grey">
            <Date dateString={date} />
          </small>
        </p>
        <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
        {children}
      </div>
    </div>
  );
}

function Deleted(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <div className="w3-card">
      <div className="w3-container">
        <p>
          <em className="w3-text-grey">Deleted</em>
        </p>
        {children}
      </div>
    </div>
  );
}
