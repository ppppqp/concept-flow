import {
  TrashIcon,
  PlusCircleIcon,
  SparklesIcon,
  CubeIcon
} from "@heroicons/react/24/outline";
import { useCallback } from "react";
import useStore from "../store";
import { makeRegQuery, readStreamAsString } from "@/utils";
// delete node, add node, generate content
const toolClassName =
  "h-4 w-4 rounded hover:bg-zinc-100 cursor-pointer flex justify-center items-center m-1";
const selector = (state: any) => ({
  setNodeContent: state.setNodeContent,
  addNode: state.addNode,
});
const querySpan = (concept: string) => `
I want to be an expert in ${concept}.
The response should be a series of phrases that is concatenated by commas. 
Each key concept of ${concept} that is important and worth diving into. Just the concept itself is enough: no extra information needed.
The formatting correctness is very important
Give 4 to 8 concepts.
`;
const querySpark = (concept: string) => `
I want to be an expert in ${concept}. Please explain this concept to me.
`;
export default function Tool({
  id,
  concept,
  content,
}: {
  id: string;
  concept: string;
  content: string;
}) {
  const { addNode, setNodeContent } = useStore();
  const onAddNode = useCallback(() => {
    addNode(id, 'Enter your concept');
  }, [id]);
  const onSpan = useCallback(async ()=>{
    const data = await makeRegQuery(querySpan(concept), false);
    const concepts = data.split(",");
    for await (const concept of concepts) {
      await addNode(id, concept);
    }
  }, [addNode]);
  const onSpark = useCallback(async ()=>{
    const stream: ReadableStream = await makeRegQuery(querySpark(concept), true);
    setNodeContent(id, '');
    await readStreamAsString(stream, (c) => setNodeContent(id, prevMessage => prevMessage + c));
    // setNodeContent(id, prevMessage => prevMessage.replace(/\n/g, "\n"));
  }, [setNodeContent]);
  return (
    <div className="flex justify-start items-center absolute bottom-0 right-0">
      <div className={toolClassName} onClick={onSpark}>
        <SparklesIcon className="h-3 w-3 text-zinc-600" />
      </div>
      <div className={toolClassName}>
        <TrashIcon className="h-3 w-3 text-zinc-600" />
      </div>
      <div className={toolClassName} onClick={onAddNode}>
        <PlusCircleIcon className="h-3 w-3 text-zinc-600" />
      </div>
      <div className={toolClassName} onClick={onSpan}>
        <CubeIcon className="h-3 w-3 text-zinc-600" />
      </div>
    </div>
  );
}
