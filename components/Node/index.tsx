import { Handle, Position } from "reactflow";
import Tool from "./bottomTool";
import Content from "./content";
import Concepts from "./concepts";
import {
  XCircleIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { Cog6ToothIcon, CogIcon } from "@heroicons/react/24/outline";
import useStore from "../../store/graph-store";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useUIStore from "@/store/ui-store";
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

const uiSelector = (state: any) => ({
  editModalOpen: state.editModalOpen,
  setEditModalOpen: state.setEditModalOpen,
});

export default function TextNode({ data, id }: { data: NodeData; id: string }) {
  const { content, concepts } = data;
  const { removeNode } = useStore(useShallow(selector));
  const [fold, setFold] = useState(false);
  const [loading, setLoading] = useState(false);
  const { editModalOpen, setEditModalOpen } = useUIStore(useShallow(uiSelector));

  const onRemove = useCallback(async () => {
    removeNode(id);
  }, [removeNode, id]);
  const onEdit = useCallback(() => setEditModalOpen(true, id), [setEditModalOpen, id]);
  return (
    <div className="text-sm min-w-64 max-w-80 pb-4 rounded-xl bg-white border border-zinc-200 backdrop-blur-sm bg-[rgba(255, 255, 255, 0.5)] shadow-md">
      <div>
        <div
          className={`flex justify-center w-full bg-zinc-100 p-1 pl-2 pr-2 border-b border-zinc-200 rounded-t-xl  custom-drag-handle`}
        >
          <div
            className={
              "absolute left-2 h-4 flex justify-center items-center mr-2 gap-1"
            }
          >
            <XCircleIcon
              className={
                "h-3 w-3 text-red-600 hover:text-red-500 cursor-pointer"
              }
              onClick={onRemove}
            />
            {fold ? (
              <ArrowsPointingOutIcon
                className="h-3 w-3 text-zinc-800 hover:text-zinc-700 cursor-pointer"
                onClick={() => setFold((f) => !f)}
              />
            ) : (
              <ArrowsPointingInIcon
                className="h-3 w-3 text-zinc-800 hover:text-zinc-700 cursor-pointer"
                onClick={() => setFold((f) => !f)}
              />
            )}
            <Cog6ToothIcon
              className="w-3 h-3 hover:text-zinc-700 cursor-pointer"
              onClick={onEdit}
            />
          </div>
          <Concepts concepts={concepts} />
          <div className="absolute right-2">
            <MinusIcon
              className={`h-4 w-4 animate-spin ${!loading && "invisible"}`}
            />
          </div>
        </div>
        <div className="p-2">
          <Content content={content} fold={fold} />
        </div>

        <Tool
          id={id}
          concepts={concepts}
          content={content}
          setLoading={setLoading}
        />
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
