import { create } from 'zustand';
export type UIStoreState = {
  editModalOpen: boolean;
  editModalNodeId: string;
  setEditModalOpen: (v: boolean, id?: string) => void;
  showPopoverNotice: boolean;
  setShowPopoverNotice: (b: boolean) => void;
  popoverNoticeMessage: string;
  setPopoverNoticeMessage: (m: string) => void;
};

const useUIStore = create<UIStoreState>((set, get) => ({
  editModalOpen: false,
  editModalNodeId: '',
  showPopoverNotice: false,
  setShowPopoverNotice: (b: boolean) => {
    set({showPopoverNotice: b});
  },
  popoverNoticeMessage: '',
  setPopoverNoticeMessage: (s: string) => {
    set({popoverNoticeMessage: s});
  },
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
