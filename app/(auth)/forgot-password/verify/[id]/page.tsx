'use client'

import Icon from "@/components/UI/Icon";
import { COLOR_PRIMARY } from "@/constants/colorConstants";
import { verifyResetLink } from "@/features/auth/queryFunctions/loginQueryFunctions";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import usePersistStore from "@/helpers/usePersistStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const VerifyPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter()
    const { id: token } = React.use(params);
    const searchParams = useSearchParams();
    const email = searchParams.get('email')
    const store = usePersistStore(useAuthStore, (state) => state)

    const verifyLinkMutation = useMutation({ mutationFn: verifyResetLink })

    useEffect(() => {
        if (token) {
            store?.setUserInfo(undefined)
        }
    }, [])

    useEffect(() => {
        verifyLinkMutation.mutate({ token }, {
            onSuccess: (data) => {
                router.push(`/forgot-password/verify/reset-password?token=${token}&email=${email}`)
            },
            onError: () => {
                router.push(`/forgot-password/verify/expired?email=${email}`)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <div className='mx-auto text-primaryText flex flex-col h-screen w-full bg-pageBgColor justify-center [--header-height:5rem] [--max-width:640px]'>
            <main className='mt-[var(--header-height)] h-[calc(100dvh-var(--header-height))]'>
                <div className="flex h-full w-full items-center justify-center">
                    <Icon name={'Loader'} color={COLOR_PRIMARY} className='animate-spin py-1' fontSize={40} />
                </div>
            </main>
        </div>
    )
}

export default VerifyPage