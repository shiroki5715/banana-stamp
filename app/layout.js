import "./globals.css";
import Footer from "../components/Footer";
import AdSense from "../components/AdSense";
import StickyHeader from "../components/StickyHeader";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New, Inter } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-eng",
});

export const metadata = {
  title: "バナナスタンプ | LINEスタンプ作成を、3秒で。",
  description: "1枚の画像をドロップするだけで、LINEスタンプ用に自動分割・リサイズ。クリエイターのための最強時短ツール。",
};

export default function RootLayout({ children }) {
  // TODO: Replace with actual AdSense Publisher ID
  const ADSENSE_PID = "";

  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${zenKaku.variable} ${inter.variable}`}>
        <StickyHeader />
        <AdSense pId={ADSENSE_PID} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
