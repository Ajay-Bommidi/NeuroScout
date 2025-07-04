import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isThinking?: boolean;
  provider?: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Group consecutive messages from the same sender
  const groups: { sender: boolean; items: Message[] }[] = [];
  messages.forEach((msg, idx) => {
    if (
      idx === 0 ||
      messages[idx - 1].isUser !== msg.isUser ||
      messages[idx - 1].provider !== msg.provider
    ) {
      groups.push({ sender: msg.isUser, items: [msg] });
    } else {
      groups[groups.length - 1].items.push(msg);
    }
  });

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden" aria-live="polite">
      {groups.map((group, groupIdx) => (
        <div
          key={group.items[0].id}
          className={`w-full animate-fade-in-up`}
          style={{ animationDelay: `${groupIdx * 80}ms` }}
        >
          {group.items.map((message, idx) => (
            <ChatMessage
              key={message.id}
              message={message}
              showAvatar={idx === 0}
            />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
