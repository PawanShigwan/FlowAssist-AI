import React from 'react';
import HighlightText from './HighlightText';

interface InfoItem {
  label: string;
  value: string;
}

export default function StructuredInfo({ items, keywords }: { items: InfoItem[], keywords?: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
          <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 mb-2 tracking-widest leading-none">
            {item.label}
          </span>
          <span className="text-xl font-bold text-gray-900 dark:text-white truncate">
            <HighlightText text={item.value} keywords={keywords} />
          </span>
        </div>
      ))}
    </div>
  );
}
