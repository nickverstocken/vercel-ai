import { Chat } from '@/components/chat';
import { ChatProvider } from '@/lib/chat/provider';

export const metadata = {
  title: 'Next.js AI Chatbot',
};

export default async function IndexPage() {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );
}
