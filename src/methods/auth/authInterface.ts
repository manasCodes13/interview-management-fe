export interface registerValues {
    email: string,
    password: string
}

export interface verifyOTP {
    email: string,
    otp: number
}

export interface resendOtpInterface {
    email: string
}

export interface createOrgInterface {
    email: string,
    orgName: string,
    orgUsername: string
}