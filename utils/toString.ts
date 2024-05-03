import { Node } from "reactflow";

// parse dataset to string

export function nodesToString(nodes: Node[]){
  // Assumption: nodes are pre-traversal ordered
  return nodes.reduce((acc, node) => acc +=  `${node.data.content}\n`, '');
}