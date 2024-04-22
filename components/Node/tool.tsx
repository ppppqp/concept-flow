import {
  TrashIcon,
  PlusCircleIcon,
  SparklesIcon,
  CubeIcon
} from "@heroicons/react/24/outline";
import { useCallback } from "react";
import useStore from "../store";
import { useShallow } from "zustand/react/shallow";
import { makeRegQuery, readStreamAsString } from "@/utils";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
// delete node, add node, generate content
const toolClassName =
  "h-4 w-4 rounded hover:bg-zinc-100 cursor-pointer flex justify-center items-center m-1";
const selector = (state: any) => ({
  setNodeContent: state.setNodeContent,
  addNode: state.addNode,
  removeNode: state.removeNode,
  
});
const queryContext = (concept: string, context: string[]) => `
The concept ${concept} is limited to the scope that it is specifically related to ${context}.
`
const querySpan = (concepts: string[]) => `
I want to be an expert in the subject that is related to ${concepts}.
The response should be a series of phrases that is concatenated by commas. 
Each key concept that is important and worth diving into. Just the concept itself is enough: no extra information needed.
The formatting correctness is very important.
You should not include any concepts that already appeared in ${concepts}.
Give 4 to 8 concepts.
`;
const querySpark = (concepts: string[]) => `
I want to be an expert int the subject that is related to ${concepts}. 
Please explain the subject to me. Be sure to address and cover all concepts including ${concepts}.
For all concepts in ${concepts}, the more latter one is more important, and should be addressed primarily in your explanation. 
The more former one mostly provides a scope and context for the latter ones, so you do not need to give any explanation to them.
`;
export default function Tool({
  id,
  concepts,
  content,
}: {
  id: string;
  concepts: string[];
  content: string;
}) {
  const { addNode, setNodeContent, removeNode } = useStore(useShallow(selector));
  const onAddNode = useCallback(() => {
    addNode(id, [...concepts, 'Enter your concept']);
  }, [id]);
  const onSpan = useCallback(async ()=>{
    const data = await makeRegQuery(querySpan(concepts), false);
    const newConcepts = data.split(",");
    for await (const concept of newConcepts) {
      await addNode(id, [...concepts, concept]);
    }
  }, [addNode]);
  const onSpark = useCallback(async ()=>{
    const stream: ReadableStream = await makeRegQuery(querySpark(concepts), true);
    setNodeContent(id, '');
    await readStreamAsString(stream, (c) => setNodeContent(id, prevMessage => prevMessage + c));
    // setNodeContent(id, prevMessage => prevMessage.replace(/\n/g, "\n"));
  }, [setNodeContent]);
  const onRemove = useCallback(async () => {
    removeNode(id);
  }, [removeNode]);

  return (
    <div className="flex justify-start items-center absolute bottom-0 right-0">
      <div className={toolClassName} onClick={onSpark}>
        <SparklesIcon className="h-10 w-10 text-zinc-600 hover:text-yellow-600" />
      </div>
      <div className={toolClassName} onClick={onRemove}>
        <TrashIcon className="h-10 w-10 text-zinc-600 hover:text-red-700" />
      </div>
      <div className={toolClassName} onClick={onAddNode}>
        <PlusCircleIcon className="h-10 w-10 text-zinc-600 hover:text-green-600" />
      </div>
      <div className={toolClassName} onClick={onSpan}>
        <CubeIcon className="h-10 w-10 text-zinc-600 hover:text-blue-700" />
      </div>
    </div>
  );
}
