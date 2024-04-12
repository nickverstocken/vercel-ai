// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { BotCard, BotMessage, SpinnerMessage, SystemMessage, UserMessage } from './stocks/message';
import { Message } from '@/lib/chat/context';

export interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading, ...props }: ChatMessageProps) {
  if (isLoading) {
    return <SpinnerMessage />;
  }
  if (message.role === 'user') {
    return <UserMessage>{message.content}</UserMessage>;
  }
  if (message.role === 'assistant') {
    return <BotMessage content={message.content} />;
  }
  if (message.role === 'system') {
    return <SystemMessage>{message.content}</SystemMessage>;
  }

  if (message.role === 'function') {
    return <BotCard>{message.content}</BotCard>;
  }
}
