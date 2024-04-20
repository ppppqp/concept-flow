import { RegQueryResp } from "@/app/api/rag-query/route";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

interface NodeData {
  content: string;
  setContent: (s: string) => void;
}


export default function TextNode({ data }: { data: NodeData }) {
  const { content, setContent } = data;
  return (
    <div className="w-32 border rounded bg-white	p-1 border-zinc-600">
      <div className=" border-zinc-500">
        <p className="min-h-8">{content}</p>
        <button
          className="rounded bg-slate-100 p-1 text-xs block"
          onClick={async () => {
            const res = await fetch("/api/rag-query");
            const jsonData = await res.json() as RegQueryResp;
            setContent(jsonData.message);
          }}
        >
          Submit
        </button>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
