import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    // Process a POST request
    res.status(200).json({ message: "[GET-REQUEST] Hello from Tripdly!" });
  } else {
    // Handle any other HTTP method
  }
}
