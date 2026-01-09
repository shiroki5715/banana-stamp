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
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (sectionId) => (e) => {
        e.preventDefault();
        if (pathname === "/") {
            // Same page: smooth scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Different page: navigate to home with hash
            router.push(`/#${sectionId}`);
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    🍌 バナナスタンプ
                </Link>

                <nav className={styles.nav}>
                    <a href="#howto" onClick={handleNavClick('howto')} className={styles.link}>使い方</a>
                    <a href="#templates" onClick={handleNavClick('templates')} className={styles.link}>テンプレート</a>
                    <a href="#faq" onClick={handleNavClick('faq')} className={styles.link}>FAQ</a>
                </nav>

                <div className={styles.actions}>
                    <a href="#tool" onClick={handleNavClick('tool')} className={styles.cta}>
                        今すぐ作る
                    </a>
                </div>
            </div>
        </header>
    );
}
