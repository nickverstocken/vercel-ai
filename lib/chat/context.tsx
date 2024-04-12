import { Dispatch, SetStateAction, createContext } from 'react';

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id: string;
  name?: string;
};

interface ChatbotUIContext {
  endpoint: string;
  headers?: Record<string, string>;
  chatSessionId: string;
  requestBodyTransform?: (
    sessionId: string,
    currMessage: Message,
    messageList: Message[],
  ) => BodyInit;
  // CHAT STORE
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  chatMessages: Message[];
  setChatMessages: Dispatch<SetStateAction<Message[]>>;
  abortController: AbortController | null;
  setAbortController: Dispatch<SetStateAction<AbortController | null>>;
  firstTokenReceived: boolean;
  setFirstTokenReceived: Dispatch<SetStateAction<boolean>>;
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
}

export const ChatbotUIContext = createContext<ChatbotUIContext>({
  // CHAT STORE
  endpoint: '',
  chatSessionId: '',
  requestBodyTransform: (sessionId, currMessage, messageList) => {
    return JSON.stringify({
      messages: [...messageList, currMessage],
      sessionId: sessionId,
    });
  },
  userInput: '',
  setUserInput: () => {},
  chatMessages: [],
  setChatMessages: () => {},
  isGenerating: false,
  setIsGenerating: () => {},
  firstTokenReceived: false,
  setFirstTokenReceived: () => {},
  abortController: null,
  setAbortController: () => {},
});
