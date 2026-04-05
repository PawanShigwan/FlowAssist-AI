import React from 'react';
import HighlightText from './HighlightText';

export default function Summary({ content, keywords }: { content: string, keywords?: string[] }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-l-4 border-blue-500 p-6 my-2 rounded-r-2xl shadow-sm">
      <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-wider text-xs">Executive Summary</h4>
      <p className="text-blue-900 dark:text-blue-100 text-lg leading-relaxed"><HighlightText text={content} keywords={keywords} /></p>
    </div>
  );
}
