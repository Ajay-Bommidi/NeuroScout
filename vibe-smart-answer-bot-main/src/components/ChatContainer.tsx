import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trash2, Wifi, Zap, Download } from 'lucide-react';
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
  onExportChat?: () => void;
  onDeleteChat?: (chatId: string) => void;
}

const ChatContainer = ({ 
  messages, 
  input, 
  setInput, 
  onSubmit, 
  isLoading, 
  currentProvider,
  onClearMessages,
  onExportChat,
  onDeleteChat
}: ChatContainerProps) => {
  const isEmpty = messages.length === 0;
  return (
    <div className="relative flex flex-col flex-1 min-h-0 w-full max-w-2xl mx-auto justify-center">
      {/* Enhanced glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/40 to-cyan-600/30 rounded-3xl blur-2xl animate-pulse"></div>
      <Card className="relative bg-slate-800/95 backdrop-blur-2xl border-slate-700/60 shadow-2xl rounded-3xl overflow-hidden flex flex-col flex-1 min-h-0 w-full justify-center">
        {messages.length > 0 && (
          <div className="flex items-center justify-between p-6 border-b border-slate-700/60 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              {currentProvider && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm animate-pulse"></div>
                    <div className="relative p-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                      <Wifi className="w-5 h-5 text-blue-300" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200">
                      Powered by <span className="text-blue-400">{currentProvider}</span>
                    </span>
                    <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {onExportChat && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExportChat}
                  className="text-slate-400 hover:text-green-400 hover:bg-slate-700/60 transition-all duration-300 border border-transparent hover:border-green-400/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
              {onClearMessages && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearMessages}
                  className="text-slate-400 hover:text-red-400 hover:bg-slate-700/60 transition-all duration-300 border border-transparent hover:border-red-400/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
              )}
            </div>
          </div>
        )}
        {/* Flexible chat area */}
        <div className={`flex-1 min-h-0 flex flex-col ${isEmpty ? 'justify-center items-center' : ''} overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-slate-800/50`}>
          <div className={`w-full flex-1 flex flex-col ${isEmpty ? 'justify-center items-center' : ''} bg-gradient-to-b from-slate-800/60 via-slate-800/40 to-slate-900/60`}>
            {isEmpty ? (
              <div className="flex flex-1 justify-center items-center w-full h-full">
                <WelcomeScreen />
              </div>
            ) : (
              <div className="p-6 flex-1 flex flex-col">
                <MessageList messages={messages} />
              </div>
            )}
          </div>
        </div>
        {/* Enhanced message input - always at the bottom */}
        <div className="border-t border-slate-700/60 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm">
          <MessageInput
            input={input}
            setInput={setInput}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </Card>
    </div>
  );
};

export default ChatContainer;
