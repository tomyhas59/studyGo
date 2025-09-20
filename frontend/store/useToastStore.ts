import { create } from "zustand";

type Toast = { id: number; message: string };

type ToastState = {
  toasts: Toast[];
  addToast: (message: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));
    setTimeout(
      () =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
      3000
    );
  },
}));
