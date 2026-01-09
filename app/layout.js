import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import AdSense from "../components/AdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "バナナスタンプ - LINEスタンプ作成ツール",
  description: "画像をドロップするだけでLINEスタンプ用のサイズに自動調整・分割。",
};

export default function RootLayout({ children }) {
  // TODO: Replace with actual AdSense Publisher ID
  const ADSENSE_PID = "";

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AdSense pId={ADSENSE_PID} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
