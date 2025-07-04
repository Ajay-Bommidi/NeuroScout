
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

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

export const useMultiProviderSearch = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string>('');

  const providers: SearchProvider[] = [
    {
      name: 'Tavily',
      apiCall: async (query: string, apiKey: string) => {
        const response = await fetch('https://api.tavily.com/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: apiKey,
            query: query,
            search_depth: 'advanced',
            include_answer: true,
            include_domains: [],
            exclude_domains: [],
            max_results: 5,
            include_images: false,
            include_raw_content: false,
            format_output: true
          }),
        });

        if (!response.ok) {
          throw new Error(`Tavily API error: ${response.status}`);
        }

        const data = await response.json();
        return data.answer || 'No answer found from Tavily search.';
      },
      requiresKey: true,
      tier: 'free'
    },
    {
      name: 'Serper',
      apiCall: async (query: string, apiKey: string) => {
        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: query,
            num: 5,
            hl: 'en',
            gl: 'us'
          }),
        });

        if (!response.ok) {
          throw new Error(`Serper API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Process search results into a coherent answer
        const organic = data.organic || [];
        const knowledgeGraph = data.knowledgeGraph;
        
        let answer = '';
        
        if (knowledgeGraph?.description) {
          answer += `${knowledgeGraph.description}\n\n`;
        }
        
        if (organic.length > 0) {
          answer += 'Based on my search, here are the key findings:\n\n';
          organic.slice(0, 3).forEach((result: any, index: number) => {
            answer += `${index + 1}. **${result.title}**: ${result.snippet}\n`;
          });
        }
        
        return answer || 'No relevant information found.';
      },
      requiresKey: true,
      tier: 'free'
    },
    {
      name: 'Perplexity',
      apiCall: async (query: string, apiKey: string) => {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-large-128k-online',
            messages: [
              {
                role: 'system',
                content: 'You are an expert AI assistant with access to real-time web data. Provide comprehensive, accurate, and well-structured answers. Use current information and cite sources when possible.'
              },
              {
                role: 'user',
                content: query
              }
            ],
            temperature: 0.2,
            top_p: 0.9,
            max_tokens: 1500,
            return_images: false,
            return_related_questions: false,
            search_recency_filter: 'month',
            frequency_penalty: 1,
            presence_penalty: 0
          }),
        });

        if (!response.ok) {
          throw new Error(`Perplexity API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'No response from Perplexity.';
      },
      requiresKey: true,
      tier: 'premium'
    }
  ];

  const sendMessage = async (
    input: string, 
    tavilyKey: string, 
    serperKey: string, 
    perplexityKey: string
  ) => {
    if (!input.trim() || isLoading) return;

    // Check if at least one API key is provided
    if (!tavilyKey && !serperKey && !perplexityKey) {
      toast({
        title: "API Key Required",
        description: "Please provide at least one API key to start searching.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      timestamp: new Date(),
      isThinking: true,
    };

    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    setIsLoading(true);

    // Determine available providers based on API keys
    const availableProviders = providers.filter(provider => {
      switch (provider.name) {
        case 'Tavily': return !!tavilyKey;
        case 'Serper': return !!serperKey;
        case 'Perplexity': return !!perplexityKey;
        default: return false;
      }
    });

    if (availableProviders.length === 0) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'No valid API keys found. Please check your configuration.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
      setIsLoading(false);
      return;
    }

    // Try providers in order of preference
    let lastError = '';
    
    for (const provider of availableProviders) {
      try {
        console.log(`Trying ${provider.name} API...`);
        setCurrentProvider(provider.name);
        
        const apiKey = provider.name === 'Tavily' ? tavilyKey : 
                      provider.name === 'Serper' ? serperKey : perplexityKey;
        
        const result = await provider.apiCall(input.trim(), apiKey);
        
        const responseMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: result,
          isUser: false,
          timestamp: new Date(),
          provider: provider.name,
        };

        setMessages(prev => prev.slice(0, -1).concat(responseMessage));
        
        toast({
          title: "Search Complete",
          description: `Results from ${provider.name} API`,
          variant: "default",
        });
        
        setIsLoading(false);
        setCurrentProvider('');
        return;

      } catch (error) {
        console.error(`${provider.name} API failed:`, error);
        lastError = `${provider.name}: ${error}`;
        
        // If this is the last provider, show error
        if (provider === availableProviders[availableProviders.length - 1]) {
          const errorMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: `All search providers failed. Last error: ${lastError}. Please check your API keys and try again.`,
            isUser: false,
            timestamp: new Date(),
          };

          setMessages(prev => prev.slice(0, -1).concat(errorMessage));
          
          toast({
            title: "Search Failed",
            description: "All providers failed. Please check your API keys.",
            variant: "destructive",
          });
        }
      }
    }

    setIsLoading(false);
    setCurrentProvider('');
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    currentProvider,
    sendMessage,
    clearMessages,
  };
};
