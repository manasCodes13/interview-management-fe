import {
  AntDesignOutlined,
  BellOutlined,
  SearchOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Tooltip } from "antd";
import React from "react";

interface TopbarpropsInterface {
  className?: string;
}

const Topbar = ({ className }: TopbarpropsInterface) => {
  const onSearch = (value: string) => console.log(value);

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
        <Avatar className="bg-red-400">M</Avatar>
      </div>
    </div>
  );
};

export default Topbar;
