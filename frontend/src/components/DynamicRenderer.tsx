import React from 'react';
import Card from './Card';
import List from './List';
import Summary from './Summary';

interface UIComponent {
  type: string;
  content?: string;
  items?: any[];
}

export default function DynamicRenderer({ data }: { data: any }) {
  if (!data || !data.components) {
    return <div className="text-gray-500 italic flex justify-center py-10">No structured data found.</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {data.sectionTitle && (
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white border-b pb-3 mb-2 dark:border-gray-700 tracking-tight">
          {data.sectionTitle}
        </h2>
      )}
      
      {data.components.map((comp: UIComponent, idx: number) => {
        switch (comp.type) {
          case 'summary':
            return <Summary key={idx} content={comp.content || ''} keywords={data.keywords} />;
          case 'list':
            return <List key={idx} items={comp.items || []} keywords={data.keywords} />;
          case 'cards':
            return (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {comp.items?.map((item: any, i: number) => (
                  <Card key={i} title={item.title} description={item.description} keywords={data.keywords} />
                ))}
              </div>
            );
          default:
            return <div key={idx} className="p-4 bg-red-100 text-red-800 rounded-2xl">Unknown component type: {comp.type}</div>;
        }
      })}
    </div>
  );
}
