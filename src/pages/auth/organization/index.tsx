import { Card } from "antd";
import Image from "next/image";
import React from "react";
import Logo from "../../../../public/logo.png";
import CreateOrganization from "../../../../public/assets/createOrganization.png";
import JoinOrganization from "../../../../public/assets/joinOrganization.png";
import { useRouter } from "next/router";



const Organization = () => {
  const router= useRouter()

  return (
    <div className="w-screen h-screen bg-blue-600 flex items-center flex-col gap-10">
      <div className="flex flex-col items-center">
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={100}
          className="mix-blend-multiply"
        />
        <span className="uppercase text-black text-4xl font-semibold">Yuva-Projects</span>
      </div>
      <div className="flex gap-5 mt-14">
        {/* Create Organization */}
        <Card style={{ width: 400, height: 150, cursor: "pointer" }} onClick={() => {
          router.push("/auth/organization/createOrganization")
        }}>
          <div className="flex items-center">
            <div className="h-full w-[20%]">
              <Image
                src={CreateOrganization}
                alt="..."
                width={80}
                height={80}
              />
            </div>
            <div className="ml-10 h-full w-[80%] flex flex-col justify-start">
              <span className="uppercase text-xl font-semibold">
                Create Organization
              </span>
              <span className="text-gray-600 text-sm mt-2">
                Create your own organization as an admin, and invite your crew
                members to be the part of your journey
              </span>
            </div>
          </div>
        </Card>
        {/* Join Organization */}
        <Card style={{ width: 400, height: 150, cursor: "pointer" }}>
          <div className="flex items-center">
            <div className="h-full w-[20%]">
              <Image
                src={JoinOrganization}
                alt="..."
                width={80}
                height={80}
              />
            </div>
            <div className="ml-10 h-full w-[80%] flex flex-col justify-start">
              <span className="uppercase text-xl font-semibold">
                Join Organization
              </span>
              <span className="text-gray-600 text-sm mt-2">
                Join an organization as a member, and be the part of the crew of your captain. 
              </span>
            </div>
          </div>
        </Card>
      </div>
    
    </div>
  );
};

export default Organization;
