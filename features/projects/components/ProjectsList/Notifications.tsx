'use client'

import { useNotificationStore } from '@/store/useNotificationStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type NotificationsProps = {
    searchParamsValue: string
    notificationText: string
    redirectUrl: string
}

const Notifications = ({ searchParamsValue, notificationText, redirectUrl }: NotificationsProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();

    const { addNotification } = useNotificationStore()

    useEffect(() => {
        if (searchParamsValue && searchParams?.get(searchParamsValue)) {
            addNotification(notificationText)
            router.push(redirectUrl)
        }
    }, [searchParamsValue])

    return (
        <></>
    )
}

export default Notifications