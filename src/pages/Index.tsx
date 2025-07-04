import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Brain, Search, Shield, MessageSquare, Settings, Plus, Sun, Moon, Download, Menu, X } from 'lucide-react';
import MultiApiKeyInput from '../components/MultiApiKeyInput';
import ChatContainer from '../components/ChatContainer';
import { useMultiProviderSearch } from '../hooks/useMultiProviderSearch';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Sidebar placeholder (to be implemented in a follow-up step)
const Sidebar = ({ open, onClose, tavilyKey, setTavilyKey, serperKey, setSerperKey, perplexityKey, setPerplexityKey, showApiSetup, setShowApiSetup, recentChats, onNewChat, handleLoadChat }) => (
  <>
    {/* Overlay for mobile */}
    <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
    {/* Sidebar */}
    <aside className={`fixed top-0 left-0 h-full w-80 max-w-full glass shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} flex flex-col`}> 
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <span className="text-lg font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-400" /> NeuroScout</span>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sidebar" className="hover:bg-slate-800 transition-all"><X className="w-6 h-6 text-slate-400" /></Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <Button className="w-full premium-btn mb-4" onClick={onNewChat}><Plus className="w-4 h-4 mr-2" /> New Chat</Button>
        </div>
        <div>
          <h4 className="text-slate-300 font-semibold mb-2">Recent Chats</h4>
          <ul className="space-y-2">
            {recentChats.length === 0 && <li className="text-slate-500 text-sm">No recent chats</li>}
            {recentChats.map((chat) => (
              <li key={chat.id} className="bg-slate-800/80 rounded-lg px-3 py-2 text-slate-200 text-sm cursor-pointer hover:bg-slate-700/80 transition-all duration-200 flex items-center gap-2" onClick={() => handleLoadChat(chat.id)}>
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="font-semibold flex-1 truncate">{chat.title || `Chat #${chat.id}`}</span>
                <span className="block text-xs text-slate-400">{chat.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-slate-300 font-semibold mb-2">API Keys</h4>
          <MultiApiKeyInput
            tavilyKey={tavilyKey}
            setTavilyKey={setTavilyKey}
            serperKey={serperKey}
            setSerperKey={setSerperKey}
            perplexityKey={perplexityKey}
            setPerplexityKey={setPerplexityKey}
          />
        </div>
      </div>
      <div className="p-4 border-t border-slate-700 text-center text-xs text-slate-500">Developed by <span className="text-blue-400 font-bold">Ajay Bommidi</span></div>
    </aside>
  </>
);

const Index = () => {
  const [input, setInput] = useState('');
  const [tavilyKey, setTavilyKey] = useState('');
  const [serperKey, setSerperKey] = useState('');
  const [perplexityKey, setPerplexityKey] = useState('');
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [theme, setTheme] = useState('system');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, isLoading, currentProvider, sendMessage, clearMessages } = useMultiProviderSearch();
  const [currentChatId, setCurrentChatId] = useState(() => Date.now());
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem('neuroscout_chats_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Save current chat to localStorage on messages change
  useEffect(() => {
    localStorage.setItem('neuroscout_chats_current', JSON.stringify(messages));
    if (messages.length > 0) {
      localStorage.setItem(`neuroscout_chat_${currentChatId}`, JSON.stringify(messages));
    }
  }, [messages, currentChatId]);

  // Save new chat to history
  const handleNewChat = () => {
    if (messages.length > 0) {
      const newHistory = [
        {
          id: currentChatId,
          title: messages[0]?.text?.slice(0, 30) || 'New Chat',
          timestamp: new Date().toLocaleString(),
        },
        ...recentChats.filter(chat => chat.id !== currentChatId).slice(0, 9), // keep last 10, no duplicates
      ];
      setRecentChats(newHistory);
      localStorage.setItem('neuroscout_chats_history', JSON.stringify(newHistory));
      localStorage.setItem(`neuroscout_chat_${currentChatId}`, JSON.stringify(messages));
    }
    setMessages([]);
    setCurrentChatId(Date.now());
    setSidebarOpen(false);
  };

  // Load a recent chat
  const handleLoadChat = (chatId) => {
    const chatMessages = localStorage.getItem(`neuroscout_chat_${chatId}`);
    if (chatMessages) {
      setMessages(JSON.parse(chatMessages));
      setCurrentChatId(chatId);
      setSidebarOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input, tavilyKey, serperKey, perplexityKey);
    setInput('');
  };

  const hasAnyKey = tavilyKey || serperKey || perplexityKey;

  // Theme switcher logic
  React.useEffect(() => {
    if (theme === 'system') {
      document.documentElement.classList.remove('dark', 'light');
    } else {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  // Chat export logic
  const handleExport = () => {
    const text = messages.map(m => `${m.isUser ? 'You' : (m.provider || 'AI')}: ${m.text}\n`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neuroscout-chat.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-screen w-full bg-gradient-to-br from-[#181c2a] via-[#232a45] to-[#1a1f33] relative">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        tavilyKey={tavilyKey}
        setTavilyKey={setTavilyKey}
        serperKey={serperKey}
        setSerperKey={setSerperKey}
        perplexityKey={perplexityKey}
        setPerplexityKey={setPerplexityKey}
        showApiSetup={showApiSetup}
        setShowApiSetup={setShowApiSetup}
        recentChats={recentChats}
        onNewChat={handleNewChat}
        handleLoadChat={handleLoadChat}
      />
      {/* Main content */}
      <div className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${sidebarOpen ? 'md:ml-80' : ''}`}>
        {/* Top bar with menu button */}
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar" className="md:hidden hover:bg-slate-800 transition-all">
            <Menu className="w-7 h-7 text-slate-300" />
          </Button>
          <div className="flex gap-3 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Switch to light mode"
              className={theme === 'light' ? 'bg-yellow-100 text-yellow-600' : 'text-slate-400'}
              onClick={() => setTheme('light')}
            >
              <Sun className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Switch to dark mode"
              className={theme === 'dark' ? 'bg-slate-900 text-blue-400' : 'text-slate-400'}
              onClick={() => setTheme('dark')}
            >
              <Moon className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Use system theme"
              className={theme === 'system' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-slate-400'}
              onClick={() => setTheme('system')}
            >
              <Sparkles className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Export chat"
              className="text-blue-400 hover:bg-blue-50"
              onClick={handleExport}
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* Header */}
        <header className="w-full max-w-2xl mx-auto px-4 pt-8 flex flex-col items-center z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">NeuroScout</h1>
          </div>
          <div className="flex gap-2 mb-2">
            <Badge className="bg-green-600/90 text-white text-xs px-3 py-1 rounded-full">AI Powered</Badge>
            <Badge className="bg-blue-900/80 text-blue-200 text-xs px-3 py-1 rounded-full">Next-Gen Intelligence</Badge>
          </div>
          <p className="text-center text-lg text-slate-200 font-medium mb-6 max-w-xl">
            Experience the <span className="text-blue-400 font-bold">future of AI search</span> with <span className="text-purple-400 font-bold">multi-provider intelligence</span> and real-time web access
          </p>
        </header>
        {/* Features */}
        <section className="w-full max-w-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 z-10">
          <Card className="bg-gradient-to-br from-purple-800/40 to-indigo-800/40 border-0 shadow-xl p-6 flex flex-col items-center text-center animate-fade-in-up">
            <Zap className="w-7 h-7 text-purple-300 mb-2 animate-pulse" />
            <h3 className="font-bold text-white mb-1">Lightning Speed</h3>
            <p className="text-slate-300 text-sm">Sub-second AI responses with optimized architecture</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-800/40 to-cyan-800/40 border-0 shadow-xl p-6 flex flex-col items-center text-center animate-fade-in-up delay-100">
            <Shield className="w-7 h-7 text-blue-300 mb-2 animate-pulse" />
            <h3 className="font-bold text-white mb-1">Smart Failover</h3>
            <p className="text-slate-300 text-sm">Intelligent provider switching for maximum reliability</p>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-800/40 to-blue-900/40 border-0 shadow-xl p-6 flex flex-col items-center text-center animate-fade-in-up delay-200">
            <Brain className="w-7 h-7 text-cyan-300 mb-2 animate-pulse" />
            <h3 className="font-bold text-white mb-1">Real-time Intelligence</h3>
            <p className="text-slate-300 text-sm">Live data synthesis from global internet sources</p>
          </Card>
        </section>
        {/* Chat Area - Full Height, Flexible */}
        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <ChatContainer
              messages={messages}
              input={input}
              setInput={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              currentProvider={currentProvider}
              onClearMessages={clearMessages}
            />
          </div>
        </main>
        {/* Footer */}
        <footer className="w-full flex flex-col items-center justify-center py-4 mt-8 z-10">
          <div className="flex items-center gap-2 text-slate-400 text-sm animate-fade-in-up">
            <span>Developed by</span>
            <span className="font-bold text-blue-400 animate-pulse">Ajay Bommidi</span>
            <span className="text-xs">© {new Date().getFullYear()}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Powered by multi-provider AI • Press Enter to send</div>
        </footer>
      </div>
    </div>
  );
};

export default Index; 