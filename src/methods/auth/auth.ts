import { BASE_URL } from "@/utils/network"
import axios from "axios"
import { createOrgInterface, registerValues, resendOtpInterface, verifyOTP } from "./authInterface";


let token = ""



// API's
const registerUserAPI = "/auth/register"
const verifyOTPAPI = "/auth/verifyOtp"
const resendOtpAPI = "/auth/resendOtp"
const loginAPI = "/auth/login"

const createOrgAPI = "/organization/create"


export const registerUser = async (registerValues: registerValues) => {
    const body = {
        email: registerValues.email, password: registerValues.password
    }
    try {
        let userRegisterAPIcall = await axios.post(`${BASE_URL}${registerUserAPI}`, body)
        return userRegisterAPIcall?.data
    }
    catch (err: any) {
        return err?.response?.data
    }
};

export const verifyOtp = async ({ email, otp }: verifyOTP) => {
    const body = {
        email: email, otp: otp
    }
    try {
        let verifyOtpAPIcall = await axios.post(`${BASE_URL}${verifyOTPAPI}`, body)
        return verifyOtpAPIcall?.data
    }
    catch (err: any) {
        return err?.response?.data;
    }
}

export const resendOtp = async ({email}: resendOtpInterface) => {
    const body = {
        email: email
    }

    try {
        let resendOtpAPIcall = await axios.post(`${BASE_URL}${resendOtpAPI}`, body)

        if(resendOtpAPIcall) {
            return resendOtpAPIcall?.data
        }
    }
    catch(err: any) {
        return err?.response?.data;
    }
}

export const login = async (registerValues: registerValues) => {
    const body = {
        email: registerValues?.email,
        password: registerValues?.password
    }

    try {
        let loginAPIcall = await axios.post(`${BASE_URL}${loginAPI}`, body)
        if(loginAPIcall) {
            return loginAPIcall?.data
        }
    }
    catch(err: any) {
        return err?.response?.data;
    }
}

export const createOrg = async (createOrgValues: createOrgInterface) => {
    const body = {
        email: createOrgValues?.email,
        orgName: createOrgValues?.orgName,
        orgUsername: createOrgValues?.orgUsername
    }
    try {
        let createOrgAPICall = await axios.post(`${BASE_URL}${createOrgAPI}`, body)
        if(createOrgAPICall) {
            return createOrgAPICall?.data
        }
    }
    catch(err: any) {
        return err?.response?.data;
    }
}