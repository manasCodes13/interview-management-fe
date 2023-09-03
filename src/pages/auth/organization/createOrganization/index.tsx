import React from "react";
import Logo from "../../../../../public/logo.png";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { createOrg } from "@/methods/auth/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


const CreateOrganization = () => {

  const router = useRouter();

  const onFinish = async (values: any) => {
    const createOrganizationFunCall = await createOrg(values);

    if(createOrganizationFunCall?.success) {
      toast(`${createOrganizationFunCall?.message}`, { autoClose: 2000, type: 'success' })
      router.push("/dashboard")
    }
    else {
      toast(`${createOrganizationFunCall?.message}`, { autoClose: 2000, type: 'error' })
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-600 flex justify-center items-center">
      <div className="w-[40%] h-[60%] bg-white rounded-2xl shadow-sm shadow-black flex flex-col items-center">
        <Image src={Logo} alt="logo" width={70} height={70} />
        <span className="text-2xl uppercase font-semibold mb-10">Create Organization</span>
        <Form
          name="normal_login"
          className="login-form w-full"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{width: "90%"}}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            className="w-full"
          >
            <Input className="w-full" size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="orgName"
            className="mt-8"
            rules={[{ required: true, message: "Please enter an organization name!" }]}
          >
            <Input size="large" type="text" placeholder="Organization Name" />
          </Form.Item>
          <Form.Item
            name="orgUsername"
            className="mt-8"
            rules={[{ required: true, message: "Please enter a unique username for your organization!" }]}
          >
            <Input size="large" type="text" placeholder="Organization UserName" />
          </Form.Item>

          <Form.Item className="w-full">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full mt-10"
              size="large"
            >
              Create Organization
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateOrganization;
