import { create } from 'zustand';

type RFState = {
  editModalOpen: boolean;
  editModalNodeId: string;
  setEditModalOpen: (v: boolean, id?: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useUIStore = create<RFState>((set, get) => ({
  editModalOpen: false,
  editModalNodeId: '',
  setEditModalOpen: (v: boolean, id?: string) => {
    set({
      editModalOpen: v
    });
    if(id){
      set({
        editModalNodeId: id   
      })
    }
  }
}));

export default useUIStore;
