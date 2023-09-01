import { BASE_URL } from "@/utils/network"
import axios from "axios"
import { registerValues, verifyOTP } from "./authInterface";

// API's
const registerUserAPI = "/auth/register"
const verifyOTPAPI = "/auth/verifyOtp"




export const registerUser = async (registerValues: registerValues) => {
    const body = {
        email: registerValues.email, password: registerValues.password
    }
    try {
        let userRegisterAPIcall = await axios.post(`${BASE_URL}${registerUserAPI}`, body)
        return userRegisterAPIcall?.data
    }
    catch (err) {
        return err
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
    catch (err) {
        return err;
    }
}