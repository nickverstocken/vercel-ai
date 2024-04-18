'use client';

import { ChatbotUIContext, Message } from '@/lib/chat/context';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { nanoid } from 'nanoid';

interface GlobalStateProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<GlobalStateProps> = ({ children }) => {
  const [id] = useLocalStorage('chat-id', nanoid());
  const [userInput, setUserInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  // ACTIVE CHAT STORE
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [firstTokenReceived, setFirstTokenReceived] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const authToken =
    'eyJraWQiOiJoSVlWeVR3dlwvM2d3RkdcL0Z5OHhjNDZwaXo0VDdHeXdFVWZPbGNaTURXblE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIyOWI2YzA0NS0wMjhlLTQwMDYtOTc0ZC1jNTQ0ODQzNGUxOWIiLCJjb2duaXRvOmdyb3VwcyI6WyJscHFvLTAwMDItYWxhaW5haS1IUSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9GbnQ4dWtHZ3ciLCJjbGllbnRfaWQiOiI2cmM0NzM1OWptbGtucTR1bzRtZ3FrdGYyNyIsIm9yaWdpbl9qdGkiOiJlNWUxYzIwYy0zMzMyLTQ4NTYtODEzNy1kNzNiNzhhYzk5MTciLCJldmVudF9pZCI6IjhkYmU0ODg1LTVlMzctNGI5OS1iODVhLTk1YmFmYjcwOWI0NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MTE2MjIwODksImV4cCI6MTcxMzQ0ODE4OSwiaWF0IjoxNzEzNDQ0NTg5LCJqdGkiOiI5OTY4ZmMzMy1jNThiLTQ4MTQtYWRjOS1kOTkzYWI0M2Y5MjQiLCJ1c2VybmFtZSI6IjI5YjZjMDQ1LTAyOGUtNDAwNi05NzRkLWM1NDQ4NDM0ZTE5YiJ9.O1VBnymx5tl1s49t72o5Pn-et6sVpD8NVV9w-kW9ovTJavNxBYWwAwQvzTBvoXQptk3he5Zr1Fdo37ga7-s0pNpiktSURYOL-wcF5OptqnfXujyw3IrS-yvJFXh38oHLaYEhVgJRnkmM7ly6QWT6sJxNPiP4FYoHjYSUbgFvq7nqikbLNy6_UDl7oxaYSQ7kDOxFCg9WkT4QcfFsuHATQHwpv2OnHTms41BbM8mRFCwv1Q2fnWihuntYj6bNmuAiUFbi8EYkUDw9tfPuW1WH9LU0fn1uDrpDUb_G82KE2ZDn3ud0tKQc7yZmaBG2Xj28CIfNEt0Zd_eaQyANk0XcRw';

  return (
    <ChatbotUIContext.Provider
      value={{
        endpoint: 'https://4odzur7qddcrw6xcafdezpvlcq0mxxld.lambda-url.eu-west-1.on.aws/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        requestBodyTransform: (sessionId, currMessage, messageList) => {
          return JSON.stringify({
            messages: [...messageList, currMessage],
            sessionId: sessionId,
          });
        },
        // PASSIVE CHAT STORE
        chatSessionId: id,
        userInput,
        setUserInput,
        chatMessages,
        setChatMessages,
        isGenerating,
        setIsGenerating,
        firstTokenReceived,
        setFirstTokenReceived,
        abortController,
        setAbortController,
      }}
    >
      {children}
    </ChatbotUIContext.Provider>
  );
};
