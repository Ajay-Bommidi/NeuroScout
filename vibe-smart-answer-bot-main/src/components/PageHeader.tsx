
import { Brain, Sparkles, Zap } from 'lucide-react';

const PageHeader = () => {
  return (
    <div className="text-center mb-12 relative">
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl rounded-full transform scale-150"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-tight">
              NeuroScout
            </h1>
            <div className="flex items-center gap-2 text-purple-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">Premium AI Assistant</span>
              <Zap className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </div>
        
        <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Experience the future of intelligent search with multi-provider AI technology, 
          real-time web access, and lightning-fast responses.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Multi-Provider Intelligence</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700/50">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Real-time Web Search</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-700/50">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Advanced Reasoning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
