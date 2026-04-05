"use client";
import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We default to "anonymous" userId for now since we don't have deep context Auth
    fetch('http://localhost:8080/api/history/anonymous')
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Conversion Dashboard</h1>
        
        {loading ? (
          <p>Loading your history...</p>
        ) : history.length === 0 ? (
          <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
            <p className="text-gray-500 dark:text-gray-400">You haven't converted any content yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
                <p className="text-xs text-cool-gray mb-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-1">Raw Content Snippet</h3>
                  <p className="text-sm line-clamp-3">{item.originalContent}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-blue-500 mb-1">Generated JSON</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded max-h-32 overflow-y-auto text-xs font-mono">
                    {item.generatedJsonUI}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
