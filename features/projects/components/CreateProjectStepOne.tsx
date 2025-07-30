'use client'

import MotionWrapper from '@/components/MotionWrapper'
import { Button } from '@/components/UI/Button'
import H2Text from '@/components/UI/H2Text'
import Input from '@/components/UI/Input'
import Loader from '@/components/UI/Loader'
import ReactSelect from '@/components/UI/ReactSelect'
import SpringModal from '@/components/UI/SpringModal'
import TextArea from '@/components/UI/TextArea'
import { createProject, updateProject } from '@/features/projects/queryFunctions/projectQueryFunctions'
import { getProjectDetailsQueryOptions, getTemporaryProjectDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import { createProjectStepOneSchema } from '@/features/projects/schemas/createProjectSchema'
import { CreateProjectStepOneType } from '@/features/projects/types/types'
import { cn } from '@/utils/tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

type CreateProjectStepOneProps = {
    projectIdFromEditProps?: string
}

const CreateProjectStepOne = ({ projectIdFromEditProps }: CreateProjectStepOneProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const projectId = projectIdFromEditProps ?? searchParams?.get('projectId') ?? ''
    const temporaryProject = searchParams?.get('temporaryProject') ?? ''

    const createProjectMutation = useMutation<CreateProjectStepOneType, any, any, any>({ mutationFn: projectIdFromEditProps ? updateProject : createProject })

    const projectTypeList = [
        { value: 'short', label: 'Short Video Project' },
        { value: 'long', label: 'Long Video Project' },
    ]
    const defaultValues = {
        projectName: '', projectType: ''
    }

    const { data: projectDetails, isFetching: projectDetailsLoader } = useQuery(temporaryProject ?  getTemporaryProjectDetailsQueryOptions(projectId) : getProjectDetailsQueryOptions(projectId))

    const [isOpen, setIsOpen] = useState(false);

    const formConfig: { [key: string]: any } = {}
    formConfig["resolver"] = zodResolver(createProjectStepOneSchema)
    formConfig["defaultValues"] = defaultValues
    const methods = useForm(formConfig)

    useEffect(() => {
        if (projectDetails) {
            methods.setValue('projectName', projectDetails?.name)
            methods.setValue('projectType', { value: projectDetails?.type, label: projectDetails?.type === 'long' ? 'Long Video Project' : 'Short Video Project' })
            methods.setValue('brief', projectDetails?.brief)
        }
    }, [projectDetails])

    const allFieldsEmpty = () => {
        const { projectName, projectType, brief } = methods.watch();
        return !(projectName && projectType) || brief?.length > 2000;
    };

    const onSubmit = (data: FieldValues) => {
        let formData = new FormData();
        const fields = ['projectName', 'brief'];
        fields.map(field => formData.append(field, methods?.getValues(field) ?? ''));

        if (projectId) {
            formData.append('projectId', projectId ?? '')
        }
        formData.append('step', 'project')
        formData.append('projectType', methods?.getValues('projectType')?.value ?? '')

        const updatedData = {
            formData,
            projectId
        }
        for (const value of formData.values()) {
          }

        createProjectMutation.mutate(updatedData, {
            onSuccess: (data: any) => {
                if (projectIdFromEditProps) {
                    router.push(`/projects/${projectId}/edit/step-2?temporaryProject=true`)
                } else {
                    router.push(`/projects/create/step-2?projectId=${data?._id}`)
                }
            },
            onError: (error: any) => {
            },
        })
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            {
                projectDetailsLoader ? <Loader divClassName='bg-white min-h-114 mt-4 rounded-lg' /> :
                    <MotionWrapper>
                        <section className='bg-white p-4 pb-0 rounded-xl mt-4'>
                            <H2Text>Project Details</H2Text>
                            <FormProvider {...methods}>
                                <div className={cn('w-full mt-6')}>
                                    <Input name='projectName' placeholder={'Title/Name'} label={'Title/Name'} colorInverse={true} />
                                    <ReactSelect
                                        name={'projectType'}
                                        placeholder={"Select"}
                                        label={'Type'}
                                        listItems={projectTypeList}
                                        methods={methods}
                                    />
                                    <TextArea name={'brief'} placeholder={'Write your brief here'} label={'Brief'} labelOptional colorInverse={true} maxLimit={2000} />
                                </div>
                            </FormProvider>
                        </section>
                    </MotionWrapper>
            }
            <section className='flex items-center'>
                <Button
                    variant={'destructiveOutline'}
                    buttonDivClassName='w-full'
                    className='w-20 mt-5'
                    type='button'
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant={allFieldsEmpty() ? 'disabled' : 'default'}
                    disabled={allFieldsEmpty()}
                    buttonDivClassName='w-full'
                    className='w-20 mt-5 ml-auto'
                    type='submit'
                    loading={createProjectMutation?.isPending}
                >
                    Next
                </Button>
            </section>
            <SpringModal projectIdFromEditProps={projectIdFromEditProps} isOpen={isOpen} setIsOpen={setIsOpen} />
        </form>
    )
}

export default CreateProjectStepOne