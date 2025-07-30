import {useAuthStore} from '@/features/auth/store/useAuthStore'
import cookieHelper from '@/helpers/cookie-helper'
import usePersistStore from '@/helpers/usePersistStore'
import {useRouter} from 'next/navigation'

export function useLogout() {
  const store = usePersistStore(useAuthStore, (state) => state)
  const router = useRouter()

  const logout = () => {
    cookieHelper.removeCookie('accessTokenSkyhaus')
    cookieHelper.removeCookie('refreshTokenSkyhaus')
    store?.setUserInfo(undefined)
    router.push('/login')
  }
  const logoutWithoutRedirect = () => {
    cookieHelper.removeCookie('accessTokenSkyhaus')
    cookieHelper.removeCookie('refreshTokenSkyhaus')
    store?.setUserInfo(undefined)
  }
  return {logout, logoutWithoutRedirect}
}
