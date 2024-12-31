

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { prompt, history = [], options = {} } = req.body;
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "you are ai assitant",
      },
      ...history,
      {
        role: "user",
        content: prompt,
      },
    ],
    ...options,
  };
  const resp = await fetch("https://58e048b8-hidden-mud-9d88.mwy6464.workers.dev//v1/chat/completions", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await resp.json();
  res.status(200).json({ ...json.choices[0].message });
}
