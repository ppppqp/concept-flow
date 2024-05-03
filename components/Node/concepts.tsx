import useStore from "@/store/graph-store";
import { useCallback, useMemo, useState } from "react";
import useUIStore from "@/store/ui-store";
import { Node } from '@/types/node';
import { useShallow } from "zustand/react/shallow";
const selector = (state: any) => ({
  sessionId: state.sessionId,
  nodes: state.nodes,
  setNodes: state.setNodes,
});
export default function Concepts({
  id,
  concept,
}: {
  id: string;
  concept: string;
}) {
  const { nodes, setNodes } = useStore(useShallow(selector));
  const setConcept = useCallback(
    (concept: string) => {
      const newNodes = [...nodes];
      const node = newNodes.find((n: Node) => n.id === id);
      if (node) {
        node.data.concept = concept;
      }
      setNodes(newNodes);
    },
    [nodes, setNodes, id]
  );

  return (
    <div className="flex justify-start items-center gap-0.5 select-text">
      <input
        value={concept}
        onChange={(e) => {
          setConcept(e.target.value);
        }}
        className="rounded px-1 text-center border border-transparent flex-wrap text-zinc-700 bg-transparent focus:outline-none focus:border focus:border-zinc-300 focus:bg-zinc-50"
      ></input>
    </div>
  );
}
