export function openAIStreamProcessor(s: string){
  // const processed = s.slice(3, s.length-1);
  const regex = /\d:"([^"]*)"/g
  const extractedTexts = [];
  let match;
  while ((match = regex.exec(s)) !== null) {
    extractedTexts.push(match[1]); // Access the captured group (text after ": ")
  }
  const str = extractedTexts.join('').replaceAll('\\n', '\n');
  console.log(str, str.replaceAll('\\n',  '\n'), str.indexOf('\\n') );

  return str;
}

export async function readStreamAsString(stream: ReadableStream, onChunk: (s: string) => void) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  // Loop to read chunks from the stream
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const decodeString = decoder.decode(value);
    onChunk(openAIStreamProcessor(decodeString));
  }
  // Concatenate all Uint8Array chunks into a single Uint8Array
  // const allBytes = new Uint8Array(length);
  // console.log('length', length);
  // console.log(allBytes.length);
  // let offset = 0;
  // for (const chunk of chunks) {
  //   allBytes.set(chunk, offset);
  //   offset += chunk.length;
  // }

  // // // Decode the Uint8Array as a string (assuming UTF-8 encoding)
  // const decodedString = new TextDecoder().decode(allBytes);
  // onChunk(decodedString)
}