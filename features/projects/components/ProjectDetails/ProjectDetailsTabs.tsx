'use client'

import { AceternityTab } from '@/components/AceternityTab'
import MotionWrapper from '@/components/MotionWrapper'
import H1Text from '@/components/UI/H1Text'
import Loader from '@/components/UI/Loader'
import EditProjectButton from '@/features/projects/components/EditProject/EditProjectButton'
import Brief from '@/features/projects/components/ProjectDetails/Brief'
import Client from '@/features/projects/components/ProjectDetails/Client'
import Collaborator from '@/features/projects/components/ProjectDetails/Collaborator'
import Details from '@/features/projects/components/ProjectDetails/Details'
import Files from '@/features/projects/components/ProjectDetails/Files'
import FileUploadModal from '@/features/projects/components/ProjectDetails/FileUploadModal'
import { getProjectDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import useUserInfo from '@/hooks/useUserInfo'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type ProjectDetailsProps = {
    projectId: string
}

const ProjectDetailsTabs = ({ projectId }: ProjectDetailsProps) => {
    const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)

    const userInfo = useUserInfo()

    const { data: projectDetails, isFetching: projectDetailsLoader, refetch: refetchProjectDetails } = useQuery(getProjectDetailsQueryOptions(projectId))
    const tabs = [
        {
            title: "Details",
            value: "Details",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Details' || !searchParams?.get('currentTab') ?
                            <Details projectDetails={projectDetails} /> : null
                    }
                </>
            ),
        },
        {
            title: "Brief",
            value: "Brief",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Brief' ?
                            <Brief projectDetails={projectDetails} /> : null
                    }
                </>
            ),
        },
        ...userInfo?.user?.role !== 'Client' ? [{
            title: "Client",
            value: "Client",
            content: searchParams?.get('currentTab') === 'Client' ?
                <Client projectDetails={projectDetails} /> : null,
        }] : [],
        {
            title: "Collaborator",
            value: "Collaborator",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Collaborator' ?
                            <Collaborator projectDetails={projectDetails} /> : null
                    }
                </>
            ),
        },
        {
            title: "Files",
            value: "Files",
            content: (
                <>
                    {
                        searchParams?.get('currentTab') === 'Files' ?
                            <>
                                <Files
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    projectDetails={projectDetails}
                                />
                            </> : null
                    }
                </>
            ),
        },
    ];

    if (projectDetailsLoader) return <Loader divClassName=' min-h-114 mt-4 rounded-lg' />

    return (
        <MotionWrapper>
            <section className='flex items-center mb-6'>
                <H1Text className='truncate'>{projectDetails?.name}</H1Text>
                {
                    userInfo?.user?.role === 'Client' ? null :
                        <EditProjectButton projectId={projectId} />
                }
            </section>
            <section className="[perspective:1000px] relative b flex flex-col w-full  items-start justify-start mt-6">
                <AceternityTab tabs={tabs} />
            </section>
            <FileUploadModal refetchProjectDetails={refetchProjectDetails} projectId={projectId} isOpen={isOpen} setIsOpen={setIsOpen} />
        </MotionWrapper>
    )
}

export default ProjectDetailsTabs