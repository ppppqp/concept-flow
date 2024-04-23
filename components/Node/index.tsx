import { Handle, Position } from "reactflow";
import Tool from "./bottomTool";
import Content from "./content";
import Concepts from "./concepts";
import {
  XCircleIcon,
  MinusCircleIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/solid";
import useStore from "../store";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/react/shallow";
export interface NodeData {
  content: string;
  concepts: string[];
  degree: number;
}
const selector = (state: any) => ({
  setNodeContent: state.setNodeContent,
  addNode: state.addNode,
  removeNode: state.removeNode,
});
export default function TextNode({ data, id }: { data: NodeData; id: string }) {
  const { content, concepts } = data;
  const { removeNode } = useStore(useShallow(selector));
  const [fold, setFold] = useState(false);
  const onRemove = useCallback(async () => {
    removeNode(id);
  }, [removeNode, id]);
  return (
    <div className="text-sm min-w-64 max-w-80 pb-4 rounded-xl bg-white border border-zinc-200 backdrop-blur-sm bg-[rgba(255, 255, 255, 0.5)] shadow-md">
      <div>
        <div
          className={`flex w-full bg-zinc-100 p-1 pl-2 pr-2 border-b border-zinc-200 rounded-t-xl  custom-drag-handle`}
        >
          <div className={"flex justify-center items-center mr-2 gap-1"}>
            <XCircleIcon
              className={
                "h-3 w-3 text-red-600 hover:text-red-500 cursor-pointer"
              }
              onClick={onRemove}
            />
            {fold ? (
              <ArrowsPointingOutIcon
                className={
                  "h-3 w-3 text-zinc-800 hover:text-zinc-700 cursor-pointer"
                }
                onClick={() => setFold((f) => !f)}
              />
            ) : (
              <ArrowsPointingInIcon
                className={
                  "h-3 w-3 text-zinc-800 hover:text-zinc-700 cursor-pointer"
                }
                onClick={() => setFold((f) => !f)}
              />
            )}
          </div>
          <Concepts concepts={concepts} />
        </div>
        <div className="p-2">
          <Content content={content} fold={fold} />
        </div>
        <Tool id={id} concepts={concepts} content={content} />
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
