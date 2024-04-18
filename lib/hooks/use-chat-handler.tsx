import { useContext, useEffect, useRef } from 'react';
import { ChatbotUIContext, Message } from '../chat/context';
import { nanoid } from 'nanoid';
import { consumeReadableStream } from '../consume-stream';

export const createTempMessages = (
  messageContent: string,
  chatMessages: Message[],
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
  const tempUserChatMessage: Message = {
    id: nanoid(),
    content: messageContent,
    role: 'user',
  };

  const tempAssistantChatMessage: Message = {
    id: nanoid(),
    role: 'assistant',
    content: '',
  };

  let newMessages = [];

  newMessages = [...chatMessages, tempUserChatMessage, tempAssistantChatMessage];

  setChatMessages(newMessages);

  return {
    tempUserChatMessage,
    tempAssistantChatMessage,
  };
};

export const processResponse = async (
  response: Response,
  lastChatMessage: Message,
  controller: AbortController,
  setFirstTokenReceived: React.Dispatch<React.SetStateAction<boolean>>,
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
  let fullText = '';

  if (response.body) {
    await consumeReadableStream(
      response.body,
      (chunk) => {
        setFirstTokenReceived(true);
        try {
          console.log(chunk);
          fullText += chunk;
        } catch (error) {
          console.error('Error parsing chunk:', error);
        }

        setChatMessages((prev) =>
          prev.map((chatMessage) => {
            if (chatMessage.id === lastChatMessage.id) {
              const updatedChatMessage: Message = {
                ...chatMessage,
                content: fullText,
              };
              return updatedChatMessage;
            }
            return chatMessage;
          }),
        );
      },
      controller.signal,
    );

    return fullText;
  } else {
    throw new Error('Response body is null');
  }
};

export const useChatHandler = () => {
  const {
    endpoint,
    headers,
    chatSessionId,
    setUserInput,
    setIsGenerating,
    setChatMessages,
    setFirstTokenReceived,
    requestBodyTransform,
    abortController,
    setAbortController,
  } = useContext(ChatbotUIContext);

  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatInputRef.current?.focus();
  }, []);

  const handleFocusChatInput = () => {
    chatInputRef.current?.focus();
  };

  const handleStopMessage = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  const handleSendMessage = async (messageContent: string, chatMessages: Message[]) => {
    const startingInput = messageContent;
    const { tempUserChatMessage, tempAssistantChatMessage } = createTempMessages(
      messageContent,
      chatMessages,
      setChatMessages,
    );
    try {
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      setIsGenerating(true);
      setUserInput('');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: requestBodyTransform?.(chatSessionId, tempUserChatMessage, chatMessages),
      });
      let generatedText = '';

      generatedText = await processResponse(
        response,
        tempAssistantChatMessage,
        newAbortController,
        setFirstTokenReceived,
        setChatMessages,
      );

      setIsGenerating(false);
      setFirstTokenReceived(false);
      setUserInput('');
    } catch (error) {
      setIsGenerating(false);
      setFirstTokenReceived(false);
      setUserInput(startingInput);
    }
  };

  return {
    chatInputRef,
    handleSendMessage,
    handleFocusChatInput,
    handleStopMessage,
  };
};
