import "./globals.css";
import Footer from "../components/Footer";
import StickyHeader from "../components/StickyHeader";
import { Zen_Maru_Gothic, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL("https://banana-stamp.com"),
  title: "バナナスタンプ | LINEスタンプ作成を、3秒で。",
  description: "1枚の画像をドロップするだけで、LINEスタンプ用に自動分割・リサイズ。クリエイターのための最強時短ツール。",
  keywords: ["LINEスタンプ", "スタンプ作成", "自作スタンプ", "スタンプ分割", "リサイズ", "透過", "クリエイターズマーケット", "PNG変換", "無料ツール"],
  openGraph: {
    title: "バナナスタンプ | LINEスタンプ作成を、3秒で。",
    description: "1枚の画像をドロップするだけで、LINEスタンプ用に自動分割・リサイズ。クリエイターのための最強時短ツール。",
    url: "https://banana-stamp.com",
    siteName: "バナナスタンプ",
    locale: "ja_JP",
    type: "website",
  },
  verification: {
    google: "G4t_99F9YRVRHZitlJcOShG8DEKDtLI9cact66hNnsE",
  },
  twitter: {
    card: "summary_large_image",
    title: "バナナスタンプ | LINEスタンプ作成を、3秒で。",
    description: "1枚の画像をドロップするだけで、LINEスタンプ用に自動分割・リサイズ。",
  },
};

export default function RootLayout({ children }) {
  // TODO: Replace with actual AdSense Publisher ID
  const ADSENSE_PID = "ca-pub-4792239930558838";
  const GA_ID = "G-H7TB0W3N99";

  return (
    <html lang="ja">
      <head>
      </head>
      <body className={`${zenMaru.variable} ${ibmMono.variable}`}>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4792239930558838`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <StickyHeader />
        {children}
        <Footer />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
