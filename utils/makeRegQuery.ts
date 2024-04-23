
export const makeRegQuery = async (query: string, stream: boolean) => {
  const res = await fetch("/api/rag-query", {
    method: "POST", // Set method to POST
    headers: { "Content-Type": "application/json" }, // Set headers for JSON data
    body: JSON.stringify({ message: query, stream }), // Convert data to JSON string
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