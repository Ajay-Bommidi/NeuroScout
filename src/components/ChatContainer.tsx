import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trash2, Wifi, Zap } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import WelcomeScreen from './WelcomeScreen';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isThinking?: boolean;
  provider?: string;
}

interface ChatContainerProps {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  currentProvider?: string;
  onClearMessages?: () => void;
}

const ChatContainer = ({ 
  messages, 
  input, 
  setInput, 
  onSubmit, 
  isLoading, 
  currentProvider,
  onClearMessages 
}: ChatContainerProps) => {
  return (
    <div className="relative flex flex-col flex-1 min-h-[500px] max-h-[70vh] w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
      {/* Provider status and New Chat button */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-700/30 bg-gradient-to-r from-slate-900/60 to-slate-800/60">
        <div className="flex items-center gap-4">
          {currentProvider && (
            <div className="flex items-center gap-2 animate-fade-in-up">
              <Wifi className="w-5 h-5 text-blue-300 animate-pulse" />
              <span className="text-sm font-semibold text-slate-200">
                Powered by <span className="text-blue-400">{currentProvider}</span>
              </span>
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          )}
        </div>
        {onClearMessages && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearMessages}
            className="text-slate-400 hover:text-blue-400 hover:bg-slate-700/60 transition-all duration-300 border border-transparent hover:border-blue-400/30 font-semibold animate-fade-in-up"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        )}
      </div>
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-2 md:px-6 py-4 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
        <div className={`min-h-[300px] flex flex-col justify-${messages.length === 0 ? 'center' : 'start'} h-full`}>
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="space-y-4 animate-fade-in-up">
              <MessageList messages={messages} />
            </div>
          )}
        </div>
      </div>
      {/* Input bar sticky at bottom */}
      <div className="sticky bottom-0 left-0 w-full border-t border-slate-700/30 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-lg z-10">
        <MessageInput
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatContainer; 