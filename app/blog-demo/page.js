"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './blog.module.css';

export default function BlogDemo() {
    // Spotlight Effect Logic
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            // CSS variables for spotlight might be expensive to update every frame via React state
            // Direct DOM manipulation is often smoother for cursor tracking
            containerRef.current.style.setProperty('--cursor-x', `${clientX}px`);
            containerRef.current.style.setProperty('--cursor-y', `${clientY}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const articles = [
        {
            id: 1,
            date: "2026.01.31",
            title: "The Rise of Agentic UI",
            desc: "Why static interfaces are dying and what comes next. Agents are not just chat; they are the UI.",
            span: "col-span-2 row-span-2",
        },
        {
            id: 2,
            date: "2026.01.28",
            title: "Generative Workflows",
            desc: "Designing for probability. How to handle non-deterministic user flows.",
            span: "",
        },
        {
            id: 3,
            date: "2026.01.25",
            title: "Code as a Material",
            desc: "Direct manipulation of ASTs creates a new paradigm for creative coding tools.",
            span: "row-span-2",
        },
        {
            id: 4,
            date: "2026.01.20",
            title: "The Silent API",
            desc: "Optimizing LLM context windows for massive data retrieval tasks.",
            span: "",
        },
        {
            id: 5,
            date: "2026.01.15",
            title: "Neural Aesthetics",
            desc: "Defining beauty in the age of generated pixels. The shift from Flat Design to 'Juicy' interfaces.",
            span: "col-span-2",
        },
        {
            id: 6,
            date: "2026.01.10",
            title: "Cybernetics Reborn",
            desc: "Feedback loops between human intent and machine execution.",
            span: "",
        },
    ];

    return (
        <div
            ref={containerRef}
            className={styles.container}
            style={{
                // Initial fallback values
                '--cursor-x': '50%',
                '--cursor-y': '50%'
            }}
        >
            {/* Spotlight Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    background: `radial-gradient(600px circle at var(--cursor-x) var(--cursor-y), rgba(0, 243, 255, 0.08), transparent 40%)`,
                    zIndex: 9998
                }}
            />

            <section className={styles.hero}>
                <h1 className={styles.title}>
                    <span className={styles.highlight}>AI</span><br />
                    <span>NATIVE</span><br />
                    <span>DEV.</span>
                </h1>
            </section>

            <section className={styles.gridSection}>
                <div className={styles.bentoGrid}>
                    {articles.map((article) => (
                        <div key={article.id} className={`${styles.card} ${article.span ? styles[article.span] : ''}`}>
                            <div className={styles.date}>{article.date}</div>
                            <h2 className={styles.cardTitle}>{article.title}</h2>
                            <p className={styles.cardDesc}>{article.desc}</p>
                            <div className={styles.techVisual} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
