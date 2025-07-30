'use client'

import { Button } from '@/components/UI/Button'
import H1Text from '@/components/UI/H1Text'
import Input from '@/components/UI/Input'
import { resetPassword, setupPassword } from '@/features/auth/queryFunctions/loginQueryFunctions'
import { resetPasswordSchema } from '@/features/auth/schemas/resetPasswordSchema'
import { UserInfoType } from '@/features/auth/types/types'
import { useNotificationStore } from '@/store/useNotificationStore'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type ResetPasswordFormProps = {
}

const ResetPasswordForm = ({ }: ResetPasswordFormProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const setupPasswordParam = searchParams.get('setupPassword')

    const resetPasswordMutation = useMutation({ mutationFn: setupPasswordParam ? setupPassword : resetPassword })

    const defaultValues = {
        confirmPassword: '', password: ''
    }

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(resetPasswordSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    const allFieldsEmpty = () => {
        const { confirmPassword, password } = methods.watch();
        return !(confirmPassword && password);
    };

    const { addNotification } = useNotificationStore()

    const onSubmit = (data: FieldValues) => {
        const updatedData = {
            ...data,
            token: token
        }
        resetPasswordMutation?.mutate(updatedData,
            {
                onSuccess: (data: UserInfoType) => {
                    router.push('/forgot-password/verify/success')
                },
                onError: (error: any) => {
                    if (error?.data?.message) {
                        addNotification(error?.data?.message)
                    }
                    router.push('/forgot-password/verify/expired')
                },
            }
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="landing"
        >
            <section className='max-w-(--max-width) mx-auto px-4 wrap'>
                <H1Text className='mt-4'>{setupPasswordParam ? 'Setup' : 'Reset'} Password</H1Text>
                <FormProvider {...methods}>
                    <div className={cn('w-full mt-9 mb-6')}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                            <p className="mb-2 text-xs text-[#6B7280]">Please enter a new password for your Orvio account.</p>
                            <div className='relative'>
                                <Input inputType='password' inputDivClassName='' name='password' placeholder={'Password'} label={'Password'} />
                                {!methods?.formState?.errors["password"] ?
                                    <p className='text-sm text-[#64748B] absolute transform bottom-0 translate-y-[calc(100%-28px)]'>Use at least 8 characters, with a mix of upper & lower case letters and a number.</p>
                                    : null
                                }
                            </div>
                            <Input inputType='password' inputDivClassName='pt-4' name='confirmPassword' placeholder={'Retype Password'} label={'Retype Password'} />
                            <Button
                                variant={allFieldsEmpty() ? 'disabled' : 'default'}
                                disabled={allFieldsEmpty()}
                                buttonDivClassName='w-full'
                                className='w-full mt-2'
                                loading={resetPasswordMutation?.isPending}
                                type='submit'
                            >
                                {setupPasswordParam ? 'Setup' : 'Reset Password'}
                            </Button>
                        </form>
                    </div>
                </FormProvider>
                <div className='text-xs leading-5 mt-10 text-center'>
                    <span>Need additional help? </span>
                    <Link className='underline' href='#' target='_blank'>Contact us</Link>
                </div>
            </section>
        </motion.div>
    )
}

export default ResetPasswordForm