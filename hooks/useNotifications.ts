import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<{id: string, text: string}[]>([]);

  const addNotification = (text: string) => {
    setNotifications((prev) => [{ id: uuidv4(), text }, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};

export default useNotifications;
