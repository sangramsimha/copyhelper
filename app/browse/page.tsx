'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Conversation {
  id: string;
  title: string;
  productDescription: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<{ content: string }>;
  _count: { messages: number };
}

export default function BrowsePage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async (reset = false) => {
    try {
      const currentOffset = reset ? 0 : offset;
      const response = await fetch(
        `/api/conversations?limit=20&offset=${currentOffset}${search ? `&search=${encodeURIComponent(search)}` : ''}`
      );
      const data = await response.json();
      
      if (reset) {
        setConversations(data.conversations);
      } else {
        setConversations((prev) => [...prev, ...data.conversations]);
      }
      
      setHasMore(data.hasMore);
      setOffset(currentOffset + data.conversations.length);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOffset(0);
    loadConversations(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-medium transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                Browse Conversations
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Explore and learn from previous marketing angle discussions
              </p>
            </div>
          </div>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product description or title..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white transition-all text-base placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center">
              <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Loading conversations...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📭</span>
            </div>
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No conversations found</p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors group"
            >
              <span>Start a new conversation</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {conversations.map((conversation, index) => (
                <Link
                  key={conversation.id}
                  href={`/chat/${conversation.id}`}
                  className="block bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {conversation.title}
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      {formatDate(conversation.updatedAt)}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 text-sm">
                    {conversation.productDescription}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <span className="text-base">💬</span>
                      <span className="font-medium">{conversation._count.messages} messages</span>
                    </div>
                    {conversation.messages[0] && (
                      <div className="flex-1 truncate text-slate-400 dark:text-slate-500 text-xs">
                        Last: {conversation.messages[0].content.substring(0, 50)}...
                      </div>
                    )}
                    <span className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => loadConversations()}
                  className="px-8 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
