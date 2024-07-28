import {configureStore} from '@reduxjs/toolkit'
import {chatApi} from "@/lib/features/chat";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [chatApi.reducerPath]: chatApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(chatApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']