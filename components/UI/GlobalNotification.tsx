'use client'

import { useNotificationStore } from '@/store/useNotificationStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const NOTIFICATION_TTL = 3000

const SlideInNotifications = ({ notifications, removeNotification }: { notifications: { id: string, text: string }[], removeNotification: any }) => {
    return (
        <div className="flex flex-col gap-1 w-full fixed top-10 left-1/2 transform -translate-x-1/2 z-[10000] max-w-(--max-width)  pointer-events-none mx-auto px-4">
            <AnimatePresence>
                {notifications.map((n) => (
                    <Notification key={n.id} {...n} removeNotif={removeNotification} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const Notification = ({ text, id, removeNotif }: { text: string, id: string, removeNotif: any }) => {
    useEffect(() => {
        const timeoutRef = setTimeout(() => removeNotif(id), NOTIFICATION_TTL);
        return () => clearTimeout(timeoutRef);
    }, [id, removeNotif]);

    return (
        <motion.div
            layout
            initial={{ y: -15, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="py-4 px-6 flex items-start rounded-md z-[100000] relative gap-2 text-sm font-medium shadow-lg text-white bg-black pointer-events-auto"
        >
            {/* <FiCheckSquare className="mt-0.5" /> */}
            <span>{text}</span>
            {/* <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5 cursor-pointer">
          <FiX />
        </button> */}
        </motion.div>
    );
};

const GlobalNotifications = () => {
    const { notifications, removeNotification } = useNotificationStore();

    return notifications.length > 0 ? (
        <SlideInNotifications notifications={notifications} removeNotification={removeNotification} />
    ) : null;
};

export default GlobalNotifications;
