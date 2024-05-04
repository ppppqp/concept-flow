import { create } from 'zustand';
import { loadAllSessionIds } from '@/utils/localStorage';

export interface Session{
  concept: string;
  sessionId: string;
}
// session meta info
type RFState = {
  currentSessionId: string;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
  setCurrentSessionId: (sessionId: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useSessionStore = create<RFState>((set, get) => ({
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
