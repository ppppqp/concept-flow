import { Handle, Position } from "reactflow";
import Tool from "./tool";
import Content from "./content";
export interface NodeData {
  content: string;
  concept: string;
  degree: number;
}

const selector = (state: any) => ({
  setNodeContent: state.setNodeContent,
  addNode: state.addNode,
});


export default function TextNode({ data, id }: { data: NodeData; id: string }) {
  const { content, concept } = data;
  return (
    <div className="min-w-32 max-w-72 pb-2 border rounded-2xl bg-white border-zinc-400 backdrop-blur-sm text-xs bg-[rgba(255, 255, 255, 0.5)]">
      <div>
        <div className={`w-full bg-zinc-100 p-1 pl-2 pr-2 border-b border-zinc-200 rounded-t-2xl`}><h1 className="text-xs bold">{concept}</h1></div>
        <p className="p-2"><Content content={content}/></p>
        <Tool id={id} concept={concept} content={content} />
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />

    </div>
  );
}
