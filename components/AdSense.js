"use client";
import { useEffect } from 'react';

export default function AdSense({ slot, style = { display: 'block' }, format = 'auto', responsive = 'true' }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    if (!slot) return null;

    return (
        <div style={{ margin: '40px auto', textAlign: 'center', maxWidth: '100%', overflow: 'hidden' }}>
            <span style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>スポンサーリンク</span>
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-4792239930558838"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
}
