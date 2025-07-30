'use client'

import { Button } from '@/components/UI/Button'
import H1Text from '@/components/UI/H1Text'
import Input from '@/components/UI/Input'
import { resetPasswordSchema } from '@/features/auth/schemas/resetPasswordSchema'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { UserInfoType } from '@/features/auth/types/types'
import { changeUserPassword } from '@/features/profile/queryFunctions/profileQueryFunctions'
import usePersistStore from '@/helpers/usePersistStore'
import { useNotificationStore } from '@/store/useNotificationStore'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type ChangePasswordFormProps = {
    userId: string | undefined
}

const ChangePasswordForm = ({ userId }: ChangePasswordFormProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const store = usePersistStore(useAuthStore, (state) => state)

    const changePasswordMutation = useMutation({ mutationFn: changeUserPassword })

    const defaultValues = {
        oldPassword: '', confirmNewPassword: '', password: ''
    }

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(resetPasswordSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)


    const allFieldsEmpty = () => {
        const { oldPassword, confirmNewPassword, newPassword } = methods.watch();
        return !(oldPassword && confirmNewPassword && newPassword);
    };

    const { addNotification } = useNotificationStore()

    const onSubmit = (data: FieldValues) => {
        const updatedData = {
            ...methods.watch(),
            userId
        }
        changePasswordMutation?.mutate(updatedData,
            {
                onSuccess: (data: UserInfoType) => {
                    // logout()
                    router.push('/success')
                },
                onError: (error: any) => {
                    if (error?.data?.message) {
                        addNotification(error?.data?.message)
                    }
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
                <H1Text className='mt-4'>Change Password</H1Text>
                <FormProvider {...methods}>
                    <div className={cn('w-full mt-9 mb-6')}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                            <p className="mb-2 text-xs text-[#6B7280]">Please enter a new password for your reelsync.io account.</p>
                            <Input inputType='password' inputDivClassName='pt-4' name='oldPassword' placeholder={'Old Password'} label={'Old Password'} />
                            <div className='relative'>
                                <Input inputType='password' inputDivClassName='' name='newPassword' placeholder={'Password'} label={'Password'} />
                                {!methods?.formState?.errors["newPassword"] ?
                                    <p className={cn('text-sm text-[#6B7280] absolute transform bottom-0 translate-y-[calc(100%-28px)]', {'text-errorColor': methods?.formState?.errors["newPassword"]})}>
                                        Use at least 8 characters, with a mix of upper & lower case letters and a number.
                                    </p>
                                    : null
                                }
                            </div>
                            <Input inputType='password' inputDivClassName='pt-4' name='confirmNewPassword' placeholder={'Retype Password'} label={'Retype Password'} />
                            <Button
                                variant={allFieldsEmpty() ? 'disabled' : 'default'}
                                disabled={allFieldsEmpty()}
                                buttonDivClassName='w-full'
                                className='w-full mt-2'
                                loading={changePasswordMutation?.isPending}
                                type='submit'
                            >
                                Change Password
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

export default ChangePasswordForm