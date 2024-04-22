import { Handle, Position } from "reactflow";
import Tool from "./tool";
import Content from "./content";
import Concepts from "./concepts";

export interface NodeData {
  content: string;
  concepts: string[];
  degree: number;
}


export default function TextNode({ data, id }: { data: NodeData; id: string }) {
  const { content, concepts } = data;
  return (
    <div className="text-sm min-w-64 max-w-96 pb-4 border rounded-xl bg-white border-zinc-400 backdrop-blur-sm bg-[rgba(255, 255, 255, 0.5)]">
      <div>
        <div className={`w-full bg-zinc-100 p-1 pl-2 pr-2 border-b border-zinc-200 rounded-t-xl`}><Concepts concepts={concepts}/></div>
        <p className="p-2"><Content content={content}/></p>
        <Tool id={id} concepts={concepts} content={content} />
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />

    </div>
  );
}
