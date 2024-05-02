import useStore from "@/store/graph-store";
import { useShallow } from "zustand/react/shallow";
import { useMemo, useState, useCallback } from "react";
import { markdown } from "@/utils/markdown";
import { Node } from "reactflow";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Tool from "../Node/bottomTool";
const selector = (state: any) => ({
  nodes: state.nodes,
  removeNode: state.removeNode,
});

export function Chunck({ id }: { id: string }) {
  const { nodes, removeNode } = useStore(useShallow(selector));
  const [fold, setFold] = useState(false);
  const [loading, setLoading] = useState(false);
  const onRemove = useCallback(async () => {
    removeNode(id);
  }, [removeNode, id]);
  const onFold = useCallback(() => {
    console.log("fold");
    setFold((f) => !f);
  }, []);
  const node = useMemo(() => nodes.find((n: Node) => n.id === id), [nodes, id]);
  return (
    <div className="w-[32rem] relative">
      <div className="flex items-center gap-2">
        <XCircleIcon
          className={"h-4 w-4 text-red-600 hover:text-red-500 cursor-pointer"}
          onClick={onRemove}
        />
        <h1
          className="h-8 hover:text-blue-600 leading-8 cursor-pointer"
          onClick={onFold}
        >
          {node.data.concepts.at(-1)}
        </h1>
      </div>

      <div className={`overflow-hidden ${fold && "max-h-5"}`}>
        {fold ? (
          <div className="text-center">...</div>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: markdown(node.data.content) }}
            className="text-base"
          ></div>
        )}
      </div>

      <Tool
        id={id}
        concepts={node.data.concepts}
        content={node.data.content}
        setLoading={setLoading}
      />
    </div>
  );
}
