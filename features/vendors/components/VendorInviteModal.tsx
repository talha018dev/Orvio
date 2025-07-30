'use client'

import { Button } from '@/components/UI/Button'
import H1Text from '@/components/UI/H1Text'
import H2Text from '@/components/UI/H2Text'
import Icon from '@/components/UI/Icon'
import Input from '@/components/UI/Input'
import Label from '@/components/UI/Label'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { emailValidator } from '@/constants/globalConstants'
import { inviteVendor } from '@/features/vendors/queryFunctions/vendorQueryFunctions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const VendorInviteModal = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const inviteVendorMutation = useMutation<any, any, any, any>({ mutationFn: inviteVendor })
    const [opened, { open, close }] = useDisclosure(false);

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(z.object({
        email: z.string({ required_error: "Email address is required." }).refine(
            (value) => {
                return !value || emailValidator.test(value)
            },
            {
                message: 'Invalid email address.',
            }
        ),
    }))
    formConfig["defaultValues"] = { email: '' }
    const methods = useForm(formConfig)

    const allFieldsEmpty = () => {
        const { email } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return !email || hasErrors;
    };

    const onSubmit = (data: FieldValues) => {
        inviteVendorMutation.mutate(data?.email,
            {
                onSuccess(data, variables, context) {
                    close()
                    queryClient.invalidateQueries({ queryKey: ['getVendorsList', { page: 1, size: 10, search: '' }] })
                    toast('Vendor invitation has been sent.')
                    // router.push(`/vendors?inviteSent=true`)
                },
                onError(error, variables, context) {
                    methods.setError('email', { message: 'Email address already exists.' })
                },
            }
        )
    }

    return (
        <section className="flex items-center mb-6">
            <H1Text>All Vendors</H1Text>
            <div
                onClick={open}
                className="ml-auto flex items-center gap-1 border border-borderColor bg-white text-primaryText hover:bg-transparent focus:bg-transparent justify-center transition-all duration-300 whitespace-nowrap py-2 px-4 cursor-pointer rounded-full font-medium focus-visible:outline-none disabled:pointer-events-none disabled:bg-disabledBg"
            >
                <Icon name={"Plus"} color={COLOR_PRIMARY_TEXT} fontSize={12} />
                <div>Invite</div>
            </div>
            <Modal
                opened={opened}
                onClose={() => {
                    close()
                    methods.reset()
                }}
                centered
                withCloseButton={false}
                className='!rounded-xl'
            >
                <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
                    <FormProvider {...methods}>
                        <H2Text>Invite Vendors</H2Text>
                        <Label className='mt-2 mb-6 text-sm font-normal'>An invitation email with a self-sign-up link will be sent to the vendor using the provided email.</Label>
                        <Input inputDivClassName='' name='email' placeholder={'Email'} label={'Email'} colorInverse={true} />
                        <section className="flex items-center mt-12 gap-2">
                            <Button
                                buttonDivClassName="ml-auto"
                                onClick={() => {
                                    close()
                                    methods.reset()
                                }}
                                variant={'outline'}
                            >
                                Close
                            </Button>
                            <Button
                                type='submit'
                                buttonDivClassName=""
                                variant={allFieldsEmpty() ? 'disabled' : 'default'}
                                disabled={allFieldsEmpty()}
                                loading={inviteVendorMutation?.isPending}
                            >
                                Send Invite
                            </Button>
                        </section>
                    </FormProvider>
                </form>
            </Modal>
        </section>
    )
}

export default VendorInviteModal