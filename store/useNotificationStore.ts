import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

type Notification = { id: string; text: string };

type NotificationStore = {
  notifications: Notification[];
  addNotification: (text: string) => void;
  removeNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (text) => {
    const id = uuidv4()
    set((state) => ({ notifications: [...state.notifications, { id, text }] }));
    setTimeout(() => set((state) => ({ notifications: state.notifications.filter(n => n.id !== id) })), 3000000)
  },
  removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter(n => n.id !== id) })),
}));
