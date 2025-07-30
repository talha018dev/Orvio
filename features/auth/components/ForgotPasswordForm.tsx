'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import H1Text from '@/components/UI/H1Text'
import Icon from '@/components/UI/Icon'
import Input from '@/components/UI/Input'
import Text from '@/components/UI/Text'
import { COLOR_SUCCESS } from '@/constants/colorConstants'
import { forgotPassword } from '@/features/auth/queryFunctions/loginQueryFunctions'
import { forgotPasswordSchema } from '@/features/auth/schemas/forgotPasswordSchema'
import { ForgotPasswordSuccessType } from '@/features/auth/types/types'
import { useNotificationStore } from '@/store/useNotificationStore'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type ForgotPasswordFormProps = {
}

const TimerValue = 900

const ForgotPasswordForm = ({ }: ForgotPasswordFormProps) => {
    const router = useRouter()
    const { addNotification } = useNotificationStore()

    const searchParams = useSearchParams()
    const emailParam = searchParams.get('email')
    const [timer, setTimer] = useState(Number(localStorage.getItem("forgotPasswordTimer")) ?? 0)

    const forgotPasswordMutation = useMutation({ mutationFn: forgotPassword })

    const defaultValues = {
        email: ''
    }

    const formConfig: { [key: string]: any } = {}

    if (forgotPasswordSchema) {
        formConfig["resolver"] = zodResolver(forgotPasswordSchema)
    }
    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues
    }
    const methods = useForm(formConfig)

    const allFieldsEmpty = () => {
        const { email } = methods.watch();
        return !email
    };

    const onSubmit = (data: FieldValues) => {
        handleForgotPassword(data.email)
    }

    const handleForgotPassword = (email: string) => {
        forgotPasswordMutation.mutate(email, {
            onSuccess: (data: ForgotPasswordSuccessType) => {
                router.push(`/forgot-password?email=${data?.user?.email}`)
                localStorage.setItem("forgotPasswordTimer", Date.now().toString())
                setTimer(TimerValue)
            },
            onError: (error: any) => {
                if (error?.data?.message) {
                    addNotification(error?.data?.message)
                }
            }
        })
    }

    // Check localStorage for remaining time
    useEffect(() => {
        const storedTime = localStorage.getItem("forgotPasswordTimer")
        if (storedTime) {
            const elapsedTime = Math.floor((Date.now() - Number(storedTime)) / 1000)
            const remainingTime = Math.max(0, TimerValue - elapsedTime)
            setTimer(remainingTime)
        }
    }, [])

    // Timer countdown effect
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            localStorage.removeItem("forgotPasswordTimer")
        }
    }, [timer])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes} min ${secs < 10 ? '0' : ''}${secs} sec`
    }

    return (
        <MotionWrapper>
            {
                !emailParam ?
                    <section className='max-w-(--max-width) mx-auto px-4 wrap'>
                        <H1Text className='mt-4'>Forgot Password</H1Text>
                        <Text className='mt-10 text-xs text-secondaryText'>To reset your password, please enter the email address of your Orvio account.</Text>
                        <FormProvider {...methods}>
                            <div className={cn('w-full mt-2 mb-10')}>
                                <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                                    <Input name='email' placeholder={'Email'} label={'Email'} />
                                    <Button
                                        variant={allFieldsEmpty() ? 'disabled' : 'default'}
                                        disabled={allFieldsEmpty()}
                                        buttonDivClassName='w-full'
                                        className='w-full mt-5'
                                        loading={forgotPasswordMutation?.isPending}
                                    >
                                        Continue
                                    </Button>
                                </form>
                            </div>
                        </FormProvider>
                        <Link className="text-xs underline text-center w-full inline-block" href='/login'>Go to sign in</Link>
                    </section> : null
            }
            {
                emailParam ?
                    <section className='max-w-(--max-width) mx-auto px-4 wrap'>
                        <H1Text className='mt-4'>Check Your Email</H1Text>
                        <Icon name={'PaperPlaneTilt'} color={COLOR_SUCCESS} fontSize={55} className='w-full text-center mt-10' weight='regular' />
                        <Text className='mt-6 text-xs text-primaryText'>Please check the email address {emailParam} for instructions to reset your password.</Text>
                        <div className={cn('w-full mt-2 mb-10')}>
                            <Button
                                variant={timer > 0 ? 'disabled' : 'outline'}
                                buttonDivClassName='w-full'
                                className={cn("w-full mt-6", { 'cursor-not-allowed bg-transparent text-gray-400 border-2': timer > 0 })}
                                disabled={timer > 0}
                                onClick={() => handleForgotPassword(emailParam)}
                                loading={forgotPasswordMutation?.isPending}
                            >
                                Resend Email
                            </Button>
                            {timer > 0 ? <p className='mt-2.5 text-xs text-[#B45309] '>Resend option will be available in {formatTime(timer)}.</p> : null}
                        </div>
                        <Link className="text-xs underline text-center w-full inline-block" href='/login'>Go to sign in</Link>
                    </section> : null
            }
        </MotionWrapper>
    )
}

export default ForgotPasswordForm