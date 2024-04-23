export const dynamic = 'force-dynamic' // defaults to auto
import { queryGoogle } from "../google";
import { queryOpenAI } from "../openai";
export interface RegQueryResp {
  data: {
    message: string;
  }
}
const querySpan = (concepts: string[]) => `
I want to be an expert in the subject that is related to ${concepts}.
The response should be a series of phrases that is concatenated by commas. 
Each key concept that is important and worth diving into. Just the concept itself is enough: no extra information needed.
The formatting correctness is very important.
You should not include any concepts that already appeared in ${concepts}.
Give 4 to 8 concepts.
`;
export async function POST(request: Request) {
  const { concepts, stream } = await request.json()
  // const googleResp = await queryGoogle(concepts.join(' '), process.env.GOOGLE_SEARCH_API_KEY!, process.env.GOOGLE_SEARCH_CX!);
  return queryOpenAI(querySpan(concepts), stream);
}




