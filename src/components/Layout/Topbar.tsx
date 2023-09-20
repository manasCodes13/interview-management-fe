import {
  SearchOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Logo from "../../../public/logo.png";
import { Avatar, Button, Dropdown, Input, MenuProps, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { getTeamMates, getUserDetails } from "@/methods/common/common";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { accessTokenStore, reloaduserDetails, userDetail } from "@/store/global";
import { useAtom } from "jotai";
import Image from "next/image";
import { inviteTeamMatesMethod } from "@/methods/organization/organization";


interface TopbarpropsInterface {
  className?: string;
}


const Topbar = ({ className }: TopbarpropsInterface) => {
  const router = useRouter()
  const [user, setUser] = useAtom(userDetail)
  const [accessTkn, seAccessTkn] = useAtom(accessTokenStore)
  const [reload] = useAtom(reloaduserDetails)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let accessToken: any;
  let userDetails: any;
  let email: any;

  const [getTeamMate, setGetTeamMate] = useState<any>();

  if (typeof window != "undefined") {
    accessToken = localStorage?.getItem("accessToken");
    userDetails = localStorage?.getItem("user");
    seAccessTkn(accessToken)
  }

  let orgId: string

  const inviteTeamMatesFunctionCall = async ({ email, userEmail }: any) => {
    const inviteTeamMatesFunc = await inviteTeamMatesMethod({ accessToken, email, userEmail })

    if (inviteTeamMatesFunc?.success) {
      toast(`${inviteTeamMatesFunc?.message}`, { autoClose: 2000, type: 'success' })
    }
    else {
      toast(`${inviteTeamMatesFunc?.message}`, { autoClose: 2000, type: 'error' })
    }
  }

  if (userDetails) {
    email = JSON.parse(userDetails)?.data?.email;
    orgId = JSON.parse(userDetails)?.data?.orgId;
  }

  const getUserDetailsFunc = async () => {
    const userDetailsAPIFunCall = await getUserDetails({ accessToken, email });
    const getTeamMatesAPIFunCall = await getTeamMates(accessToken, orgId)

    if (userDetailsAPIFunCall?.success) {
      setUser(userDetailsAPIFunCall?.data)
    }
    else {
      toast(`${userDetailsAPIFunCall?.message}`, { autoClose: 2000, type: 'error' })
    }

    if (getTeamMatesAPIFunCall?.success) {
      setGetTeamMate(getTeamMatesAPIFunCall?.data);
    }
    else {
      toast(`${getTeamMatesAPIFunCall?.message}`, { autoClose: 2000, type: 'error' })
    }
  };

  useEffect(() => {
    getUserDetailsFunc()
  }, [accessToken, reload])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: "Profile",
      onClick: () => {
        router.push("/profile")
      }
    },
    {
      key: '2',
      label: "Settings"
    },
    {
      key: '3',
      label: "Logout",
      onClick: () => {
        router.push("/auth/login")
        if (typeof window !== undefined) {
          localStorage.clear()
        }
      }
    },
  ];



  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <div className="w-[15%] flex justify-center items-center">
          <Image
            src={Logo}
            alt="logo"
            width={60}
            height={60}
            className="mix-blend-multiply"
          />
        </div>

        <div className="w-full h-full flex items-center justify-end gap-5 pr-5">
          <Avatar.Group
            maxCount={3}
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {getTeamMate?.map((item: any) => {
              return (

                <Tooltip title={item?.email} placement="top">
                  <Avatar
                    style={{ backgroundColor: "red" }}
                  >
                    {item?.email?.split("")[0].toUpperCase()}
                  </Avatar>
                </Tooltip>
              )

            })}
          </Avatar.Group>
          <Button
            icon={<ShareAltOutlined />}
            className="text-white h-[60%] text-base"
            onClick={showModal}
          >
            Share
          </Button>
          <Input
            className="w-[10%] h-[60%] text-sm border-2 border-gray-300"
            prefix={<SearchOutlined />}
            placeholder="Search"
          />

          <Dropdown menu={{ items }} placement="bottomLeft"  >
            <Avatar className="bg-red-400">{
              user?.name ? "M" : "N"
            }</Avatar>
          </Dropdown>
        </div>
      </div>
      <Modal title="Invite Teammates" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[]}
      >
        <div className="flex items-center gap-3 my-5">
          <Input placeholder="Email Address" className="h-10" onChange={(e) => {
            setUserEmail(e.target.value)
          }} />
          <Button onClick={() => { inviteTeamMatesFunctionCall({ email, userEmail }) }} className="text-white h-10 text-base">Invite</Button>
        </div>

      </Modal>
    </div>
  );
};

export default Topbar;
