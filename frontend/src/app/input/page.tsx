"use client";
import React, { useState, useEffect } from 'react';
import DynamicRenderer from '@/components/DynamicRenderer';

export default function InputPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [uiData, setUiData] = useState<any>(null);
  const [error, setError] = useState('');
  const [useAi, setUseAi] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loadingDelayed, setLoadingDelayed] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/auth';
  };

  const handleTransform = async () => {
    if (!text.trim()) {
      setError("Please enter some text to transform.");
      return;
    }
    if (text.length > 50000) {
      setError("Text is too long. Please restrict input to under 50,000 characters.");
      return;
    }
    setError('');
    setLoading(true);
    setLoadingDelayed(false);
    setUiData(null);
    
    // Set a timeout to switch the loading text if it takes longer than 10 seconds
    const timeoutId = setTimeout(() => {
      setLoadingDelayed(true);
    }, 10000);
    
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiBaseUrl}/api/content/transform`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, useAi })
      });
      if (!response.ok) throw new Error('Something went wrong. Please try again.');
      
      const res = await response.json();
      const parsedData = JSON.parse(res.data);
      setUiData(parsedData);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      setLoadingDelayed(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input Area */}
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Raw Content Input</h2>
          <textarea 
            className="flex-1 w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 resize-none min-h-[60vh] dark:text-gray-100"
            placeholder="Paste your text, articles, or notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={handleTransform}
            disabled={loading}
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md transition flex justify-center w-full"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                ✨ Generating UI...
              </span>
            ) : "Transform to UI"}
          </button>
          {error && <p className="mt-3 text-red-500 p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">{error}</p>}
        </div>

        {/* Right Column: Output Area */}
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI UI Preview Mode</h2>
            <div className="flex items-center gap-4">
              {username && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400 tracking-tight">{username}</span>
                </div>
              )}
              <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setUseAi(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !useAi 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Mock Mode
                </button>
                <button
                  onClick={() => setUseAi(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    useAi 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  AI Mode ✨
                </button>
              </div>
              {username && (
                <button 
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest pl-2 border-l border-gray-200 dark:border-gray-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="font-medium animate-pulse">
                {loadingDelayed ? "Taking longer than expected..." : "Analyzing context and building components..."}
              </p>
            </div>
          ) : uiData ? (
             <DynamicRenderer data={uiData} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center h-full space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-full mb-2">
                <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <p className="font-medium text-lg">Enter content to generate UI</p>
              <p className="text-sm max-w-sm">Paste your raw text on the left and click transform to see the beautifully generated UI components here.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
