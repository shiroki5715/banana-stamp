"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./StickyHeader.module.css";
import { useState, useEffect } from "react";

export default function StickyHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (sectionId) => (e) => {
        e.preventDefault();
        if (pathname === "/") {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push(`/#${sectionId}`);
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <div className={styles.logo} onClick={() => router.push('/')}>
                    <span className={styles.logoIcon}>🍌</span>
                    Banana Stamp
                </div>

                <nav className={styles.nav}>
                    <a href="#howto" onClick={handleNavClick('howto')} className={styles.link}>使い方</a>
                    <a href="#templates" onClick={handleNavClick('templates')} className={styles.link}>仕様一覧</a>
                    <a href="#faq" onClick={handleNavClick('faq')} className={styles.link}>よくある質問</a>
                </nav>

                <div className={styles.actions}>
                    <a href="#tool" onClick={handleNavClick('tool')} className={styles.cta}>
                        今すぐ作る！
                    </a>
                </div>
            </div>
        </header>
    );
}
