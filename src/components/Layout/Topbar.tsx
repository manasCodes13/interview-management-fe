import {
  AntDesignOutlined,
  BellOutlined,
  SearchOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BASE_URL } from "@/utils/network";
import axios from "axios";
import { Avatar, Button, Input, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "@/methods/common/common";
import { toast } from "react-toastify";


interface TopbarpropsInterface {
  className?: string;
}

const Topbar = ({ className }: TopbarpropsInterface) => {
  const [user, setUser] = useState<any>()

let accessToken:any;
let userDetails: any;

if(typeof window != "undefined") {
    accessToken = localStorage?.getItem("accessToken");
    userDetails = localStorage?.getItem("user");
}

let email: string;

if (userDetails) {
  email = JSON.parse(userDetails)?.data?.email;
}

const getUserDetailsFunc = async () => {
  const userDetailsAPIFunCall = await getUserDetails({accessToken, email})

  if(userDetailsAPIFunCall?.success) {
    setUser(userDetailsAPIFunCall?.data)
  }
  else {
    toast(`${userDetailsAPIFunCall?.message}`, { autoClose: 2000, type: 'error' })
  }
};

useEffect(() => {
  getUserDetailsFunc()
},[accessToken])

  

  return (
    <div className={className}>
      <div className="w-full h-full flex items-center justify-end gap-5 pr-5">
        {/* <div className='w-1/3 h-full'></div> */}
        <Avatar.Group
          maxCount={3}
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{ backgroundColor: "#1677ff" }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        <Button
          icon={<ShareAltOutlined />}
          className="text-white h-[60%] text-base"
        >
          Share
        </Button>
        <Input
          className="w-[10%] h-[60%] text-sm border-2 border-gray-300"
          prefix={<SearchOutlined />}
          placeholder="Search"
        />
        <Avatar className="bg-red-400">{
          user?.name ? "M" : "N"
        }</Avatar>
      </div>
    </div>
  );
};

export default Topbar;
