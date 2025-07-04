
import { Sparkles, Zap, Shield, Globe, Brain, Search, MessageSquare, ArrowRight, TrendingUp, Star, Rocket } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative px-6 py-8 overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-8 w-20 h-20 bg-gradient-to-br from-purple-500/15 to-blue-500/15 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-16 right-8 w-24 h-24 bg-gradient-to-br from-cyan-500/15 to-emerald-500/15 rounded-full animate-pulse blur-xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-500/15 to-purple-500/15 rounded-full animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Compact hero section */}
        <div className="space-y-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-blue-600/40 to-cyan-600/40 rounded-full blur-2xl animate-pulse scale-[1.5] opacity-30"></div>
            <div className="relative p-6 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-full backdrop-blur-lg border border-purple-400/30 shadow-xl">
              <Brain className="w-16 h-16 text-white animate-pulse drop-shadow-lg" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
                NeuroScout
              </span>
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/25 to-green-500/25 px-4 py-2 rounded-full border border-emerald-400/40 backdrop-blur-sm shadow-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50"></div>
                <span className="text-emerald-200 text-sm font-semibold">AI Powered</span>
                <Rocket className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/25 to-purple-500/25 px-4 py-2 rounded-full border border-blue-400/40 backdrop-blur-sm shadow-lg">
                <TrendingUp className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200 text-sm font-semibold">Next-Gen Intelligence</span>
                <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed font-medium">
              Experience the <span className="text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text font-bold">future of AI search</span> with 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold"> multi-provider intelligence</span> and real-time web access
            </p>
          </div>
        </div>

        {/* Compact feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-600/25 via-purple-500/15 to-blue-600/25 rounded-2xl backdrop-blur-xl border border-purple-400/30 hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 h-full">
              <div className="p-3 bg-gradient-to-r from-purple-500/40 to-purple-400/40 rounded-2xl mb-3 group-hover:from-purple-400/60 group-hover:to-purple-300/60 transition-all duration-300 shadow-lg shadow-purple-500/20">
                <Zap className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg tracking-tight">Lightning Speed</h3>
              <p className="text-sm text-purple-100 text-center leading-relaxed">Sub-second AI responses with optimized architecture</p>
            </div>
          </div>
          
          <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-600/25 via-blue-500/15 to-cyan-600/25 rounded-2xl backdrop-blur-xl border border-blue-400/30 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 h-full">
              <div className="p-3 bg-gradient-to-r from-blue-500/40 to-blue-400/40 rounded-2xl mb-3 group-hover:from-blue-400/60 group-hover:to-blue-300/60 transition-all duration-300 shadow-lg shadow-blue-500/20">
                <Shield className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg tracking-tight">Smart Failover</h3>
              <p className="text-sm text-blue-100 text-center leading-relaxed">Intelligent provider switching for maximum reliability</p>
            </div>
          </div>
          
          <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-cyan-600/25 via-cyan-500/15 to-emerald-600/25 rounded-2xl backdrop-blur-xl border border-cyan-400/30 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 h-full">
              <div className="p-3 bg-gradient-to-r from-cyan-500/40 to-cyan-400/40 rounded-2xl mb-3 group-hover:from-cyan-400/60 group-hover:to-cyan-300/60 transition-all duration-300 shadow-lg shadow-cyan-500/20">
                <Globe className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg tracking-tight">Real-time Intelligence</h3>
              <p className="text-sm text-cyan-100 text-center leading-relaxed">Live data synthesis from global internet sources</p>
            </div>
          </div>
        </div>

        {/* Compact capability showcase */}
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600/30 to-green-600/30 px-4 py-2 rounded-full border border-emerald-400/40 backdrop-blur-xl hover:border-emerald-300/60 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/15">
            <Search className="w-4 h-4 text-emerald-200" />
            <span className="text-emerald-100 font-semibold text-sm">Advanced Search</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 px-4 py-2 rounded-full border border-indigo-400/40 backdrop-blur-xl hover:border-indigo-300/60 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/15">
            <MessageSquare className="w-4 h-4 text-indigo-200" />
            <span className="text-indigo-100 font-semibold text-sm">Natural Conversations</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 px-4 py-2 rounded-full border border-yellow-400/40 backdrop-blur-xl hover:border-yellow-300/60 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/15">
            <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
            <span className="text-yellow-100 font-semibold text-sm">Premium Intelligence</span>
          </div>
        </div>

        {/* Compact call to action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-slate-200 text-sm animate-bounce bg-gradient-to-r from-slate-700/40 to-slate-600/40 px-4 py-2 rounded-full border border-slate-500/40 backdrop-blur-sm shadow-lg">
            <ArrowRight className="w-4 h-4 rotate-90 text-purple-400" />
            <span className="font-medium">Start your conversation below</span>
            <ArrowRight className="w-4 h-4 rotate-90 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
