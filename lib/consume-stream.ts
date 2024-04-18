import { parseStreamPart } from './streamparts';

// concatenates all the chunks into a single Uint8Array
function concatChunks(chunks: Uint8Array[], totalLength: number) {
  const concatenatedChunks = new Uint8Array(totalLength);

  let offset = 0;
  for (const chunk of chunks) {
    concatenatedChunks.set(chunk, offset);
    offset += chunk.length;
  }
  chunks.length = 0;

  return concatenatedChunks;
}

const NEWLINE = '\n'.charCodeAt(0);

export async function consumeReadableStream(
  stream: ReadableStream<Uint8Array>,
  callback: (chunk: string) => void,
  signal: AbortSignal,
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  const chunks: Uint8Array[] = [];
  let totalLength = 0;

  signal.addEventListener('abort', () => reader.cancel(), { once: true });

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (value) {
        chunks.push(value);
        totalLength += value.length;
        if (value[value.length - 1] !== NEWLINE) {
          // if the last character is not a newline, we have not read the whole JSON value
          continue;
        }
      }

      if (done) {
        break;
      }

      if (value) {
        const concatenatedChunks = concatChunks(chunks, totalLength);
        totalLength = 0;

        const streamParts = decoder
          .decode(concatenatedChunks, { stream: true })
          .split('\n')
          .filter((line) => line !== '')
          .map(parseStreamPart)
          .filter(Boolean);
        for (const streamPart of streamParts) {
          if (streamPart.type === 'tool_calls') {
            callback(`tool_call:\n: \`\`\`${JSON.stringify(streamPart.value, null, 2)}\`\`\``);
          } else {
            callback(streamPart.value.toString());
          }
        }
      }
    }
  } catch (error) {
    if (signal.aborted) {
      console.error('Stream reading was aborted:', error);
    } else {
      console.error('Error consuming stream:', error);
    }
  } finally {
    reader.releaseLock();
  }
}
