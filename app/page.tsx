'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [productDescription, setProductDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStartChat = async () => {
    if (!productDescription.trim()) {
      alert('Please enter a product description');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productDescription }),
      });

      const data = await response.json();
      if (data.conversation) {
        router.push(`/chat/${data.conversation.id}`);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      alert('Failed to start chat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                <span className="text-4xl">💡</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Copy Helper
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
              AI-powered marketing angle generator and evaluator
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              Transform your products into compelling marketing messages
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 md:p-10 mb-8 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✨</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Start a New Conversation
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
              Describe your product or service, and we'll help you generate compelling marketing angles using proven frameworks.
            </p>
            
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="E.g., A mobile antivirus app that protects Android phones from malware and speeds up performance..."
              className="w-full h-36 p-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700/50 dark:text-white resize-none transition-all text-base placeholder:text-slate-400"
            />

            <button
              onClick={handleStartChat}
              disabled={isLoading}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none text-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Starting...
                </span>
              ) : (
                'Start Chat →'
              )}
            </button>
          </div>

          <div className="text-center mb-12">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold text-lg transition-colors group"
            >
              <span>Browse Previous Conversations</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400">📝</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multiple Frameworks</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                15-Step, 7 Deadly Sins, and Writing Great Leads frameworks for diverse angles
              </p>
            </div>
            
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">⭐</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Smart Evaluation</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Rate angles 1-10 and get actionable improvement feedback
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-blue-100 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <span>How It Works</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { num: '1', text: 'Describe your product or service' },
                { num: '2', text: 'AI generates marketing angles using multiple proven frameworks' },
                { num: '3', text: 'Evaluate angles with ratings and improvement feedback' },
                { num: '4', text: 'Browse and learn from previous conversations' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    {item.num}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 pt-2 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
