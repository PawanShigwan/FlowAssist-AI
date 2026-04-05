import React from 'react';
import Card from './Card';
import List from './List';
import Summary from './Summary';
import WorkflowTimeline from './WorkflowTimeline';
import StructuredInfo from './StructuredInfo';

interface UIComponent {
  type: string;
  content?: string;
  items?: any[];
}

export default function DynamicRenderer({ data }: { data: any }) {
  if (!data || !data.components) {
    return (
      <div className="text-gray-500 italic flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 animate-spin"></div>
        <span>No structured data found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {data.sectionTitle && (
        <div className="space-y-2 translate-y-0 opacity-100 transition-all duration-700">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
            {data.sectionTitle}
          </h2>
          <div className="flex gap-2 flex-wrap pt-2">
            {data.keywords?.map((kw: string, i: number) => (
              <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-500/20">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-12">
        {data.components.map((comp: UIComponent, idx: number) => {
          switch (comp.type) {
            case 'summary':
              return <Summary key={idx} content={comp.content || ''} keywords={data.keywords} />;
            case 'workflow':
              return <WorkflowTimeline key={idx} items={comp.items || []} keywords={data.keywords} />;
            case 'structured_info':
              return <StructuredInfo key={idx} items={comp.items || []} keywords={data.keywords} />;
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
              return (
                <div key={idx} className="p-6 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-3xl border border-red-100 dark:border-red-900/20 font-medium">
                  Config error: Unknown component type "{comp.type}"
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}
