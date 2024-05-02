import "./page.css";
import { ROOT_NODE_ID } from "@/components/consts";
import MindMap from "@/components/MindMap";
import { useMemo } from "react";

const introLine = `
**Concept Flow** is an LGUI interaction paradigm that is aimed at **efficient systematic knowledge retrieval**.
`;

const problemLine = `
The experience of LLM Chatbot for systematic information retreieval is still painful. 

Say I'd like to learn about a new subject, like *"trip to new york"*, which includes aspects of dining, accomodation, shopping, etc.

- To deep dive into one of the aspects, we need to formulate and type prompts.

- Also, we may lose context and forget to learn other aspects after deep diving into one.
`
const mindMapLine = `
- **Mind map** is a non-linear layout for information, which enables us to deep dive without losing the global view.
 Closed source products like [Albus](https://albus.org/) have already pioneered using this paradigm.
`

const nodeLine = `
A **node** stands for a concept.
Each node is pre-programmed to **explore and exploit with just a click**.


To exploit current concept, click the <span style="color: #e1a107">yellow spark</span> button.
To explore related concepts, click the <span style="color: blue">blue cube</span> button.
To add custom concepts, click the  <span style="color: green">green plus</span> button.

`
const ragLine = `
The content generated in each explore/exploit action is by RAG-augmented LLM to ensure both readability and credibility.
The parent context will be carried when making RAG query so that the **reponse is correctly scoped**.
`

const begForStarLine = `### Try it out☝️!
Try out this paradigm in playground. Tell us how you feel by creating an issue in [Github](https://github.com/ppppqp/concept-flow/issues) or reach out on [Twitter](https://twitter.com/QipingP).
Hope that it helps you (or amuses you🐶).
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
        position: { x: 400, y: -300},
        data: { content: problemLine, concepts: ['Problems']},
        dragHandle: ".custom-drag-handle",
        parentId: ROOT_NODE_ID,
      },
      {
        id: 'MindMap',
        type: 'node',
        position: { x: 400, y: 0},
        data: { content: mindMapLine, concepts: ['Mind map']},
        dragHandle: ".custom-drag-handle",
        parentId: ROOT_NODE_ID,
      },
      {
        id: 'Nodes',
        type: 'node',
        position: { x: 400, y: -150},
        data: { content: nodeLine, concepts: ['Nodes']},
        dragHandle: ".custom-drag-handle",
        parentId: 'MindMap',
      },
      {
        id: 'Try',
        type: 'node',
        position: { x: 400, y: -100},
        data: { content: begForStarLine, concepts: ['Try it out!']},
        dragHandle: ".custom-drag-handle",
        parentId: 'problems',
      },
      {
        id: 'RAG',
        type: 'node',
        position: { x: 400, y: 100},
        data: { content: ragLine, concepts: ['RAG']},
        dragHandle: ".custom-drag-handle",
        parentId: 'MindMap',
      },
    ],
    []
  );
  const initialEdges = useMemo(()=>([
    {id: 'link1', source: ROOT_NODE_ID, target: 'problems'},
    {id: 'link2', source: ROOT_NODE_ID, target: 'MindMap'},
    {id: 'link3', source: 'MindMap', target: 'Nodes'},
    {id: 'link4', source: 'MindMap', target: 'RAG'},
    {id: 'link5', source: 'problems', target: 'Try'},
  ]), []);
  return (
    <main>
      <h1 className="absolute text-4xl md:text-8xl text-zinc-700 text-center left-20 font-extralight italic">
        Concept Flow
      </h1>
      <span className="absolute text-base md:text-xl text-zinc-700 text-center top-24  md:top-40 left-32 italic underline underline-offset-2">
        An LGUI interaction paradigm for systematic knowledge retrieval
      </span>

      <MindMap initialNodes={initialNodes} initialEdges={initialEdges} />
    </main>
  );
}
