import { ChatMessage } from './chat-message';
import { useContext } from 'react';
import { ChatbotUIContext } from '@/lib/chat/context';
import { EmptyScreen } from './empty-screen';

interface ChatListType {}

export function ChatList({}: ChatListType) {
  const { chatMessages, isGenerating } = useContext(ChatbotUIContext);
  if (!chatMessages.length) {
    return <EmptyScreen />;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 flex flex-col gap-8">
      {chatMessages.map((message, index) => (
        <div key={message.id}>
          <ChatMessage message={message} isLoading={!message.content} />
          {/* {isLoading && <ChatMessage message={message} isLoading />} */}
        </div>
      ))}
    </div>
  );
}
