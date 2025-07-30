import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {UserInfoType} from '../types/types'
import Cookies from 'js-cookie' // assumes this runs in browser

type useAuthStore = {
  userInfo: UserInfoType | undefined
  setUserInfo: (info: UserInfoType | undefined) => void
}

export const useAuthStore = create<useAuthStore>()(
  persist(
    (set, get) => ({
      userInfo: {
        token: {
          accessToken: Cookies.get('accessTokenSkyhaus'),
          refreshToken: Cookies.get('refreshTokenSkyhaus') ?? '',
        },
        user: null,
      },
      setUserInfo: (info) => {
        set({userInfo: info})
      },
    }),
    {name: 'useAuthStore'}
  )
)
