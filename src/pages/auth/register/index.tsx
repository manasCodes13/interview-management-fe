import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from "../../../../public/logo.png"
import React, { useState } from 'react'
import { shallow } from 'zustand/shallow';
import { userAuthDetails } from '@/store/global';
import { registerUser, verifyOtp } from '@/methods/auth/auth';
import { verifyOTP } from '@/methods/auth/authInterface';

const Register = () => {
    const router = useRouter()

    const [email, addAuthEmail] = userAuthDetails(
        (state) => [state.email, state.addAuthEmail],
        shallow
    )

    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState(0)

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        addAuthEmail(values.email)
        const registerUserAPIFunction = await registerUser(values);
        if (registerUserAPIFunction) {
            setOpen(true);
        }
    };

    const verifyOTPFunction = async ({ email, otp }: verifyOTP) => {
        const verifyOTPAPIFunction = await verifyOtp({ email, otp })
    }


    return (
        <>
            <div className='w-screen h-screen flex'>
                {/* Left Side */}
                <div className='w-1/3 h-full flex justify-center items-center flex-col'>
                    <Image src={Logo} alt='logo' width={100} height={100} />
                    <p className='text-3xl uppercase font-medium'>Create an account!</p>
                    <p className='text-xs text-gray-500'>Welcome to Yuva-Projects</p>
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
                                <Button type="primary" htmlType="submit" className="login-form-button w-full" size='large'>
                                    Create Account
                                </Button>
                                <p className='text-center mt-3 text-blue-600 underline '>
                                    <Link href="/auth/login">Login</Link>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                {/* Right Side */}
                <div className='w-2/3 h-full bg-blue-600'></div>
            </div>
            <Modal
                open={open}
                title="Verify Your Email"
                onCancel={handleCancel}
                centered
                footer={[
                    <Button onClick={() => {
                        verifyOTPFunction({ email, otp })
                        router.push("/auth/login")
                    }} className='text-white'>Verify</Button>
                ]}
            >
                <div className='w-full my-7 flex flex-col gap-3 text-gray-500'>
                    <p>Please go to your email, and enter the OTP recieved</p>
                    <Input
                        className='w-full'
                        size='large'
                        placeholder="Enter Your OTP"
                        onChange={(e) => {
                            setOtp(Number(e.target.value))
                        }}
                    />
                </div>

            </Modal>
        </>

    )
}

export default Register