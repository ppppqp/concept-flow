import useGraphStore, { GraphStoreState } from "@/store/graph-store";
import useUIStore, { UIStoreState } from "@/store/ui-store";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";
import { Node, Edge } from "@/types/node";
import {
  DEFAULT_CONCEPT,
  DEFAULT_NODES,
  DEFAULT_EDGES,
  ROOT_NODE_ID,
} from "@/components/consts";
import { loadLocalStorage, removeLocalStorage, saveLocalStorage } from "@/utils/localStorage";
import useSessionStore, {
  Session,
  SessionStoreState,
} from "@/store/session-store";
const selector = (state: GraphStoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const sessionSelector = (state: SessionStoreState) => ({
  currentSessionId: state.currentSessionId,
  setCurrentSessionId: state.setCurrentSessionId,
  sessions: state.sessions,
  setSessions: state.setSessions,
});

const uiSelector = (state: UIStoreState) => ({
  setShowPopoverNotice: state.setShowPopoverNotice,
  setPopoverNoticeMessage: state.setPopoverNoticeMessage,
});
export function useSessionControl() {
  const { nodes, edges, setNodes, setEdges } = useGraphStore(
    useShallow(selector)
  );
  const { currentSessionId, setCurrentSessionId, sessions, setSessions } =
    useSessionStore(sessionSelector);
  const { setPopoverNoticeMessage, setShowPopoverNotice } = useUIStore(
    useShallow(uiSelector)
  );
  const saveSession = useCallback(
    (sessionId: string, nodes: Node[], edges: Edge[]) => {
      const concept = nodes.find((n: Node) => n.id === ROOT_NODE_ID)?.data
        .concept!;
      saveLocalStorage(sessionId, concept, nodes, edges);
      // update sidebar synchrounously
      const newSessions = [...sessions];

      const savedSession = newSessions.find((s: Session) => s.sessionId === sessionId);
      if(savedSession){
        savedSession.concept = concept;
        setSessions(newSessions);
      }
      setPopoverNoticeMessage("Saved!");
      setShowPopoverNotice(true);
      
    },
    [setPopoverNoticeMessage, setShowPopoverNotice, sessions, setSessions]
  );
  const addSession = useCallback(
    (sessionId: string) => {
      const newSessions = [...sessions];
      const concept = DEFAULT_CONCEPT;
      const newSession = {
        sessionId,
        concept: DEFAULT_CONCEPT,
      };
      newSessions.unshift(newSession);
      setSessions(newSessions);
      setCurrentSessionId(sessionId);
      setNodes(DEFAULT_NODES);
      setEdges(DEFAULT_EDGES);
      saveSession(sessionId, DEFAULT_NODES, DEFAULT_EDGES);
    },
    [
      sessions,
      setSessions,
      setNodes,
      setEdges,
      setCurrentSessionId,
      saveSession,
    ]
  );
  const loadSession = useCallback(
    (sessionId: string) => {
      const { nodes, edges } = loadLocalStorage(sessionId)!;
      setNodes(nodes);
      setEdges(edges);
      setCurrentSessionId(sessionId);
    },
    [setNodes, setEdges, setCurrentSessionId]
  );

  const removeSession = useCallback(
    (sessionId: string) => {
      if (sessions.length === 1) {
        return;
      }
      removeLocalStorage(sessionId);

      const newSessions = [...sessions];
      const index = newSessions.findIndex((s) => s.sessionId === sessionId);
      newSessions.splice(index, 1);
      setSessions(newSessions);
      if (currentSessionId === sessionId) {
        loadSession(newSessions[0].sessionId);
      }
    },
    [sessions, setSessions, loadSession, currentSessionId]
  );

  return { loadSession, removeSession, addSession, saveSession };
}
