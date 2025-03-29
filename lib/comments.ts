import fs from "fs";

export type IComment =
  | {
      type: "active";
      id: string;
      replies?: IComment[];
      email?: string;
      author?: string;
      date: string;
      text: string;
    }
  | { type: "deleted"; id: string; replies?: IComment[] };

export function readComments(path: string) {
  const json = fs.readFileSync(path).toString();
  const comments = JSON.parse(json);

  return ensureComments(comments);
}

function ensureComments(comments: unknown): IComment[] {
  if (!Array.isArray(comments)) throw new Error("Expected an array!");

  return comments.map((c) => {
    if (!isObject(c)) throw new Error("Expected an object!");
    if (!hasOwnProperty(c, "type"))
      throw new Error("Expected a type in the comment!");
    if (!hasOwnProperty(c, "id")) throw new Error("Expected an id!");
    const { type, id } = c;
    if (typeof id !== "string") throw new Error("Id should be a string!");

    const replies = hasOwnProperty(c, "replies")
      ? ensureComments(c.replies)
      : undefined;

    if (type === "deleted")
      return replies ? { type, id, replies } : { type, id };

    if (type !== "active")
      throw new Error("Type should be 'deleted' or 'active'!");

    if (!hasOwnProperty(c, "date")) throw new Error("Expected a date!");
    if (!hasOwnProperty(c, "text")) throw new Error("Expected a text!");

    const email = hasOwnProperty(c, "email")
      ? ensureString(c.email)
      : undefined;

    const author = hasOwnProperty(c, "author")
      ? ensureString(c.author)
      : undefined;

    const { date, text } = c;

    if (email && typeof email !== "string")
      throw new Error("Email should be a string!");

    if (author && typeof author !== "string")
      throw new Error("Author should be a string!");
    if (typeof date !== "string") throw new Error("Date should be a string!");
    if (typeof text !== "string") throw new Error("Text should be a string!");

    return {
      type,
      id,
      email,
      date,
      text,
      ...(author ? { author } : {}),
      ...(replies ? { replies } : {}),
    };
  });
}

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function hasOwnProperty<X, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> {
  return {}.hasOwnProperty.call(obj, prop);
}

function ensureString(value: unknown): string {
  if (typeof value === "string") return value;
  throw new Error("Value should be a string!");
}
