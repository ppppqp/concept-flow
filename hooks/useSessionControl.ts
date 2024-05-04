import useStore from "@/store/graph-store";
import useUIStore from "@/store/ui-store";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";
import { Node } from "@/types/node";
import {
  DEFAULT_NODES,
  DEFAULT_EDGES,
  ROOT_NODE_ID,
} from "@/components/consts";
import { loadLocalStorage, saveLocalStorage } from "@/utils/localStorage";
import useSessionStore, { Session } from "@/store/session-store";
const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

const sessionSelector = (state: any) => ({
  currentSessionId: state.currentSessionId,
  setCurrentSessionId: state.setCurrentSessionId,
  sessions: state.sessions,
  setSessions: state.setSessions,
});

const uiSelector = (state: any) => ({
  setShowPopoverNotice: state.setShowPopoverNotice,
  setPopoverNoticeMessage: state.setPopoverNoticeMessage,
});
export function useSessionControl() {
  const { nodes, edges, setNodes, setEdges } = useStore(useShallow(selector));
  const { currentSessionId, setCurrentSessionId, sessions, setSessions } =
    useSessionStore(sessionSelector);
  const { setPopoverNoticeMessage, setShowPopoverNotice } = useUIStore(
    useShallow(uiSelector)
  );
  const addSession = useCallback(
    (sessionId: string) => {
      const newSessions = [...sessions];
      const concept = nodes.find((n: Node) => n.id === ROOT_NODE_ID)?.data.concept;
      const newSession = {
        sessionId,
        concept,
      };
      newSessions.unshift(newSession);
      setSessions(newSessions);
      setCurrentSessionId(sessionId);
      setNodes(DEFAULT_NODES);
      setEdges(DEFAULT_EDGES);
    },
    [sessions, setSessions, setNodes, setEdges, setCurrentSessionId, nodes]
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
      const newSessions = [...sessions];
      const index = newSessions.findIndex((s) => s.sessionId === sessionId);
      newSessions.splice(index, 1);
      setSessions(newSessions);
      loadSession(newSessions[0].sessionId);
    },
    [sessions, setSessions, loadSession]
  );

  const saveSession = useCallback(() => {
    const concept = nodes.find((n: Node) => n.id === ROOT_NODE_ID)?.data
      .concept;
    saveLocalStorage(currentSessionId, concept, nodes, edges);
    // update sidebar synchrounously
    const index = sessions.findIndex(
      (s: Session) => s.sessionId === currentSessionId
    );
    const newSessions = [...sessions];
    const currentSession = sessions[index];
    // update concept
    currentSession.concept = concept;
    newSessions.splice(index, 1);
    newSessions.unshift(currentSession);
    setSessions(newSessions);
    setPopoverNoticeMessage("Saved!");
    setShowPopoverNotice(true);
  }, [
    currentSessionId,
    nodes,
    edges,
    sessions,
    setSessions,
    setPopoverNoticeMessage,
    setShowPopoverNotice,
  ]);

  return { loadSession, removeSession, addSession, saveSession };
}
