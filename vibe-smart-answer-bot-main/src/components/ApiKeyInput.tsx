
import { useState } from 'react';
import { Eye, EyeOff, Key, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyInput = ({ apiKey, setApiKey }: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(!!apiKey);

  if (isCollapsed && apiKey) {
    return (
      <Card className="mb-6 p-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium">API Key Connected</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(false)}
            className="text-green-600 hover:text-green-700"
          >
            Change
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-6 p-6 bg-yellow-50 border-yellow-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-yellow-600" />
          <h3 className="font-semibold text-yellow-800">Perplexity API Key Required</h3>
        </div>
        
        <p className="text-yellow-700 text-sm">
          To use real-time web search, you'll need a Perplexity API key. 
          <a 
            href="https://www.perplexity.ai/settings/api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 ml-1 text-yellow-800 underline hover:text-yellow-900"
          >
            Get your free API key here
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="Enter your Perplexity API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {apiKey && (
            <Button
              onClick={() => setIsCollapsed(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Save
            </Button>
          )}
        </div>

        <div className="text-xs text-yellow-600">
          <p>💡 Your API key is stored locally in your browser and never sent to our servers.</p>
        </div>
      </div>
    </Card>
  );
};

export default ApiKeyInput;
