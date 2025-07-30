import { useAuthStore } from '@/features/auth/store/useAuthStore'
import usePersistStore from '@/helpers/usePersistStore'

const useUserInfo = () => {
    const store = usePersistStore(useAuthStore, (state) => state)
    
    return store?.userInfo
}

export default useUserInfo