import { DEFAULT_CONCEPT } from "@/components/consts";
import { Node, Edge } from "reactflow";
export function saveLocalStorage(
  sessionId: string,
  concept: string,
  nodes: Node[],
  edges: Edge[]
) {
  if(typeof localStorage === 'undefined'){
    return;
  }
  localStorage.setItem(
    `concept-flow%${sessionId}`,
    JSON.stringify({
      nodes: nodes,
      edges: edges,
      time: Date.now(),
      concept: concept,
    })
  );
}

const getKey = (sessionId: string) => `concept-flow%${sessionId}`;

export function loadLocalStorage(sessionId: string) {
  if(typeof localStorage === 'undefined'){
    return {concept: DEFAULT_CONCEPT, time: Date.now()};
  }
  const result = localStorage.getItem(getKey(sessionId));
  try {
    return JSON.parse(result!) as {
      nodes: Node[];
      edges: Edge[];
      time: number;
      concept: string;
    };
  } catch (err) {
    // TODO: error handling
    console.log(err);
  }
}

export function loadAllSessionIds() {
  if(typeof localStorage === 'undefined'){
    return [];
  }
  const parsedSessions = [];
  const regexPattern = /^concept-flow%(.+?)$/;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const match = key?.match(regexPattern);
    if (match) {
      const sessionId = match[1];
      const { concept, time } = loadLocalStorage(sessionId)!;
      parsedSessions.push({ sessionId, concept, time });
    }
  }
  return parsedSessions.sort((a, b) => b.time - a.time);
}

export function removeLocalStorage(sessionId: string) {
  if(typeof localStorage === 'undefined'){
    return;
  }
  return localStorage.removeItem(getKey(sessionId));
}