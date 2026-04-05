import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 drop-shadow-sm">
        ContentFlow AI
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-12 leading-relaxed">
        Transform raw text into structured, visually stunning interactive components instantly.
      </p>
      
      <div className="flex gap-4">
        <Link href="/input" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          Try it now
        </Link>
        <Link href="/auth" className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          Sign In
        </Link>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-3 dark:text-white">Smart Analysis</h3>
          <p className="text-gray-600 dark:text-gray-400">AI automatically detects key points, summaries, and action items.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-3 dark:text-white">Rich UI Components</h3>
          <p className="text-gray-600 dark:text-gray-400">Instantly generate cards, lists, and summaries that look great.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-3 dark:text-white">Responsive Design</h3>
          <p className="text-gray-600 dark:text-gray-400">Everything rendered is mobile-first and fully accessible.</p>
        </div>
      </div>
    </div>
  );
}
