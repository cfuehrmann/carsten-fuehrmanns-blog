import fs from "fs";
import path from "path";
import matter from "gray-matter";
import unified from "unified";
import markdown from "remark-parse";
import math from "remark-math";
import remark2reyhpe from "remark-rehype";
import raw from "rehype-raw";
import katex from "rehype-katex";
import stringify from "rehype-stringify";

export type MatterData =
  | {
      type: "post";
      title: string;
      date: string;
    }
  | {
      type: "page";
      title: string;
    };

export type MarkdownMetadata = MatterData & { id: string };

export type MarkdownProps = MarkdownMetadata & {
  contentHtml: string;
};

const markdownDirectory = path.join(process.cwd(), "pages");

export function getSortedPostData() {
  return fs
    .readdirSync(markdownDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(getMetadataFromFile)
    .reduce(addIfPost, [])
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getMarkdownIds() {
  return fs
    .readdirSync(markdownDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => ({
      params: { id: fileName.slice(0, -3) },
    }));
}

export async function getMarkdownProps(id: string): Promise<MarkdownProps> {
  const filePath = path.join(markdownDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(markdown)
    .use(math)
    .use(remark2reyhpe, { allowDangerousHtml: true })
    .use(raw)
    .use(katex)
    .use(stringify)
    .process(content);

  const contentHtml = processedContent.toString();
  return { ...getMatterData(data), id, contentHtml };
}

function getMetadataFromFile(fileName: string): MarkdownMetadata {
  const id = fileName.slice(0, -3);
  const filePath = path.join(markdownDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return { id, ...getMatterData(data) };
}

function addIfPost(
  posts: { id: string; title: string; date: string }[],
  metadata: MarkdownMetadata
) {
  return metadata.type === "post"
    ? [
        ...posts,
        {
          id: metadata.id,
          title: metadata.title,
          date: metadata.date,
        },
      ]
    : posts;
}

function getMatterData(data: { [key: string]: unknown }): MatterData {
  if (typeof data.title !== "string") throw new Error("Bad or missing title!");

  switch (data.type) {
    case "post":
      if (typeof data.date !== "string")
        throw new Error("Bad or missing date!");

      return {
        type: data.type,
        title: data.title,
        date: data.date,
      };
    case "page":
      return {
        type: data.type,
        title: data.title,
      };

    default:
      throw new Error("Unkown page type!");
  }
}
