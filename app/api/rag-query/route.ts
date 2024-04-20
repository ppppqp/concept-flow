export const dynamic = 'force-dynamic' // defaults to auto


export interface RegQueryResp {
  message: string
}
export async function GET(request: Request) {
  const data = {message: "hello"} as RegQueryResp;
 
  return Response.json({ data })
}