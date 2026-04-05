import React from 'react';
import HighlightText from './HighlightText';

export default function Card({ title, description, keywords }: { title: string, description: string, keywords?: string[] }) {
  return (
    <div className="group relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col h-full hover:bg-white/60 dark:hover:bg-gray-800/60">
      {/* Subtle top light effect */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/40 transition-opacity duration-300"></div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <HighlightText text={title} keywords={keywords} />
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1 text-base">
        <HighlightText text={description} keywords={keywords} />
      </p>
      
      {/* Decorative dot */}
      <div className="mt-4 flex justify-end">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 group-hover:bg-blue-500 transition-colors"></div>
      </div>
    </div>
  );
}
