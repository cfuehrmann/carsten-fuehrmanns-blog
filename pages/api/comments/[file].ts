import type { NextApiRequest, NextApiResponse } from "next";
import { readComments } from "../../../lib/comments";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.query;
  try {
    const comments = readComments(
      `/home/carsten/web-site-comments/${file}.json`
    );
    res.status(200).json(comments);
  } catch (e) {
    res.status(404).json([]);
  }
}
