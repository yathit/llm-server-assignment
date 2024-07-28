'use client'

import {useCallback, useEffect, useRef, useState} from "react";
import {useGetChatHistoryQuery, usePostChatMutation} from "@/lib/features/chat";
import {ChatCompletionMessage, ChatMessage} from "@/lib/types";
import {ActionIcon, Button, rem, TextInput, TextInputProps, useMantineTheme} from "@mantine/core";
import {IconArrowRight, IconSearch} from '@tabler/icons-react';


function HistoryPanel({history, chat}: {
    history: ChatCompletionMessage[] | undefined,
    chat?: ChatCompletionMessage | undefined
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

function InputWithButton({onChange}: { onChange: (x: string) => void }) {
    const ref = useRef<HTMLInputElement>(null);
    const theme = useMantineTheme();

    return (
        <TextInput
            ref={ref}
            size="md"
            placeholder="Your question ..."
            rightSectionWidth={42}
            rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={() => {
                    const value = ref.current?.value;
                    if (value) {
                        onChange(value);
                    }
                }}>
                    <IconArrowRight style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                </ActionIcon>
            }
        />
    );
}

export default function ChatPanel({initialThreadId}: { initialThreadId?: string }) {

    const [threadId, setThreadId] = useState(initialThreadId ?? '');
    const {data: history, refetch} = useGetChatHistoryQuery(threadId, {skip: !threadId});
    const [postChat, {isLoading: isPosting, data: chat}] = usePostChatMutation();

    const onSubmit = useCallback((value: string) => {
        const payload: ChatMessage = {content: value};
        if (threadId) {
            payload.thread_id = threadId;
        }
        postChat(payload);
    }, [postChat, threadId]);

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
                <HistoryPanel history={history}/>
            }
            <div>
                <InputWithButton onChange={onSubmit} />
            </div>
        </div>
    );
}