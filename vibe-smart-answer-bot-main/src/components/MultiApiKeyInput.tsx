
import { useState } from 'react';
import { Eye, EyeOff, Key, ExternalLink, Settings, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface MultiApiKeyInputProps {
  tavilyKey: string;
  setTavilyKey: (key: string) => void;
  serperKey: string;
  setSerperKey: (key: string) => void;
  perplexityKey: string;
  setPerplexityKey: (key: string) => void;
}

const MultiApiKeyInput = ({ 
  tavilyKey, setTavilyKey, 
  serperKey, setSerperKey, 
  perplexityKey, setPerplexityKey 
}: MultiApiKeyInputProps) => {
  const [showKeys, setShowKeys] = useState<{[key: string]: boolean}>({});
  const [isCollapsed, setIsCollapsed] = useState(
    !!(tavilyKey || serperKey || perplexityKey)
  );

  const toggleKeyVisibility = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  const hasAnyKey = tavilyKey || serperKey || perplexityKey;
  const keyCount = [tavilyKey, serperKey, perplexityKey].filter(Boolean).length;

  if (isCollapsed && hasAnyKey) {
    return (
      <Card className="mb-6 p-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="w-4 h-4 text-green-600" />
            <div>
              <span className="text-green-700 font-medium">
                {keyCount} API Key{keyCount > 1 ? 's' : ''} Connected
              </span>
              <div className="flex gap-2 mt-1">
                {tavilyKey && <Badge variant="secondary" className="text-xs">Tavily</Badge>}
                {serperKey && <Badge variant="secondary" className="text-xs">Serper</Badge>}
                {perplexityKey && <Badge variant="secondary" className="text-xs">Perplexity</Badge>}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(false)}
            className="text-green-600 hover:text-green-700"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-6 p-6 bg-blue-50 border-blue-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">Multi-Provider Search Setup</h3>
        </div>
        
        <p className="text-blue-700 text-sm">
          Configure your preferred search providers. The system will automatically failover between providers for maximum reliability.
        </p>

        <Tabs defaultValue="tavily" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tavily" className="flex items-center gap-2">
              Tavily
              {tavilyKey && <Check className="w-3 h-3 text-green-600" />}
            </TabsTrigger>
            <TabsTrigger value="serper" className="flex items-center gap-2">
              Serper
              {serperKey && <Check className="w-3 h-3 text-green-600" />}
            </TabsTrigger>
            <TabsTrigger value="perplexity" className="flex items-center gap-2">
              Perplexity
              {perplexityKey && <Check className="w-3 h-3 text-green-600" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tavily" className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-800">Tavily API (Primary)</h4>
                <p className="text-sm text-blue-600">Real-time web search with AI-powered answers</p>
              </div>
              <Badge variant="secondary">Free Tier</Badge>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showKeys['tavily'] ? 'text' : 'password'}
                  placeholder="Enter your Tavily API key..."
                  value={tavilyKey}
                  onChange={(e) => setTavilyKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => toggleKeyVisibility('tavily')}
                >
                  {showKeys['tavily'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <a 
                href="https://app.tavily.com/sign-up" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
              >
                Get Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </TabsContent>

          <TabsContent value="serper" className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-800">Serper API (Backup)</h4>
                <p className="text-sm text-blue-600">Google search results with structured data</p>
              </div>
              <Badge variant="secondary">Free Tier</Badge>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showKeys['serper'] ? 'text' : 'password'}
                  placeholder="Enter your Serper API key..."
                  value={serperKey}
                  onChange={(e) => setSerperKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => toggleKeyVisibility('serper')}
                >
                  {showKeys['serper'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <a 
                href="https://serper.dev/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
              >
                Get Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </TabsContent>

          <TabsContent value="perplexity" className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-800">Perplexity API (Premium)</h4>
                <p className="text-sm text-blue-600">Advanced AI search with citations</p>
              </div>
              <Badge variant="outline" className="text-purple-600 border-purple-300">Premium</Badge>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showKeys['perplexity'] ? 'text' : 'password'}
                  placeholder="Enter your Perplexity API key..."
                  value={perplexityKey}
                  onChange={(e) => setPerplexityKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => toggleKeyVisibility('perplexity')}
                >
                  {showKeys['perplexity'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <a 
                href="https://www.perplexity.ai/settings/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
              >
                Get Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </TabsContent>
        </Tabs>

        {hasAnyKey && (
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-xs text-blue-600">
              <p>💡 Keys are stored locally and never sent to our servers.</p>
            </div>
            <Button
              onClick={() => setIsCollapsed(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Save Configuration
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MultiApiKeyInput;
