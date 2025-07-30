'use client'

import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT } from '@/constants/colorConstants'
import { getIncompleteProjectDetailsQueryOptions } from '@/features/projects/queryOptions/projectQueryOptions'
import useUserInfo from '@/hooks/useUserInfo'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CreateProjectButton = () => {
  const router = useRouter()
  const [createButtonClicked, setCreateButtonClicked] = useState(false)

  const userInfo = useUserInfo()

  const { data: incompleteProjectDetails, isFetching: incompleteProjectDetailsLoader } = useQuery(getIncompleteProjectDetailsQueryOptions(createButtonClicked))

  useEffect(() => {
    if (createButtonClicked && !incompleteProjectDetailsLoader) {
      setCreateButtonClicked(false)
      if (incompleteProjectDetails?.length) {
        router.push(`/projects/create/step-1?projectId=${incompleteProjectDetails[0]?._id}`)
      } else {
        router.push(`/projects/create/step-1`)
      }
    }
  }, [createButtonClicked, incompleteProjectDetailsLoader, incompleteProjectDetails?.length])

  if (userInfo?.user?.role === 'Client') return null

  return (
    <div onClick={() => setCreateButtonClicked(true)} className="ml-auto flex items-center gap-1 border border-borderColor bg-white text-primaryText hover:bg-transparent focus:bg-transparent justify-center transition-all duration-300 whitespace-nowrap py-2 px-4 cursor-pointer rounded-full font-medium focus-visible:outline-none disabled:pointer-events-none disabled:bg-disabledBg">
      <Icon name={"Plus"} color={COLOR_PRIMARY_TEXT} fontSize={12} />
      <div>Create</div>
    </div>
  )
}

export default CreateProjectButton