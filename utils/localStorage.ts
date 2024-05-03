import { Node, Edge } from "reactflow";
export function saveLocalStorage(
  sessionId: string,
  concept: string,
  nodes: Node[],
  edges: Edge[]
) {
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

export function loadLocalStorage(sessionId: string) {
  const result = localStorage.getItem(`concept-flow%${sessionId}`);
  try {
    return JSON.parse(result!) as {
      nodes: Node[];
      edges: Edge[];
      time: number;
      concept: string;
    };
  } catch (err) {
    // TODO: error handling
  }
}

export function loadAllSessionIds() {
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
