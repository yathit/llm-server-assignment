export type ChatCompletionMessage = {
    role: string;
    content: string;
    timestamp: number;
    thread_id: string;
}

export type ChatMessage = {
    content: string;
    thread_id?: string;
}