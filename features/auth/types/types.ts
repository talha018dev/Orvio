export type LoginSuccessType = {
    _id: string
    created_by: string
    clientId: string
    email: string
    name: string
    phone: string
    status: string
    role: string
    registrationType: string
    isVerified: boolean
    isRegistered: boolean
    resetLink: string
    deactivateDate: any
    verificationCode: any
    avatar: any
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
    scopes: string[]
}

export type LoginErrorType = {
    error: string
    statusCode: number
    message: string
}

//UserInfoType
export type UserInfoType = {
    token: Token
    user: User | null
}

export interface Token {
    accessToken: string | undefined
    refreshToken: string
}

export interface User {
    _id: string
    created_by: string
    clientId: string
    email: string
    name: string
    phone: string
    status: string
    role: 'Super Admin' | 'Client'
    registrationType: string
    isVerified: boolean
    isRegistered: boolean
    resetLink: string
    deactivateDate: any
    verificationCode: any
    avatar: any
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
    scopes: string[]
}

export interface ForgotPasswordSuccessType {
    user: {
        _id: string
        createdBy: string
        email: string
        password: string
        name: string
        phone: string
        status: string
        role: string
        registrationType: string
        isVerified: boolean
        isRegistered: boolean
        resetLink: string
        deactivateDate: any
        verificationCode: any
        avatar: any
        lastLogin: any
        clientId: string
        createdAt: string
        updatedAt: string
        __v: number
    }
    forgetPassLink: string
}
