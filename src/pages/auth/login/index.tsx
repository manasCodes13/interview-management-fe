import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd'
import Image from 'next/image';
import Link from 'next/link';
import Logo from "../../../../public/logo.png"
import React from 'react'
import { useRouter } from 'next/router';
import { login } from '@/methods/auth/auth';
import { toast } from "react-toastify";
import { authDetails } from '@/store/global';
import { useAtom } from 'jotai';


const Login = () => {
    const router = useRouter()
    const [loginDetails, setLoginDetails] = useAtom(authDetails)

    const onFinish = async (values: any) => {
        const loginApiCall = await login(values)
        if (loginApiCall?.success) {
            console.log('loginApiCall', loginApiCall)
            toast(`${loginApiCall?.message}`, { autoClose: 2000, type: 'success' })
            setLoginDetails(loginApiCall)
            localStorage.setItem("user", JSON.stringify(loginApiCall));
            localStorage.setItem("accessToken", loginApiCall?.accessToken);
        }
        else {
            toast(`${loginApiCall?.message}`, { autoClose: 2000, type: 'error' })
        }
    };

    return (
        <div className='w-screen h-screen flex'>
            {/* Left Side */}
            <div className='w-1/3 h-full flex justify-center items-center flex-col'>
                <Image src={Logo} alt='logo' width={100} height={100} />
                <p className='text-3xl uppercase font-medium'>Welcome Back!</p>
                <p className='text-xs text-gray-500'>Hope you are in love with Yuva-Projects</p>
                <div className='mt-10 w-[70%]'>
                    <Form
                        name="normal_login"
                        className="login-form w-full"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}

                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                            className='w-full'
                        >
                            <Input className='w-full' size='large' prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            className='mt-8'
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                size='large'
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item className='w-full'>
                            <Button type="primary" htmlType="submit" className="login-form-button w-full" size='large' onClick={() => {
                                router.push("/dashboard")
                            }} >
                                Log in
                            </Button>
                            <p className='text-center mt-3 text-blue-600 underline '>
                                <Link href="/auth/register">Create Account</Link> | <Link href="/auth/forgetPassword">Forget Password</Link>
                            </p>

                        </Form.Item>
                    </Form>
                </div>
            </div>
            {/* Right Side */}
            <div className='w-2/3 h-full bg-blue-600'></div>
        </div>
    )
}

export default Login