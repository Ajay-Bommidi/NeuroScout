import { useState, useEffect } from 'react';
import { toast } from '../hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isThinking?: boolean;
  provider?: string;
  searchResults?: any[];
}

interface SearchProvider {
  name: string;
  apiCall: (query: string, apiKey: string) => Promise<string>;
  requiresKey: boolean;
  tier: 'free' | 'premium';
}

const STORAGE_KEY = 'neuroscout_chats';

export const useMultiProviderSearch = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) }));
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string>('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // ... rest of the hook remains unchanged ...

  // At the end, update clearMessages:
  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    messages,
    isLoading,
    currentProvider,
    sendMessage,
    clearMessages,
  };
}; 