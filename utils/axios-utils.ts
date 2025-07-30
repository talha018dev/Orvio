/* eslint-disable @typescript-eslint/no-use-before-define */
"use client"
import { MAIN_SERVICE_URL, clientId, clientSecret } from "@/config"
import cookieHelper from "@/helpers/cookie-helper"
import axios from "axios"
// import cookieHelper from './cookieHelper'

const client = axios.create({
  baseURL: MAIN_SERVICE_URL,
  // withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
})

client.interceptors.request.use(
  (config: any) => {
    const token = cookieHelper?.getCookieFromBrowser("accessTokenSkyhaus")
    const base64Credentials = btoa(`${clientId}:${clientSecret}`)
    if (token) {
      if (config["url"] != "/auth/sign-in") {
        config.headers["Authorization"] = `Bearer ${token}`
      } else {
        config.headers["Authorization"] = `Basic ${base64Credentials}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    console.log("555555555")
    if (err.response) {
      console.log("6666666")
      if (
        err.response.status === 401 &&
        originalConfig.url != "/auth/sign-in" &&
        cookieHelper?.getCookieFromBrowser("refreshTokenSkyhaus")
      ) {
        if (
          err?.config?.url == "/auth/sign-in" &&
          (err?.message == "Request failed with status code 401" ||
            err?.message == "Invalid Token")
        ) {
          console.log("33333333333")

          cookieHelper?.removeCookie("accessTokenSkyhaus")
          cookieHelper?.removeCookie("refreshTokenSkyhaus")
          if (window) {
            window.location.href = '/login'
          }
        } else {
          console.log("444444444444")
          originalConfig._retry = true
          try {
            const rs = await refreshToken()
            cookieHelper?.setCookie("accessTokenSkyhaus", rs?.data?.token?.accessToken)
            cookieHelper?.setCookie("refreshTokenSkyhaus", rs?.data?.token?.refreshToken)
            originalConfig._retry = true

            if (rs?.data?.token?.accessToken) {
              client.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${rs?.data?.token.accessToken}`
            } else {
              return Promise.reject(err)
            }
            if (
              originalConfig?.url !== "/assistant/message" &&
              !originalConfig?.url?.includes("/assistant/chat-history")
            ) {
              return client(originalConfig)
            }
          } catch (_error: any) {
            // dispatch({
            //   type: USER_LOGOUT,
            //   payload: null,
            // })
            // if (window) {
              window.location.href = '/login'
            // }
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data)
            }
            return Promise.reject(_error)
          }
        }
      } else if (
        err.response.status === 401 &&
        (err?.response?.data?.message == "Unauthorized" ||
          err?.response?.data?.message == "Invalid token")
      ) {
        console.log("7777777777")
        // dispatch({
        //   type: USER_LOGOUT,
        //   payload: null,
        // })
        if (window) {
          window.location.href = '/login'
        }
      }
      if (err.response.status === 403 && err.response.data) {
        console.log("8888888888888")
        return Promise.reject(err.response.data)
      }
      console.log("9999999999")
    }
    return Promise.reject(err)
  }
)

// Refresh token fetching
function refreshToken() {
  return client.post("/auth/sign-in", {
    token: cookieHelper?.getCookieFromBrowser("refreshTokenSkyhaus"),
    type: "token",
  })
}

export const axiosRequest = ({
  contentType = "application/json",
  headers = {},
  ...options
}) => {
  const base64Credentials = btoa(`${clientId}:${clientSecret}`)

  client.defaults.headers.common.Authorization = `Basic ${base64Credentials}`

  if (contentType === "multipart/form-data") {
    client.defaults.headers.common["Content-Type"] = "multipart/form-data"
  } else {
    client.defaults.headers.common["Content-Type"] = "application/json"
  }

  if (headers) {
    Object.assign(client.defaults.headers.common, headers)
  }

  return client(options)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      return response.data
    })
    .catch((error) => {
      throw error.response
    })
}
