import {Node as OriginNode} from 'reactflow';

export interface NodeData{
  concept: string;
  content: string;
  height: number;
}

export interface Node extends OriginNode {
  data: NodeData;
}

export { type Edge } from 'reactflow';