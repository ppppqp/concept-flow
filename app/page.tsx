import "reactflow/dist/style.css";
import "./page.css";
import { ROOT_NODE_ID } from "@/components/consts";
import MindMap from "@/components/MindMap";
import { useMemo } from "react";

const introLine = `
**Concept Flow** is an LGUI interaction paradigm that is aimed at **efficient systematic knowledge retrieval**.
`;

const problemLine = `#### Problem
- The experience of LLM Chatbot for systematic information retrivial is still painful. To gather the information of all key points and aspects, you need to formulate and type prompts back-and-forth.
`
const mindMapLine = `#### MindMap
`
export default function Home() {
  const initialNodes = useMemo(
    () => [
      {
        id: ROOT_NODE_ID,
        type: "node",
        position: { x: 0, y: 0 },
        data: { content: introLine, concepts: ["Concept Flow"], degree: 0 },
        dragHandle: ".custom-drag-handle",
      },
      {
        id: 'problems',
        type: 'node',
        position: { x: 350, y: -300},
        data: { content: problemLine, concepts: ['Problems']},
        dragHandle: ".custom-drag-handle",
        parentId: ROOT_NODE_ID,
      },
      {
        id: 'MindMap',
        type: 'node',
        position: { x: 350, y: 0},
        data: { content: mindMapLine, concepts: ['MindMap']},
        dragHandle: ".custom-drag-handle",
      }
    ],
    []
  );
  return (
    <main>
      <h1 className="absolute text-8xl text-zinc-700 text-center left-20 font-extralight italic ">
        Concept Flow
      </h1>
      <span className="absolute text-xl text-zinc-700 text-center top-40 left-32 italic underline underline-offset-2">
        An LGUI interaction paradigm for systematic knowledge retrieval
      </span>

      <MindMap initialNodes={initialNodes} />
    </main>
  );
}
