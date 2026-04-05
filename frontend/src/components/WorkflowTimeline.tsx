import React from 'react';
import HighlightText from './HighlightText';

interface WorkflowItem {
  title: string;
  description: string;
}

export default function WorkflowTimeline({ items, keywords }: { items: WorkflowItem[], keywords?: string[] }) {
  return (
    <div className="flex flex-col space-y-8 py-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-6 group">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300 z-10">
              {index + 1}
            </div>
            {index !== items.length - 1 && (
              <div className="w-1 h-full bg-gradient-to-b from-blue-600 to-transparent dark:from-blue-500/50 -mt-2"></div>
            )}
          </div>
          <div className="flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/60 dark:hover:bg-gray-800/60">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              <HighlightText text={item.title} keywords={keywords} />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <HighlightText text={item.description} keywords={keywords} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
