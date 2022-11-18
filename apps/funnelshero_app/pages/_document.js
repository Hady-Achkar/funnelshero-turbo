import { Html, Head, Main, NextScript } from 'next/document'
import { } from '../src/prototypes';

export default function Document() {
    return (
        <Html >
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <title>Funnelshero app</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <body >
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}