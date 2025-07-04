import { Send, Search, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useRef, useState } from 'react';

interface MessageInputProps {
  input: string;
  setInput: (input: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MessageInput = ({ input, setInput, onSubmit, isLoading }: MessageInputProps) => {
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    if (!input.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      if (inputRef.current) inputRef.current.focus();
      e.preventDefault();
      return;
    }
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 glass border-t border-slate-700/50 transition-all duration-200 ${shake ? 'animate-shake' : ''}`}>
      <div className="flex gap-4 relative">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NeuroScout anything..."
            disabled={isLoading}
            className="h-14 rounded-2xl border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-2 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 focus:outline-none text-lg px-6 pr-12 backdrop-blur-sm transition-all duration-200"
            aria-label="Chat input"
          />
          <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="h-14 px-8 rounded-2xl premium-btn font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 animate-spin" />
              <span className="hidden sm:inline">Processing...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </div>
          )}
        </Button>
      </div>
      <div className="mt-3 text-xs text-slate-500 text-center">
        Powered by multi-provider AI • Press Enter to send
      </div>
    </form>
  );
};

export default MessageInput;
