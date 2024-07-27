import {useCallback, useRef, useState} from "react";
import {useGetChatHistoryQuery, usePostChatMutation} from "@/services/chat";
import {ChatCompletionMessage} from "@/services/types";
import {Button} from "@mantine/core";


function HistoryPanel({history, chat}: { history: ChatCompletionMessage[]|undefined , chat: ChatCompletionMessage[]|undefined }) {
    const messages = history ?? [];
    if (chat) {
        chat.forEach(x => {
            if (messages.every(i => i.timestamp != x.timestamp)) {
                messages.push(x);
            }
        })
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
    const {data: history} = useGetChatHistoryQuery(threadId, {skip: !threadId});
    const [postChat, {isLoading: isPosting, data: chat}] = usePostChatMutation();

    const onSubmit = useCallback(() => {
        const value = ref.current?.value;
        if (!value) {
            console.warn("No message");
            return;
        }
        postChat({content: value, thread_id: threadId});
    }, [ref, postChat]);

    return (<div>
            {
                <HistoryPanel history={history} chat={chat}/>
            }
            <div>
                <input ref={ref} placeholder={"Your question ..."} disabled={isPosting}/>
                <Button onClick={onSubmit}>Send</Button>
            </div>
        </div>
    );
}