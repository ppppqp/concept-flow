export const enum Endpoints{
  SPARK = '/api/rag-query-spark',
  SPAN = '/api/rag-query-span'
}

// TODO: expose it to server side
interface SpanQuery{
  concepts: string[];
}

interface SparkQuery{
  concepts: string[];
}

type QueryParam = SpanQuery | SparkQuery;

export const makeQuery = async (endpoint: string, query: Record<string, any>, stream: boolean) => {
  const res = await fetch(endpoint, {
    method: "POST", // Set method to POST
    headers: { "Content-Type": "application/json" }, // Set headers for JSON data
    body: JSON.stringify({ ...query, stream }), // Convert data to JSON string
  });
  if (!res.body) {
    return;
  }
  if (stream) {
    return res.body;
  } else {
    const jsonData = (await res.json()) as any;
    return jsonData.data;
  }
  // updateContent(id, () => jsonData.data);
  // readStreamAsString(res.body as ReadableStream<any>, (c) => updateContent(id, prevMessage => prevMessage + c));
}

export const makeRegQuery = async (endpoint: Endpoints, query: QueryParam, stream: boolean) => {
  return await makeQuery(endpoint, query, stream);
}