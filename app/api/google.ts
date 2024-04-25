const GOOGLE_SEARCH_ENDPOINT = 'https://www.googleapis.com/customsearch/v1?';
export interface GoogleRespItem{
  snippet: string;
  url: string;
}
export const queryGoogle = async(query: string) => {
  const key = process.env.GOOGLE_SEARCH_API_KEY!;
  const cx = process.env.GOOGLE_SEARCH_CX!;
  const params = new URLSearchParams();
  params.append('key', key);
  params.append('cx', cx);
  params.append('q', query);
  const res = await fetch(GOOGLE_SEARCH_ENDPOINT + params.toString());
  const bodyJson = await res.json();
  const items = bodyJson.items;
  return items.map((item: any) => ({
    snippet: item.snippet,
    url: item.formattedUrl
  })) as GoogleRespItem[];
}