import Script from 'next/script';

export default function AdSense({ pId }) {
    if (!pId) return null;

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
        />
    );
}
