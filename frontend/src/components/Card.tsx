import React from 'react';
import HighlightText from './HighlightText';

export default function Card({ title, description, keywords }: { title: string, description: string, keywords?: string[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 tracking-tight"><HighlightText text={title} keywords={keywords} /></h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1"><HighlightText text={description} keywords={keywords} /></p>
    </div>
  );
}
