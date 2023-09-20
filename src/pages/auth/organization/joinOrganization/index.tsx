import React from "react";
import Logo from "../../../../../public/logo.png";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { joinOrganization } from "@/methods/organization/organization";
import { useAtom } from "jotai";
import { authDetails } from "@/store/global";


const JoinOrganization = () => {
    const router = useRouter();
    // const [userDetailsNew, setUserDetailsNew] = useAtom(authDetails)

    let accessToken: any;
    let userDetails: any;
    let email: any;

    if (typeof window != "undefined") {
        accessToken = localStorage?.getItem("accessToken");
        userDetails = localStorage?.getItem("user");
        email = JSON.parse(userDetails)?.data?.email;
    }


    // console.log('userDetailsNew', userDetailsNew)


    const onFinish = async (values: any) => {
        const joinOrganizationFunc = await joinOrganization({ accessToken: accessToken, email: values?.email, id: values?.id });

        if (joinOrganizationFunc?.success) {
            toast(`${joinOrganizationFunc?.message}`, { autoClose: 2000, type: 'success' })
            router.push("/dashboard")
        }
        else {
            toast(`${joinOrganizationFunc?.message}`, { autoClose: 2000, type: 'error' })
        }
    };

    return (
        <div className="w-screen h-screen bg-blue-600 flex justify-center items-center">
            <div className="w-[40%] h-[50%] bg-white rounded-2xl shadow-sm shadow-black flex flex-col items-center">
                <Image src={Logo} alt="logo" width={70} height={70} />
                <span className="text-2xl uppercase font-semibold mb-10">Join Organization</span>
                <Form
                    name="normal_login"
                    className="login-form w-full"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ width: "90%" }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please input your Email!" }]}
                        className="w-full"
                    >
                        <Input className="w-full" size="large" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="id"
                        className="mt-8"
                        rules={[{ required: true, message: "Please enter an organization id!" }]}
                    >
                        <Input size="large" type="text" placeholder="Organization ID" />
                    </Form.Item>


                    <Form.Item className="w-full">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button w-full mt-10"
                            size="large"
                        >
                            Join Organization
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default JoinOrganization;
