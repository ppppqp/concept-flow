import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { readStreamAsString } from "@/utils/stream";
import { NodeEvent, NodeEventName } from "../interface";
import { useShallow } from "zustand/react/shallow";
import useStore from "../store";
interface NodeData {
  content: string;
  concept: string;
}
const testQuery = `
I want to be an expert in Elasticsearch.
The response should be a series of phrases that is concatenated by commas. 
Each key concept of Elasticsearch that is important and worth diving into. Just the concept itself is enough: no extra information needed.
The formatting correctness is very important
Give 4 to 8 concepts.
`;
const selector = (state: any) => ({
  setNodeContent: state.setNodeContent,
  addNode: state.addNode,
});

export default function TextNode({ data, id }: { data: NodeData; id: string }) {
  const { content, concept } = data;
  const { setNodeContent, addNode } = useStore(useShallow(selector));
  const makeRegQuery = useCallback(async () => {
    const res = await fetch("/api/rag-query", {
      method: "POST", // Set method to POST
      headers: { "Content-Type": "application/json" }, // Set headers for JSON data
      body: JSON.stringify({ message: testQuery, stream: false }), // Convert data to JSON string
    });
    if (!res.body) {
      return;
    }
    const jsonData = (await res.json()) as any;
    const concepts = jsonData.data.split(",");
    for await (const concept of concepts) {
      await addNode(id, concept);
    }
    // updateContent(id, () => jsonData.data);
    // readStreamAsString(res.body as ReadableStream<any>, (c) => updateContent(id, prevMessage => prevMessage + c));
  }, [id]);

  const addNewNode = useCallback(() => {
    addNode(id);
  }, [id]);
  return (
    <div className="w-32 border rounded-2xl bg-white p-2 border-zinc-300 backdrop-blur-sm text-xs bg-[rgba(255, 255, 255, 0.5)]">
      <div>
        <h1 className="text-xs bold">{concept}</h1>
        <p className="min-h-8">{content}</p>
        <button
          className="rounded bg-slate-100 p-1 text-xs block"
          onClick={makeRegQuery}
        >
          Span
        </button>
        {/* <button
          className="rounded bg-slate-100 p-1 text-xs block"
          onClick={addNewNode}
        >
          Span
        </button> */}
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
