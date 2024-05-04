import {
  TrashIcon,
  PlusCircleIcon,
  SparklesIcon,
  CubeIcon
} from "@heroicons/react/24/outline";
import { useCallback } from "react";
import useGraphStore, { GraphStoreState } from "../../store/graph-store";
import { useShallow } from "zustand/react/shallow";
import { makeRegQuery, readStreamAsString } from "@/utils";
import { Endpoints } from "@/utils/makeRegQuery";
// delete node, add node, generate content
const toolClassName =
  "h-4 w-4 rounded cursor-pointer flex justify-center items-center m-1";
const selector = (state: GraphStoreState) => ({
  setNodeContent: state.setNodeContent,
  addNode: state.addNode,
  removeNode: state.removeNode,
});



export default function Tool({
  id,
  concepts,
  content,
  setLoading,
}: {
  id: string;
  concepts: string[];
  content: string;
  setLoading: (b: boolean) => void;
}) {
  const { addNode, setNodeContent, removeNode } = useGraphStore(useShallow(selector));
  const onAddNode = useCallback(() => {
    addNode(id);
  }, [id, addNode]);
  const onSpan = useCallback(async ()=>{
    setLoading(true);
    const data = await makeRegQuery(Endpoints.SPAN, {concepts}, false);
    const newConcepts = data.split(",");
    for await (const concept of newConcepts) {
      await addNode(id, concept);
    }
    setLoading(false);
  }, [addNode, concepts, id, setLoading]);
  const onSpark = useCallback(async ()=>{
    setLoading(true);
    const stream: ReadableStream = await makeRegQuery(Endpoints.SPARK, {concepts}, true);
    setNodeContent(id, '');
    await readStreamAsString(stream, (c) => {setNodeContent(id, (prevMessage: string) => prevMessage + c)});
    setLoading(false);
  }, [setNodeContent, concepts, id, setLoading]);

  return (
    <div className="flex justify-start items-center absolute bottom-0 right-0">
      <div className={toolClassName} onClick={onSpark}>
        <SparklesIcon className="h-5 w-5 text-yellow-600 hover:text-yellow-500" />
      </div>
      <div className={toolClassName} onClick={onAddNode}>
        <PlusCircleIcon className="h-5 w-5 text-green-600 hover:text-green-500" />
      </div>
      <div className={toolClassName} onClick={onSpan}>
        <CubeIcon className="h-5 w-5 text-blue-600 hover:text-blue-500" />
      </div>
    </div>
  );
}
