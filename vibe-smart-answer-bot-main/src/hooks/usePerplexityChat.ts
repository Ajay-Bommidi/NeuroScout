
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isThinking?: boolean;
}

export const usePerplexityChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (input: string, apiKey: string) => {
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to start chatting.",
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

    try {
      console.log('Sending request to Perplexity API...');
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are an expert AI assistant. Provide concise, accurate, and professional answers. Use real-time web data when available. Act like an experienced specialist in the query domain. Keep responses focused and user-centric.'
            },
            {
              role: 'user',
              content: input.trim()
            }
          ],
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received response from Perplexity API:', data);

      const aiResponse = data.choices?.[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';

      const responseMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => prev.slice(0, -1).concat(responseMessage));

    } catch (error) {
      console.error('Error calling Perplexity API:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'I apologize, but I encountered an error while processing your request. Please check your API key and try again.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
      
      toast({
        title: "Error",
        description: "Failed to get response. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
