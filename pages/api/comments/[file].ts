import type { NextApiRequest, NextApiResponse } from "next";
import { readComments } from "../../../lib/comments";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.query;
  try {
    const commentDir = process.env["COMMENT_DIR"];
    const comments = readComments(`${commentDir}${file}.json`);
    res.status(200).json(comments);
  } catch (e) {
    res.status(404).json([]);
  }
}
