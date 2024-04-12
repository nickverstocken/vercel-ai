'use client';

import { IconOpenAI, IconUser } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { spinner } from './spinner';
import { MessageMarkdown } from './message-markdown';

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        <div className="font-bold mb-1">You</div>
        {children}
      </div>
    </div>
  );
}

export function BotMessage({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <div className="font-bold mb-1">Alain.AI</div>

        <MessageMarkdown content={content} />
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
          !showAvatar && 'invisible',
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className={'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'}>
      <div className={'max-w-[600px] flex-initial p-2'}>system: {children}</div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className={cn('group relative flex items-start md:-ml-12')}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <div className="font-bold mb-1">Alain.AI</div>
        <div>{spinner}</div>
      </div>
    </div>
  );
}
