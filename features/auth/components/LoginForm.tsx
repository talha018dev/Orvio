'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import CheckboxInput from '@/components/UI/CheckboxInput'
import H1Text from '@/components/UI/H1Text'
import Input from '@/components/UI/Input'
import { login, warmup } from '@/features/auth/queryFunctions/loginQueryFunctions'
import { loginSchema } from '@/features/auth/schemas/loginSchema'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { UserInfoType } from '@/features/auth/types/types'
import cookieHelper from '@/helpers/cookie-helper'
import usePersistStore from '@/helpers/usePersistStore'
import { useNotificationStore } from '@/store/useNotificationStore'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type LoginFormProps = {
}

const LoginForm = ({ }: LoginFormProps) => {
    const router = useRouter()
    const store = usePersistStore(useAuthStore, (state) => state)
    const queryClient = useQueryClient()

    const loginMutation = useMutation({ mutationFn: login })
    const { addNotification } = useNotificationStore()

    useQuery({ queryKey: ['warmup'], queryFn: () => warmup() })

    const [signInCheck, setSignInCheck] = useState(false)
    const defaultValues = {
        email: '', password: ''
    }

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(loginSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    const allFieldsEmpty = () => {
        const { email, password } = methods.watch();
        return !(email && password);
    }

    const onSubmit = (data: FieldValues) => {
        const updatedData = {
            email: 'talha@6sensehq.com',
            password: 'Rs123456',
            type: "password",
            remember: signInCheck
        }
        loginMutation?.mutate(updatedData,
            {
                onSuccess: (data: UserInfoType) => {
                    cookieHelper.setCookie('accessTokenSkyhaus', data?.token?.accessToken)
                    cookieHelper.setCookie('refreshTokenSkyhaus', data?.token.refreshToken)

                    store?.setUserInfo(data)
                    if (data?.user?.role === 'Client') {
                        router.push('/activity')
                    } else {
                        router.push('/board')
                    }

                },
                onError: (error: any) => {
                    if (error?.data?.message) {
                        addNotification(error?.data?.message)
                    }
                },
            }
        )
    }

    useEffect(() => {
      queryClient.invalidateQueries()
    
      
    }, [])
    

    return (
        <MotionWrapper>
            <section className='max-w-(--max-width) mx-auto px-4 wrap'>
                <H1Text className='mt-4'>Sign In</H1Text>
                <FormProvider {...methods}>
                    <div className={cn('w-full mt-9 mb-6')}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                            <Input name='email' placeholder={'Email'} label={'Email'} />
                            <Input inputType='password' inputDivClassName='' name='password' placeholder={'Password'} label={'Password'} />
                            <CheckboxInput checked={signInCheck} setChecked={setSignInCheck} className='mt-4' text={'Keep me signed in'} />
                            <Button
                                variant={allFieldsEmpty() ? 'disabled' : 'default'}
                                disabled={allFieldsEmpty()}
                                buttonDivClassName='w-full'
                                className='w-full mt-5'
                                loading={loginMutation?.isPending}
                                type='submit'
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </FormProvider>
                <Link className="text-xs underline" href='/forgot-password'>Forgot your password?</Link>
                <div className='text-xs leading-5 mt-6'>
                    <span>By continuing with Google, Apple, or Email, you agree to reelsync.io’s&nbsp;</span>
                    <Link className='underline' href='https://www.skyhausmedia.com/terms-and-conditions' target='_blank'>Terms of Service</Link>
                    <span>&nbsp;and&nbsp;</span>
                    <Link className='underline' href='https://www.skyhausmedia.com/privacy-policy' target='_blank'>Privacy Policy.</Link>
                </div>
            </section>
        </MotionWrapper>
    )
}

export default LoginForm