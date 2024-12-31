import React, { useState } from 'react'
import { getCompletion } from "@/utils/getCompletion";
import { ActionIcon, Textarea } from "@mantine/core";
import { IconSend, IconEraser } from "@tabler/icons-react";
import { ChatLogsType } from "@/types";
import {
    clearChatLogs,
    getChatLogs,
    updateChatLogs,
} from "@/utils/chatStorage";
import clsx from "clsx";
const LOCAL_KEY = "ai_demo";


export default function Chat() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [completion, setCompletion] = useState<string>("");
    const [chatList, setChatList] = useState<ChatLogsType>([]);

    const setChatLogs = (logs: ChatLogsType) => {
        setChatList(logs);
        updateChatLogs(LOCAL_KEY, logs);
    };


    const getAIResp = async () => {
        setLoading(true);
        const list = [
            ...chatList,
            {
                role: "user",
                content: prompt,
            },
        ];
        setChatLogs(list);
        const resp = await getCompletion({
            prompt: prompt,
            history: chatList.slice(-4),
        });
        setPrompt("");
        setCompletion(resp.content);
        setChatLogs([
            ...list,
            {
                role: "assistant",
                content: resp.content,
            },
        ]);
        setLoading(false);
    };
    return (
        <div className="h-screen flex flex-col items-center">
            <div className="w-3/5 max-w-md">{chatList.map((item, idx) => (
          <div
            key={`${item.role}-${idx}`}
            className={clsx(
              {
                flex: item.role === "user",
                "flex-col": item.role === "user",
                "items-end": item.role === "user",
              },
              "mt-4",
            )}
          >
            <div>{item.role}</div>
            <div
              className={clsx(
                "rounded-md",
                "shadow-md",
                "px-4",
                "py-2",
                "mt-1",
                "w-full",
                "max-w-4xl",
              )}
            >
              {item.content}
            </div>
          </div>
        ))}</div>
            <div className="flex items-center w-full">
                <ActionIcon
                    className="mr-2"
                    disabled={loading}
                //   onClick={() => onClear()}
                >
                    <IconEraser></IconEraser>
                </ActionIcon>
                <Textarea
                    placeholder="Enter your prompt"
                    className="w-3/5"
                    value={prompt}
                    disabled={loading}
                    //   onKeyDown={(evt) => onKeyDown(evt)}
                    onChange={(evt) => setPrompt(evt.target.value)}
                ></Textarea>
                <ActionIcon
                    className="ml-2"
                    loading={loading}
                    onClick={() => getAIResp()}
                >
                    <IconSend></IconSend>
                </ActionIcon>
            </div>
        </div>
    )
}
