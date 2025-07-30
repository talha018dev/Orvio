'use client'

import SetupSuccess from "@/features/auth/components/SetupSuccess";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import cookieHelper from "@/helpers/cookie-helper";
import usePersistStore from "@/helpers/usePersistStore";
import { useEffect } from "react";

const SuccessPage = () => {
    const store = usePersistStore(useAuthStore, (state) => state)
    console.log(' SuccessPage - store:', store)
    useEffect(() => {
        if (store?.userInfo) {
            cookieHelper.removeCookie('accessTokenSkyhaus')
            cookieHelper.removeCookie('refreshTokenSkyhaus')
            store?.setUserInfo(undefined)
        }
    }, [store?.userInfo])

    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center [--header-height:5rem] [--max-width:640px]'>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <SetupSuccess />
            </main>
        </div>
    );
};

export default SuccessPage;