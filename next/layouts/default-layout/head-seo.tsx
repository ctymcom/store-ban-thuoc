import React from 'react';
import Head from 'next/head';
export function HeadSEO({ title }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0" />
            <link rel="icon" href="/assets/img/favicon.ico" />
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap" rel="stylesheet"/>

        </Head>
    )
}
