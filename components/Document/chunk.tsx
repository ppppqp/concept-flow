import useStore from "@/store/graph-store";
import { useShallow } from "zustand/react/shallow";
import { useMemo, useState, useCallback } from "react";
import { markdown } from "@/utils/markdown";
import { Node } from '@/types/node';
import { XCircleIcon } from "@heroicons/react/24/solid";
import Tool from "../Node/bottomTool";
import Concepts from "../Node/concepts";
import useConcepts from "@/hooks/useConcepts";
const selector = (state: any) => ({
  nodes: state.nodes,
  removeNode: state.removeNode,
});

const titleSize = (depth: number) => {
  if (depth < 6)
    return [
      "text-[20px]", // depth = 0
      "text-[18px]", // depth = 1
      "text-[16px]", // depth = 2
      "text-[15px]", // depth = 3
      "text-[14px]", // depth = 4
      "text-[12px]", // depth = 5
    ][depth];
  else{
    return 'text-[12px]';
  }
};

export function Chunck({ id }: { id: string }) {
  const { nodes, removeNode } = useStore(useShallow(selector));
  const [fold, setFold] = useState(false);
  const [loading, setLoading] = useState(false);
  const concepts = useConcepts(id, nodes);
  const onRemove = useCallback(async () => {
    removeNode(id);
  }, [removeNode, id]);
  const onFold = useCallback(() => {
    setFold((f) => !f);
  }, []);
  const node = useMemo(() => nodes.find((n: Node) => n.id === id), [nodes, id]);
  return (
    <div className="w-[32rem] relative">
      <div
        className="flex items-center gap-2 border-b cursor-pointer hover:bg-zinc-50 px-2"
        onClick={onFold}
      >
        <XCircleIcon
          className={"h-4 w-4 text-red-600 hover:text-red-500"}
          onClick={onRemove}
        />
        <h1
          className={`h-8 hover:text-blue-600 leading-8 ${titleSize(node.data.depth)}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Concepts id={id} concept={node.data.concept} />
        </h1>
      </div>

      <div className={`min-h-8 overflow-hidden ${fold && "max-h-10"}`}>
        {fold ? (
          <div className="text-center h-10">...</div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: markdown(node.data.content) }}
            className="text-base"
          ></div>
        )}
      </div>

      <Tool
        id={id}
        concepts={concepts}
        content={node.data.content}
        setLoading={setLoading}
      />
    </div>
  );
}
