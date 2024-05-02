import useStore from "@/store/graph-store";
import { useCallback } from "react";
import { Node } from "reactflow";
import { useShallow } from "zustand/react/shallow";
const selector = (state: any) => ({
  nodes: state.nodes,
  setNodes: state.setNodes,
});
export default function Concepts({id, concepts }: {id: string, concepts: string[] }) {
  const { nodes, setNodes } = useStore(useShallow(selector));
  const setConcept = useCallback((concept: string)=>{
    const newNodes = [...nodes];
    const node = newNodes.find((n: Node) => n.id === id);
    if(node){
      node.data.concepts[node.data.concepts.length - 1] = concept;
    }
    setNodes(newNodes);
  }, [nodes, setNodes, id]);
  return (
    <div className="flex justify-start items-center gap-0.5 select-text">
      <input
        onChange={(e) => {
          setConcept(e.target.value);
        }}
        defaultValue={concepts.at(-1)}
        className="rounded px-1 text-center border border-transparent flex-wrap text-zinc-700 bg-transparent focus:outline-none focus:border focus:border-zinc-300 focus:bg-zinc-50"
      ></input>
    </div>
  );
}
