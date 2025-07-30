'use client'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import usePersistStore from '@/helpers/usePersistStore'
import { axiosRequest } from '@/utils/axios-utils'
import { useMutation } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'

const TestPage = () => {
    const store = usePersistStore(useAuthStore, (state) => state)

    const login = async (loginData: any) => {
        return await axiosRequest({
            url: '/auth/sign-in',
            method: 'post',
            data: loginData
        })
    }

    const loginMutation = useMutation({ mutationFn: login })

    const loginUser = (data: FieldValues) => {
        const updatedData = {
            email: "abusiam@beta-Skyhaus.com",
            type: "password",
            password: "EV@123456789a"
        }
        loginMutation?.mutate(updatedData,
            {
                onSuccess: (data: any) => {
                    store?.setUserInfo(data)
                },
                onError: () => {
                },
            }
        )
    }

    return (
        <div className='flex items-center bg-amber-600 justify-center min-h-screen'>
            {/* <div className='text-xl'> */}
                {/* {isFetching ? 'Loading...' : 'Loaded'} */}
                {/* <div>{store?.bears}</div>
                <div onClick={store?.addABear}>add</div> */}
            {/* </div> */}
            <div onClick={loginUser}>Login</div>
        </div>
    )
}

export default TestPage