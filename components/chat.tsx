'use client';

import { cn } from '@/lib/utils';
import { ChatList } from '@/components/chat-list';
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor';
import { ButtonScrollToBottom } from './button-scroll-to-bottom';
import { PromptForm } from './prompt-form';
import { ExamplePrompts } from './example-prompts';

export function Chat({ className }: React.ComponentProps<'div'>) {
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } = useScrollAnchor();

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)} ref={messagesRef}>
        <ChatList />
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
        <ButtonScrollToBottom isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <ExamplePrompts />
          <div className="space-y-4 pt-2 pb-4 shadow-lg sm:rounded-t-xl">
            <PromptForm />
          </div>
        </div>
      </div>
    </div>
  );
}
