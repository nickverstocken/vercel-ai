import { ChatbotUIContext } from '@/lib/chat/context';
import { useChatHandler } from '@/lib/hooks/use-chat-handler';
import { useContext } from 'react';

const exampleMessages = [
  {
    heading: 'New recipe',
    message: `Can you create me a new recipe?\nI would like it to be a {category ex: tartine} with {protein} and {vegetable}.\nPlease provide the ingredients and the steps to follow.`,
  },
  {
    heading: 'Modify recipe',
    message: 'I would like to modify the recipe {recipe name}.\nCan you help me with that?',
  },
  {
    heading: 'Search for recipe',
    message: `I would like to find a recipe with {ingredient}.\nCan you help me?`,
  },
];

// inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15
export function ExamplePrompts() {
  const { chatMessages, setUserInput } = useContext(ChatbotUIContext);
  return (
    <div className="mb-4 flex gap-2 px-4 sm:px-0">
      {chatMessages.length === 0 &&
        exampleMessages.map((example, index) => (
          <div
            key={example.heading}
            className={`cursor-pointer inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-zinc-500/15 text-zinc-700 group-data-[hover]:bg-zinc-500/25 dark:text-zinc-400 dark:group-data-[hover]:bg-zinc-500/20 ${
              index > 1 && 'hidden md:block'
            }`}
            onClick={async () => {
              setUserInput(example.message);
            }}
          >
            <div className="text-sm">{example.heading}</div>
          </div>
        ))}
    </div>
  );
}
