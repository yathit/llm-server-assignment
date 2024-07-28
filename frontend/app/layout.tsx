import '@mantine/core/styles.css';
import React from 'react';
import {MantineProvider, ColorSchemeScript} from '@mantine/core';
import {theme} from '../theme';
import StoreProvider from "@/app/StoreProvider";


export const metadata = {
    title: 'LLM Chat Server',
    description: 'LLM Chat Server',
};

export default function RootLayout({children}: { children: any }) {
    return (
        <html lang="en">
        <head>
            <ColorSchemeScript/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <title/>
        </head>
        <body>
        <StoreProvider>
            <MantineProvider theme={theme}>{children}</MantineProvider>
        </StoreProvider>
        </body>
        </html>
    );
}