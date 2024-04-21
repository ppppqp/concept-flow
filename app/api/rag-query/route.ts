export const dynamic = 'force-dynamic' // defaults to auto
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai'
export interface RegQueryResp {
  data: {
    message: string;
  }
}
export async function POST(request: Request) {
  // const data = {message: "hello"};
  const { message, stream } = await request.json()
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream,
    messages: [{ role: "user", content: message }]
  });
  if(stream){
    const openAIStream = OpenAIStream(response as any);
    return new StreamingTextResponse(openAIStream);
  } else{
    const responseText = response.choices[0]?.message?.content || ""
    return Response.json({data: responseText })
  }
  // no streaming version

}