'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import ReactMultiSelect from '@/components/UI/ReactMultiSelect'
import SpringModal from '@/components/UI/SpringModal'
import useProjects from '@/features/projects/hooks/useProjects'
import { addExistingClientToProject } from '@/features/users/queryFunctions/userQueryFunctions'
import { cn } from '@/utils/tailwind-merge'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type CreateProjectStepThreeProps = {
    projectIdFromEditProps?: string
}

const CreateUserStepTwo = ({ projectIdFromEditProps }: CreateProjectStepThreeProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const userIdFromParams = searchParams?.get('userId') ?? ''

    const createUserMutation = useMutation<any, any, any, any>({ mutationFn: addExistingClientToProject })
    const { allProjects } = useProjects()
    

    const defaultValues = {
        projectId: []
    }
    const formConfig: { [key: string]: any } = {}
    // formConfig["resolver"] = zodResolver(createProjectStepThreeSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    const [isOpen, setIsOpen] = useState(false);




    const allFieldsEmpty = () => {
        const { projectId } = methods.watch();
        const hasErrors = methods?.formState?.errors && Object.keys(methods.formState.errors).length > 0;
        return (!projectId?.length || hasErrors)
    };

    const onSubmit = (data: FieldValues) => {

        const updatedData = {
            clientId: userIdFromParams,
            projectId: data?.projectId?.map((project: any) => project?.value)?.join(','),
        }

        createUserMutation.mutate(updatedData, {
            onSuccess: (data: any) => {
                // queryClient.invalidateQueries({ queryKey: ['getCompletedProjectsList', { page: 1, size: 10, search: '' }] });
                router.push(`/users?userCreated=true`)
            },
            onError: (error: any) => {
                if (error?.data?.message?.includes('Email address already exists')) {
                    methods.setError('email', { message: 'Email address already exists.' })
                }
                if (error?.data?.message?.includes(`Admin email can't be used as a client email`)) {
                    methods.setError('email', { message: `Admin email can't be used as a client email.` })
                }
            },
        })
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            {
                // projectDetailsLoader ? <Loader divClassName='bg-white min-h-114 mt-4 rounded-lg' /> :
                <section className={cn('bg-white p-4 rounded-xl mt-4')}>
                    <H2Text>Onboarding Details</H2Text>
                    <MotionWrapper>
                        <FormProvider {...methods}>
                            <div className={cn('w-full mt-6')}>
                                <ReactMultiSelect
                                    name={'projectId'}
                                    placeholder={"Select"}
                                    label={'Projects'}
                                    labelClassName={'text-primaryText'}
                                    listItems={allProjects?.data?.map(project => {
                                        return { value: project?._id, label: project?.name }
                                    })}
                                    methods={methods}
                                />
                            </div>
                        </FormProvider>
                    </MotionWrapper>
                </section>
            }
            <section className='flex items-center pb-4'>
                <Button
                    variant={'destructiveOutline'}
                    buttonDivClassName='w-full'
                    className='w-20 mt-5'
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant={'ghost'}
                    buttonDivClassName='w-fit'
                    className='w-20 mt-5'
                    onClick={() => router.back()}
                >
                    Back
                </Button>
                <Button
                    variant={allFieldsEmpty() ? 'disabled' : 'default'}
                    disabled={allFieldsEmpty()}
                    buttonDivClassName='w-fit'
                    className='w-20 mt-5 ml-2'
                    type='submit'
                    loading={createUserMutation?.isPending}
                >
                    {
                        projectIdFromEditProps ? 'Update' : 'Create'
                    }
                </Button>
            </section>
            <SpringModal projectIdFromEditProps={projectIdFromEditProps} isOpen={isOpen} setIsOpen={setIsOpen} />
        </form>
    )
}

export default CreateUserStepTwo