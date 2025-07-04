import { User, Bot, Sparkles, Shield, Brain, Zap } from 'lucide-react';
import { Card } from '../components/ui/card';
import ThinkingIndicator from './ThinkingIndicator';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isThinking?: boolean;
  provider?: string;
}

interface ChatMessageProps {
  message: Message;
  showAvatar?: boolean;
}

const providerBadgeClass = (provider?: string) => {
  switch (provider) {
    case 'Tavily':
      return 'premium-badge-tavily';
    case 'Serper':
      return 'premium-badge-serper';
    case 'Perplexity':
      return 'premium-badge-perplexity';
    default:
      return 'premium-gradient';
  }
};

const providerIcon = (provider?: string) => {
  switch (provider) {
    case 'Tavily':
      return <Shield className="w-4 h-4 text-blue-100 mr-1" />;
    case 'Serper':
      return <Zap className="w-4 h-4 text-yellow-100 mr-1" />;
    case 'Perplexity':
      return <Brain className="w-4 h-4 text-purple-100 mr-1" />;
    default:
      return <Sparkles className="w-4 h-4 text-emerald-100 mr-1" />;
  }
};

const ChatMessage = ({ message, showAvatar = true }: ChatMessageProps) => {
  // Placeholder for confetti effect on first AI message
  // useEffect(() => { if (!message.isUser && message.id === 'first-ai') triggerConfetti(); }, []);

  return (
    <div className={`flex gap-4 ${message.isUser ? 'flex-row-reverse' : 'flex-row'} group animate-fade-in-up`}>
      {/* Custom Avatar */}
      {showAvatar && (
        <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg border-2 ${
          message.isUser 
            ? 'bg-gradient-to-br from-pink-500 to-purple-600 border-pink-400' 
            : 'bg-gradient-to-br from-emerald-600 to-cyan-600 border-emerald-400'
        } transition-all duration-200 group-hover:shadow-xl group-hover:scale-105`}>
          {message.isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-white" />
          )}
        </div>
      )}
      {/* Message Bubble */}
      <Card className={`glass max-w-[85%] md:max-w-[75%] p-5 shadow-lg transition-all duration-200 group-hover:shadow-2xl ${
        message.isUser
          ? 'bg-gradient-to-br from-pink-500/90 to-purple-600/90 text-white border-0 rounded-3xl rounded-tr-md'
          : 'bg-gradient-to-br from-emerald-700/80 to-cyan-700/80 border-emerald-400/20 text-white backdrop-blur-md rounded-3xl rounded-tl-md'
      } animate-fade-in-up`}>
        {message.isThinking ? (
          <div className="flex items-center gap-2">
            <ThinkingIndicator />
            <span className="text-emerald-200 font-medium animate-pulse">NeuroScout is thinking...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              {!message.isUser && (
                <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold shadow-md ${providerBadgeClass(message.provider)}`}>
                  {providerIcon(message.provider)}
                  {message.provider || 'NeuroScout'}
                </span>
              )}
              <p className={`${message.isUser ? 'text-white' : 'text-white'} leading-relaxed whitespace-pre-wrap`}>{message.text}</p>
            </div>
            <div className={`flex items-center justify-end text-xs ${
              message.isUser ? 'text-pink-100' : 'text-emerald-200'
            }`}>
              <span className="opacity-70">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatMessage;
