import React, { useState, useEffect } from 'react';
import { Plus, Settings, MessageSquare, Sparkles, Zap, Brain, Search, Shield, Sun, Moon, Download, Menu, X } from 'lucide-react';
import MultiApiKeyInput from '@/components/MultiApiKeyInput';
import ChatContainer from '@/components/ChatContainer';
import BrandFooter from '@/components/BrandFooter';
import { useMultiProviderSearch } from '@/hooks/useMultiProviderSearch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FeatureCards from '@/components/FeatureCards';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import confetti from 'canvas-confetti';
import MessageInput from '@/components/MessageInput';

const Sidebar = ({ open, onClose, tavilyKey, setTavilyKey, serperKey, setSerperKey, perplexityKey, setPerplexityKey, showApiSetup, setShowApiSetup, recentChats = [], onNewChat, handleLoadChat }) => (
  <>
    {/* Overlay for mobile/desktop */}
    {open && (
      <div className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300" onClick={onClose}></div>
    )}
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
            {Array.isArray(recentChats) && recentChats.length === 0 && <li>No recent chats</li>}
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentChats, setRecentChats] = useState(() => {
    const saved = localStorage.getItem('neuroscout_chats_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeChatId, setActiveChatId] = useState(null);
  const [featureCardsOpen, setFeatureCardsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'dark';
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState<'export' | 'delete' | null>(null);
  const [confirmChatId, setConfirmChatId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isFirstChatOrExport, setIsFirstChatOrExport] = useState(true);

  const {
    messages,
    isLoading,
    currentProvider,
    sendMessage,
    clearMessages
  } = useMultiProviderSearch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // Floating New Chat button handler
  const handleFloatingNewChat = () => {
    // handleNewChat(); // removed, not in hook
    setActiveChatId(null);
    setInput('');
  };

  // Export chat as JSON (with modal)
  const handleExportChat = () => {
    const chatData = { messages, provider: currentProvider };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neuroscout-chat.json';
    a.click();
    URL.revokeObjectURL(url);
    setShowConfirmModal(false);
    setConfirmType(null);
    if (isFirstChatOrExport) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 }
      });
    }
    setIsFirstChatOrExport(false);
  };

  // Delete chat from history (with modal)
  const handleDeleteChat = (chatId) => {
    const updated = recentChats.filter((chat) => chat.id !== chatId);
    setRecentChats(updated);
    localStorage.setItem('neuroscout_chats_history', JSON.stringify(updated));
    if (activeChatId === chatId) {
      // handleNewChat(); // removed, not in hook
      setActiveChatId(null);
    }
    setShowConfirmModal(false);
    setConfirmType(null);
  };

  // Save chat to localStorage on every message change
  useEffect(() => {
    if (messages.length > 0) {
      const title = messages[0]?.text?.slice(0, 32) || 'New Chat';
      const chatId = activeChatId || Date.now().toString();
      const chatObj = { id: chatId, title, messages, timestamp: new Date().toLocaleString() };
      let updated = recentChats.filter((c) => c.id !== chatId);
      updated = [chatObj, ...updated].slice(0, 20); // keep max 20
      setRecentChats(updated);
      localStorage.setItem('neuroscout_chats_history', JSON.stringify(updated));
      setActiveChatId(chatId);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input, tavilyKey, serperKey, perplexityKey);
    setInput('');
  };

  const hasAnyKey = tavilyKey || serperKey || perplexityKey;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#181c2a] via-[#232a45] to-[#1a1f33] px-2 md:px-0">
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
        onNewChat={handleFloatingNewChat}
        handleLoadChat={(id) => {
          setActiveChatId(id);
          // handleLoadChat(id); // removed, not in hook
        }}
      />
      {/* Main content - premium flexible card */}
      <main className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 p-0 md:p-4 mx-auto overflow-hidden" role="main">
        {/* Top bar with menu button */}
        <div className="flex items-center px-4 py-3 md:px-8">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar" tabIndex={0} className="hover:bg-slate-800 transition-all focus:ring-2 focus:ring-purple-400">
            <Menu className="w-7 h-7 text-slate-300" />
          </Button>
          {/* Dark/Light mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-2 hover:bg-slate-800 transition-all focus:ring-2 focus:ring-purple-400"
            tabIndex={0}
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6 text-yellow-300 transition-all duration-300 rotate-0 scale-100" />
            ) : (
              <Moon className="w-6 h-6 text-blue-400 transition-all duration-300 rotate-180 scale-110" />
            )}
          </Button>
          {/* FeatureCards toggle button (desktop only) */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-4 text-slate-400 hover:text-purple-400 transition-all focus:ring-2 focus:ring-purple-400"
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setFeatureCardsOpen((v) => !v);
                  setIsAnimating(false);
                }, 350);
              }}
              aria-label={featureCardsOpen ? 'Hide features' : 'Show features'}
              tabIndex={0}
            >
              {featureCardsOpen ? 'Hide Features' : 'Show Features'}
            </Button>
          )}
          {/* Settings button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
            className="ml-2 hover:bg-slate-800 transition-all focus:ring-2 focus:ring-purple-400"
            tabIndex={0}
          >
            <Settings className="w-6 h-6 text-slate-300" />
          </Button>
        </div>
        {/* Feature cards section (collapsible/hidden on mobile, does not push chat down) */}
        <div className="w-full flex justify-center">
          <div className={`max-w-4xl w-full px-4 py-4 transition-all duration-300 ${featureCardsOpen && !isMobile ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'} ${isAnimating ? 'animate-fade-in-up' : ''}`}
            style={{ minHeight: featureCardsOpen && !isMobile ? 'auto' : 0 }}
          >
            {featureCardsOpen && !isMobile && <FeatureCards />}
          </div>
        </div>
        {/* Chat area: always flexible, fills card, only history scrolls */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full overflow-hidden" aria-live="polite">
          <div className="w-full flex-1 min-h-0 flex flex-col justify-center">
            <Card className="animate-fade-in-up transition-transform duration-150 hover:scale-[1.02] active:scale-95 flex flex-col flex-1 min-h-0">
              <div className="flex flex-col flex-1 min-h-0">
                <ChatContainer
                  messages={messages}
                  input={input}
                  setInput={setInput}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  currentProvider={currentProvider}
                  onClearMessages={clearMessages}
                  onExportChat={() => {
                    setConfirmType('export');
                    setShowConfirmModal(true);
                  }}
                  onDeleteChat={(chatId) => {
                    setConfirmType('delete');
                    setConfirmChatId(chatId);
                    setShowConfirmModal(true);
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
        {/* Floating New Chat button - premium, animated, accessible, never overlaps content */}
        <div className="fixed bottom-8 right-8 z-50 group">
          <button
            className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-400 p-1 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/40 transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={handleFloatingNewChat}
            aria-label="New Chat"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleFloatingNewChat(); }}
          >
            {/* Glassy inner circle with animated gradient border */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/60 via-blue-400/60 to-cyan-300/60 blur-md animate-[spin_6s_linear_infinite]" aria-hidden="true"></span>
            <span className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full glass backdrop-blur-md border border-white/10">
              <Plus className="w-7 h-7 text-white drop-shadow-lg" />
            </span>
          </button>
          {/* Tooltip */}
          <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-medium opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg select-none">
            New Chat
          </span>
        </div>
      </main>
      {/* Confirmation Modal for Export/Delete */}
      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent className="glass bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-white/10 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmType === 'delete' ? 'Delete Chat?' : 'Export Chat?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmType === 'delete'
                ? 'Are you sure you want to delete this chat? This action cannot be undone.'
                : 'Do you want to export this chat as a JSON file?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="focus:ring-2 focus:ring-purple-400">Cancel</AlertDialogCancel>
            {confirmType === 'delete' ? (
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-400"
                onClick={() => handleDeleteChat(confirmChatId)}
              >
                Delete
              </AlertDialogAction>
            ) : (
              <AlertDialogAction
                className="premium-gradient text-white focus:ring-2 focus:ring-blue-400"
                onClick={handleExportChat}
              >
                Export
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="glass bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your preferences and API keys</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">API Keys</h4>
              <MultiApiKeyInput
                tavilyKey={tavilyKey}
                setTavilyKey={setTavilyKey}
                serperKey={serperKey}
                setSerperKey={setSerperKey}
                perplexityKey={perplexityKey}
                setPerplexityKey={setPerplexityKey}
              />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Theme</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="hover:bg-slate-800 transition-all focus:ring-2 focus:ring-purple-400"
                tabIndex={0}
              >
                {theme === 'dark' ? (
                  <Sun className="w-6 h-6 text-yellow-300 transition-all duration-300 rotate-0 scale-100" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-400 transition-all duration-300 rotate-180 scale-110" />
                )}
              </Button>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-slate-400">
            NeuroScout v1.0 • Built with ❤️ by Ajay Bommidi
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
