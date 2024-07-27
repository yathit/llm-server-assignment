import '@mantine/core/styles.css';
import React from 'react';
import {MantineProvider, ColorSchemeScript} from '@mantine/core';
import {theme} from '../theme';
import {store} from './store'
import {Provider} from 'react-redux'

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
        <Provider store={store}>
            <MantineProvider theme={theme}>{children}</MantineProvider>
        </Provider>
        </body>
        </html>
    );
}