import { create } from "zustand";
import { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  modalTitle: string;
  modalText: ReactNode;
  closeButtonText: string;
  confirmButtonText: string;
  confirmOnClick: () => void;
  openModal: (
    title: string,
    text: ReactNode,
    closeButtonText: string,
    confirmButtonText: string,
    confirmOnClick: () => void
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalTitle: '',
  modalText: null,
  closeButtonText: '',
  confirmButtonText: '',
  confirmOnClick: () => {},
  openModal: (title, text, closeButtonText, confirmButtonText, confirmOnClick) =>
    set({ isOpen: true, modalTitle: title, modalText: text, closeButtonText, confirmButtonText, confirmOnClick }),
  closeModal: () => set({ isOpen: false }),
}));
