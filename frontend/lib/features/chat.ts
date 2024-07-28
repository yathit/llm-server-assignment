import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ChatCompletionMessage, ChatMessage} from '../types'


const baseUrl = 'http://localhost:8000/api/v1/';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getChatHistory: builder.query<ChatCompletionMessage[], string>({
            query: (thread_id) => ({
                url: `chat`,
                params: {thread_id: thread_id},
            }),
        }),
        postChat: builder.mutation<ChatCompletionMessage, ChatMessage>({
            query: (message) => ({
                url: `chat`,
                method: 'POST',
                body: message,
            }),
        })
    }),
})


export const {useGetChatHistoryQuery, usePostChatMutation} = chatApi