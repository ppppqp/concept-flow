import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { readStreamAsString } from "@/utils/stream";
interface NodeData {
  content: string
  updateContent: (id: string, setContent: (s: string) => string) => void;
  addNode: (id: string, query: string) => void;
}
const testQuery = `
I want to be an expert in Elasticsearch. Please try your best to organize your answer into the following format:

AAA|BBB|CCC

"AAA" should be replaced by a key concept of Elasticsearch that is important and worth diving into. Just the concept itself is enough.
Give 4 to 8 concepts.
`

export default function TextNode({ data, id}: { data: NodeData, id: string }) {
  const { content, updateContent } = data;
  const makeRegQuery = useCallback(async () => {

    const res = await fetch('/api/rag-query', {
      method: 'POST', // Set method to POST
      headers: { 'Content-Type': 'application/json' }, // Set headers for JSON data
      body: JSON.stringify({message: testQuery, stream: false}), // Convert data to JSON string
    });
    if(!res.body){
      return;
    }
    const jsonData = await res.json() as any;
    // updateContent(id, () => jsonData.data);
    // readStreamAsString(res.body as ReadableStream<any>, (c) => updateContent(id, prevMessage => prevMessage + c));
  }, [id, updateContent])
  return (
    <div className="w-32 border rounded bg-white p-1 border-zinc-600 text-xs">
      <div className=" border-zinc-500">
        <p className="min-h-8">{content}</p>
        <button
          className="rounded bg-slate-100 p-1 text-xs block"
          onClick={makeRegQuery}
        >
          Submit
        </button>
        <button
          className="rounded bg-slate-100 p-1 text-xs block"
          onClick={makeRegQuery}
        >
          Span
        </button>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
