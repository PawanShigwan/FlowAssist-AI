import React from 'react';
import HighlightText from './HighlightText';

export default function List({ items, keywords }: { items: string[], keywords?: string[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 my-2 border border-gray-100 dark:border-gray-700">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed marker:text-blue-500">
            <HighlightText text={item} keywords={keywords} />
          </li>
        ))}
      </ul>
    </div>
  );
}
