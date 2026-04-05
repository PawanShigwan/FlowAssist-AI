import React from 'react';
import HighlightText from './HighlightText';

export default function Summary({ content, keywords }: { content: string, keywords?: string[] }) {
  return (
    <div className="relative group overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/5 backdrop-blur-md border border-white/20 dark:border-gray-700/50 p-8 my-4 rounded-[2rem] shadow-sm transition-all duration-300">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg className="w-24 h-24 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21M16.017 11V11M21.017 11V11M3 21V11C3 9.89543 3.89543 9 5 9H11C12.1046 9 13 9.89543 13 11V21M7 9V5C7 3.89543 7.89543 3 9 3H11" /></svg>
      </div>
      
      <h4 className="font-black text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-[0.2em] text-[10px]">Context Overview</h4>
      <p className="text-gray-800 dark:text-blue-100 text-xl font-medium leading-relaxed max-w-4xl tracking-tight">
        <HighlightText text={content} keywords={keywords} />
      </p>
    </div>
  );
}
