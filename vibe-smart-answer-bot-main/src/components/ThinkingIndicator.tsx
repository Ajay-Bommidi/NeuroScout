
import { Brain, Sparkles } from 'lucide-react';

const ThinkingIndicator = () => {
  return (
    <div className="flex items-center gap-3 text-slate-300">
      <div className="relative">
        <Brain className="w-5 h-5 animate-pulse text-emerald-400" />
        <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-cyan-400 animate-ping" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">NeuroScout is thinking</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
