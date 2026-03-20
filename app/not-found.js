import Link from 'next/link';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-400 text-center px-4 font-display">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg max-w-lg w-full">
        <div className="text-6xl mb-4">🍌</div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          お探しのページは移動または削除された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-md"
        >
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
