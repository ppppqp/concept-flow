export const dynamic = 'force-dynamic' // defaults to auto
import { queryOpenAI } from "../openai";
import { queryGoogle, GoogleRespItem } from "../google";
export interface RegQueryResp {
  data: {
    message: string;
  }
}
const querySpark = (concepts: string[], googleResp: GoogleRespItem[]) => {
  const citations = googleResp.map((item, index) => `[citation${index}: ${item.url}] ${item.snippet}`).join('\n');
  return `
I want to be an expert int the subject that is related to ${concepts}. 
Please explain the subject to me. Be sure to address and cover all concepts including ${concepts}.
For all concepts in ${concepts}, the more latter one is more important, and should be addressed primarily in your explanation. 
The more former one mostly provides a scope and context for the latter ones, so you do not need to give any explanation to them.
Please include contents from the following references:
${citations}

Answer in markdown syntax.
If you have used the references in response, please quote the reference using markdown hyperlink syntax, i.e [referenced material](url)
Make sure to include the url in the parenthesis to make the link accessible.
`;
}

export async function POST(request: Request) {
  const { concepts, stream } = await request.json();
  const googleResp = await queryGoogle(concepts.join(' '));
  return queryOpenAI(querySpark(concepts, googleResp), stream);
}
