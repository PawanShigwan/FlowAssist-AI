import React from 'react';
import HighlightText from './HighlightText';

export default function List({ items, keywords }: { items: string[], keywords?: string[] }) {
  return (
    <div className="bg-white/30 dark:bg-gray-800/20 backdrop-blur-sm rounded-[2rem] p-8 my-4 border border-white/20 dark:border-gray-700/50 shadow-sm transition-all duration-300">
       <h4 className="font-black text-gray-400 dark:text-gray-500 mb-6 uppercase tracking-[0.2em] text-[10px]">Key Details</h4>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="group flex items-start gap-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform flex-shrink-0"></div>
            <HighlightText text={item} keywords={keywords} />
          </li>
        ))}
      </ul>
    </div>
  );
}
