import React from 'react';
import Head from 'next/head';
export function HeadSEO({ title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="theme-color" content="#000000" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* Favicon */}
                <link rel="icon" href="/assets/icons/favicon.ico" />
                {/* Font Open Sans */}


                {/* Bootstrap, Font Awesome 4.7 */}

            </Head>
        </>
    )
}
