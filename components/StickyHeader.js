"use client";

import Link from "next/link";
import styles from "./StickyHeader.module.css";
import { useState, useEffect } from "react";

export default function StickyHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => (e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    🍌 バナナスタンプ
                </div>

                <nav className={styles.nav}>
                    <a href="#howto" onClick={scrollToSection('howto')} className={styles.link}>使い方</a>
                    <a href="#templates" onClick={scrollToSection('templates')} className={styles.link}>テンプレート</a>
                    <a href="#faq" onClick={scrollToSection('faq')} className={styles.link}>FAQ</a>
                </nav>

                <div className={styles.actions}>
                    <a href="#tool" onClick={scrollToSection('tool')} className={styles.cta}>
                        今すぐ作る
                    </a>
                </div>
            </div>
        </header>
    );
}
