import { getIncompleteUser, getUserDetails } from '@/features/users/queryFunctions/userQueryFunctions'
import { IncompleteUsersType } from '@/features/users/types/types'
import { useQuery } from '@tanstack/react-query'

const useUser = (userId?: string) => {
    const { data: incompleteUser, isFetching: incompleteUserLoader } = useQuery<IncompleteUsersType>({
        queryKey: ['getIncompleteUser'],
        queryFn: () => getIncompleteUser(),
        staleTime: 0
    })



    return { incompleteUser, incompleteUserLoader }

}

export default useUser