'use client';

interface MessageContentProps {
  content: string;
}

export default function MessageContent({ content }: MessageContentProps) {
  const lines = content.split('\n');
  
  return (
    <div className="whitespace-pre-wrap leading-relaxed">
      {lines.map((line, i) => {
        const trimmedLine = line.trim();
        
        // Main heading (##)
        if (trimmedLine.startsWith('## ')) {
          return (
            <h2 key={i} className="text-lg font-bold mt-6 mb-3 text-slate-900 dark:text-white first:mt-0">
              {trimmedLine.replace('## ', '')}
            </h2>
          );
        }
        
        // Subheading (###)
        if (trimmedLine.startsWith('### ')) {
          return (
            <h3 key={i} className="text-base font-semibold mt-4 mb-2 text-slate-800 dark:text-slate-200">
              {trimmedLine.replace('### ', '')}
            </h3>
          );
        }
        
        // Horizontal rule
        if (trimmedLine === '---' || trimmedLine.startsWith('---')) {
          return <hr key={i} className="my-6 border-slate-200 dark:border-slate-700" />;
        }
        
        // Bullet points
        if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ') || trimmedLine.match(/^\d+\.\s/)) {
          const text = trimmedLine.replace(/^[-•]\s*/, '').replace(/^\d+\.\s/, '');
          return (
            <div key={i} className="ml-6 mb-2 flex items-start gap-2">
              <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
              <span>{text}</span>
            </div>
          );
        }
        
        // Rating/Score highlighting (e.g., "Rating: 8/10", "Overall Rating: 9/10")
        if (trimmedLine.match(/(overall\s+)?rating|score.*\d+\s*\/\s*10/i)) {
          const match = trimmedLine.match(/(\d+)\s*\/\s*10/i);
          const score = match ? parseInt(match[1]) : 0;
          const colorClass = score >= 8 ? 'text-green-600 dark:text-green-400' : 
                            score >= 6 ? 'text-yellow-600 dark:text-yellow-400' : 
                            'text-red-600 dark:text-red-400';
          
          return (
            <div key={i} className={`font-bold text-lg my-3 ${colorClass} bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-lg inline-block`}>
              {trimmedLine}
            </div>
          );
        }
        
        // Bold text (**text**)
        if (trimmedLine.includes('**')) {
          const parts = trimmedLine.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={i} className="mb-2">
              {parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
                }
                return <span key={j}>{part}</span>;
              })}
            </p>
          );
        }
        
        // Empty line
        if (trimmedLine === '') {
          return <br key={i} />;
        }
        
        // Regular paragraph
        return (
          <p key={i} className="mb-2 text-slate-700 dark:text-slate-300">
            {trimmedLine}
          </p>
        );
      })}
    </div>
  );
}
