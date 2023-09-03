import React, { useEffect, useState } from "react";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import {
  AppstoreAddOutlined,
  LeftOutlined,
  ProjectOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button } from "antd";

interface SidebarPropsInterface {
  className?: string;
}

const sidebarContent = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AppstoreAddOutlined />,
    url: "/dashboard",
    dropdown: false,
    parent: "Dashboard",
    child: "",
  },
  {
    id: 2,
    title: "Projects",
    icon: <ProjectOutlined />,
    dropdown: true,
    url: "/projects",
    parent: "Project Management",
    child: "Projects",
  },
];

const Sidebar = ({ className }: SidebarPropsInterface) => {
  const router = useRouter();
  const [closeSideBar, setCloseSideBar] = useState(false);


  return (
    <div className={closeSideBar ? `hidden` : className}>
      <div>
        <div className="flex flex-col items-center">
          <Image
            src={Logo}
            alt="logo"
            width={60}
            height={60}
            className="mix-blend-multiply"
          />
        </div>
        <div className="flex flex-col mt-5 gap-5">
          {sidebarContent?.map((item) => {
            return (
              <div
                className={
                  router.pathname === item?.url
                    ? `flex gap-4 items-center cursor-pointer bg-blue-600 py-4 pl-4`
                    : `flex gap-4 items-center cursor-pointer pl-4`
                }
                key={item?.id}
                onClick={() => {
                  if (item?.url) {
                    // setGetBreadcrumb([]);
                    // setGetBreadcrumb([item?.parent, item?.child]);
                    router.push(item.url);
                  }
                }}
              >
                {/* {setBreadCrumb(item.parent, item.child)} */}
                <span
                  className={
                    router.pathname === item?.url
                      ? `text-xl flex items-center text-white`
                      : `text-xl flex items-center`
                  }
                >
                  {item?.icon}
                </span>
                <span
                  className={router.pathname === item?.url ? `text-white` : ``}
                >
                  {item?.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-5 flex justify-center">
        <Button icon={<UserAddOutlined />} className="text-white h-10">Invite teammates</Button>
      </div>
    </div>
  );
};

export default Sidebar;
