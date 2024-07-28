'use client'

import {useCallback, useEffect, useRef, useState} from "react";
import {useGetChatHistoryQuery, usePostChatMutation} from "@/lib/features/chat";
import {ChatCompletionMessage, ChatMessage} from "@/lib/types";
import {Button} from "@mantine/core";


function HistoryPanel({history, chat}: {
    history: ChatCompletionMessage[] | undefined,
    chat: ChatCompletionMessage | undefined
}) {
    let messages = history ?? [];
    if (chat && !messages.some(x => x.timestamp)) {
        messages = [...messages];
        messages.push(chat);
    }
    return (
        <ul>
            {
                messages.map((message) => (
                    <li key={message.timestamp}>{message.content}</li>
                ))
            }
        </ul>
    )
}

export default function ChatPanel({initialThreadId}: { initialThreadId?: string }) {
    const ref = useRef<HTMLInputElement>(null);
    const [threadId, setThreadId] = useState(initialThreadId ?? '');
    const {data: history, refetch} = useGetChatHistoryQuery(threadId, {skip: !threadId});
    const [postChat, {isLoading: isPosting, data: chat}] = usePostChatMutation();

    const onSubmit = useCallback(() => {
        const value = ref.current?.value;
        console.log('onSubmmit', value);
        if (!value) {
            console.warn("No message");
            return;
        }
        const payload: ChatMessage = {content: value};
        if (threadId) {
            payload.thread_id = threadId;
        }
        postChat(payload);
    }, [ref, postChat, threadId]);

    useEffect(() => {
        if (chat) {
            if (threadId) {
                refetch();
            } else {
                setThreadId(chat.thread_id);
            }
        }
    }, [chat, threadId])

    return (<div>
            {
                <HistoryPanel history={history} chat={undefined}/>
            }
            <div>
                <input ref={ref} placeholder={"Your question ..."} disabled={isPosting}/>
                <Button onClick={onSubmit}>Send</Button>
            </div>
        </div>
    );
}