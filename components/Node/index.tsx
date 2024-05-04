import { Handle, Position } from "reactflow";
import Tool from "./bottomTool";
import Content from "./content";
import Concepts from "./concepts";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { XCircleIcon, MinusIcon } from "@heroicons/react/24/solid";
import useStore from "../../store/graph-store";
import { useCallback, useState, useRef, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useUIStore from "@/store/ui-store";
import useConcepts from "@/hooks/useConcepts";
import { NodeData } from "@/types/node";
const selector = (state: any) => ({
  nodes: state.nodes,
  setNodeHeight: state.setNodeHeight,
  setNodeContent: state.setNodeContent,
  addNode: state.addNode,
  removeNode: state.removeNode,
});

const uiSelector = (state: any) => ({
  editModalOpen: state.editModalOpen,
  setEditModalOpen: state.setEditModalOpen,
});

export default function TextNode({ data, id }: { data: NodeData; id: string }) {

  const { content, concept } = data;
  const { removeNode, setNodeHeight, nodes } = useStore(useShallow(selector));
  const [fold, setFold] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { editModalOpen, setEditModalOpen } = useUIStore(
    useShallow(uiSelector)
  );
  const onFold = useCallback(() => {
    setFold((f) => !f);
  }, []);
  const onRemove = useCallback(async () => {
    removeNode(id);
  }, [removeNode, id]);
  const onEdit = useCallback(
    () => setEditModalOpen(true, id),
    [setEditModalOpen, id]
  );
  console.log('here:', id);
  const concepts = useConcepts(id, nodes);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const newHeight = entry.contentRect.height; // Access the new element height
      setNodeHeight(id, newHeight);
    });
    resizeObserver.observe(contentRef.current!);
    return () => resizeObserver.disconnect();
  }, [setNodeHeight, id]);

  return (
    <div
      className={`text-sm w-80 pb-4 rounded-xl bg-white border border-zinc-200 shadow-md`}
    >
      <div>
        <div className="absolute left-1/2 translate-x-[-50%] top-1.5">
          <Concepts id={id} concept={concept} />
        </div>
        <div
          onClick={onFold}
          className={`flex cursor-pointer justify-center w-full h-8 bg-zinc-100 p-1 pl-2 pr-2 border-b border-zinc-200 rounded-t-xl  custom-drag-handle`}
        >
          <div
            className={
              "absolute left-2 h-4 top-2 flex justify-center items-center mr-2 gap-1"
            }
          >
            <XCircleIcon
              className={
                "h-4 w-4 text-red-600 hover:text-red-500 cursor-pointer"
              }
              onClick={onRemove}
            />
          </div>
          <div className="absolute right-2">
            <MinusIcon
              className={`h-4 w-4 animate-spin ${!loading && "invisible"}`}
            />
          </div>
        </div>
        <div className="p-2">
          <SimpleBar style={{ maxHeight: 200 }}>
            <Content contentRef={contentRef} content={content} fold={fold} />
          </SimpleBar>
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
