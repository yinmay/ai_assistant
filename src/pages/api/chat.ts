import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, history, options = {} } = await req.body

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

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY


  if (!apiKey) {
    console.error('OPENAI_API_KEY is not configured in environment variables');
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello' }]
      })
    });

    const json = await response.json();

    res.status(200).json({ ...json.choices[0].message });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to fetch from OpenAI' });
  }
}