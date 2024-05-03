import { create } from 'zustand';
import { loadAllSessionIds } from '@/utils/localStorage';
import { uuid } from 'uuidv4';
export interface Session {
  sessionId: string;
  concept: string;
}
type RFState = {
  editModalOpen: boolean;
  editModalNodeId: string;
  setEditModalOpen: (v: boolean, id?: string) => void;
  currentSessionId: string;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
  setCurrentSessionId: (sessionId: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useUIStore = create<RFState>((set, get) => ({
  editModalOpen: false,
  editModalNodeId: '',
  currentSessionId: uuid(),
  sessions: loadAllSessionIds(),
  setEditModalOpen: (v: boolean, id?: string) => {
    set({
      editModalOpen: v
    });
    if(id){
      set({
        editModalNodeId: id   
      })
    }
  },
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

export default useUIStore;
