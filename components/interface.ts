export enum NodeEventName {
  AddNode,
  UpdateContent,
}

interface NodeBaseEvent<E, P> {
  event: E;
  params: P;
}

export interface AddNodeParams {
  sourceId: string;
  query: string;
}


export interface UpdateContentParam {
  setContent: (s: string) => void;
}

export type NodeEvent = NodeBaseEvent<NodeEventName.AddNode, AddNodeParams> | NodeBaseEvent<NodeEventName.UpdateContent, UpdateContentParam>