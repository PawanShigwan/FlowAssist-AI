import React from 'react';

interface HighlightTextProps {
  text: string;
  keywords?: string[];
}

export default function HighlightText({ text, keywords = [] }: HighlightTextProps) {
  if (!keywords || keywords.length === 0 || !text) return <>{text}</>;

  // Strict evaluation bounds: Limit to max 5 keywords
  const validKeywords = keywords.filter(k => typeof k === 'string' && k.trim() !== "").slice(0, 5);
  
  if (validKeywords.length === 0) return <>{text}</>;

  // Escape special regex characters safely and create word boundary regex
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexPattern = new RegExp(`\\b(${validKeywords.map(escapeRegExp).join('|')})\\b`, 'gi');

  const parts = text.split(regexPattern);

  return (
    <>
      {parts.map((part, index) => {
        // Find if this specific chunk case-insensitively matches any of our keywords
        const isMatch = validKeywords.some((kw) => kw.toLowerCase() === part.toLowerCase());
        
        if (isMatch) {
          return (
             <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 font-semibold px-1.5 py-0.5 rounded mx-0.5 inline-block">
               {part}
             </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
