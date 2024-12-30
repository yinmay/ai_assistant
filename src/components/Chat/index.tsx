import React, { useState } from 'react'
import { getCompletion } from "@/utils/getCompletion";
import { ActionIcon, Textarea } from "@mantine/core";
 

export default function Chat() {
      const [prompt, setPrompt] = useState("");
      const [loading, setLoading] = useState(false);
  return (
    <Textarea
          placeholder="Enter your prompt"
          className="w-full"
          value={prompt}
          disabled={loading}
        //   onKeyDown={(evt) => onKeyDown(evt)}
          onChange={(evt) => setPrompt(evt.target.value)}
        ></Textarea>
  )
}
