"use client";
import { useEffect } from 'react';
import styles from './AdSense.module.css';

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
        <div className={styles.container}>
            <span className={styles.label}>Sponsored</span>
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
