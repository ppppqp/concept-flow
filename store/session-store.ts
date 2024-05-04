import { create } from 'zustand';
import { loadAllSessionIds } from '@/utils/localStorage';

export interface Session{
  concept: string;
  sessionId: string;
}
// session meta info
export type SessionStoreState = {
  currentSessionId: string;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
  setCurrentSessionId: (sessionId: string) => void;
};

const useSessionStore = create<SessionStoreState>((set, get) => ({
  currentSessionId: '',
  sessions: loadAllSessionIds(),
  setSessions: (sessions: Session[]) => {
    set({
      sessions
    });
  },
  setCurrentSessionId: (sessionId: string) => {
    set({
      currentSessionId: sessionId
    })
  }
}));

export default useSessionStore;
