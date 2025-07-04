import { Search, Brain, Sparkles, Zap, Shield, Globe, MessageSquare, Cpu } from 'lucide-react';
import { Card } from '../components/ui/card';

const featureGradients = [
  'from-purple-500 via-pink-500 to-red-400',
  'from-blue-500 via-cyan-400 to-emerald-400',
  'from-yellow-400 via-orange-500 to-pink-500',
  'from-green-400 via-teal-400 to-blue-500',
  'from-indigo-500 via-purple-400 to-pink-400',
  'from-emerald-500 via-lime-400 to-yellow-300',
  'from-pink-500 via-fuchsia-500 to-purple-500',
  'from-cyan-500 via-blue-400 to-indigo-400',
];

const FeatureCards = () => {
  const features = [
    {
      icon: Search,
      title: "Multi-Provider Search",
      description: "Tavily, Serper, and Perplexity integration",
      color: "premium-gradient",
      bgColor: "glass"
    },
    {
      icon: Brain,
      title: "Neural Processing",
      description: "Advanced AI reasoning and analysis",
      color: "premium-gradient",
      bgColor: "glass"
    },
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Sub-second response times",
      color: "premium-gradient",
      bgColor: "glass"
    },
    {
      icon: Shield,
      title: "Auto Failover",
      description: "99.9% uptime guarantee",
      color: "premium-gradient",
      bgColor: "glass"
    },
    {
      icon: Globe,
      title: "Real-time Web",
      description: "Live data from the internet",
      color: "premium-gradient",
      bgColor: "glass"
    },
    {
      icon: MessageSquare,
      title: "Natural Chat",
      description: "Human-like conversations",
      color: "premium-gradient",
      bgColor: "glass"
    },
    {
      icon: Sparkles,
      title: "Premium AI",
      description: "State-of-the-art models",
      color: "premium-gradient",
      bgColor: "glass"
    },
    {
      icon: Cpu,
      title: "Smart Routing",
      description: "Intelligent provider selection",
      color: "premium-gradient",
      bgColor: "glass"
    }
  ];

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto glass rounded-3xl border border-white/10 shadow-2xl p-0 md:p-4 backdrop-blur-xl">
      {/* Sticky section header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-900/80 to-transparent rounded-t-3xl px-4 pt-6 pb-3">
        <h3 className="text-2xl font-bold text-white mb-1">Premium Features</h3>
        <p className="text-slate-400 text-sm">Experience next-generation AI capabilities</p>
      </div>
      {/* Scrollable feature cards grid */}
      <div className="overflow-y-auto max-h-[60vh] md:max-h-[60vh] sm:max-h-[50vh] px-4 pb-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-slate-800/50" role="region" aria-label="Premium Features">
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`group p-4 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer focus:ring-2 focus:ring-purple-400 animate-fade-in-up bg-gradient-to-br ${featureGradients[index % featureGradients.length]} glass`}
              tabIndex={0}
              aria-label={feature.title + ': ' + feature.description}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl bg-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1 text-sm">{feature.title}</h4>
                  <p className="text-slate-100 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* Call to action at the bottom */}
      <div className="sticky bottom-0 z-10 bg-gradient-to-t from-slate-900/80 to-transparent rounded-b-3xl px-4 pb-6 pt-3 flex flex-col items-center">
        <button className="premium-gradient px-8 py-3 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-purple-400" tabIndex={0} aria-label="Upgrade to NeuroScout Pro">
          Upgrade to NeuroScout Pro
        </button>
        <span className="text-slate-300 text-xs mt-2">Unleash the full potential of AI-powered search</span>
      </div>
    </div>
  );
};

export default FeatureCards;
