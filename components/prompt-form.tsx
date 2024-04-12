'use client';

import Textarea from 'react-textarea-autosize';

import { Button } from '@/components/ui/button';
import { IconArrowElbow } from '@/components/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { useChatHandler } from '@/lib/hooks/use-chat-handler';
import { ChatbotUIContext } from '@/lib/chat/context';
import { useContext } from 'react';

export function PromptForm() {
  const { formRef, onKeyDown } = useEnterSubmit();
  const { chatInputRef, handleSendMessage, handleStopMessage, handleFocusChatInput } =
    useChatHandler();

  const { userInput, setUserInput, chatMessages, isGenerating } = useContext(ChatbotUIContext);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        // Blur focus on mobile
        if (window.innerWidth < 600) {
          (e.target as any)['message']?.blur();
        }
        handleSendMessage(userInput, chatMessages);
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-8 sm:rounded-md sm:border sm:pr-12">
        <Textarea
          ref={chatInputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={userInput === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
