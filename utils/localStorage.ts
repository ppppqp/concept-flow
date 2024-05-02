import {Node, Edge} from 'reactflow';
export function saveLocalStorage(sessionId: string, concept: string, nodes: Node[], edges: Edge[]){
  localStorage.setItem(`concept-flow-${sessionId}-${concept}`, JSON.stringify({nodes: nodes, edges: edges}));
}

export function loadLocalStorage(sessionId: string){
  const result = localStorage.getItem(`concept-flow-${sessionId}`);
  try{
    return JSON.parse(result!) as {nodes: Node[], edges: Edge[]};
  } catch(err){
    // TODO: error handling
  }
}

export function loadAllSessionIds(sessionId: string){

}