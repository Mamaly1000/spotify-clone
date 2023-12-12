import { create } from "zustand";

interface SidebarDrawerStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
const useSidebarDrawer = create<SidebarDrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useSidebarDrawer;
