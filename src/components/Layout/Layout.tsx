import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Logo from "../../../public/logo.png";
import { Breadcrumb, Image, Layout, Menu, MenuProps, theme } from 'antd';
import { AppstoreAddOutlined, LaptopOutlined, NotificationOutlined, ProjectOutlined, UserOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { breadcrumbStore } from "@/store/global";
import { useRouter } from "next/router";


const { Header, Content, Sider } = Layout;

const sidebarContent = [
  {
    id: 1,
    title: "Dashboard",
    icon: AppstoreAddOutlined,
    url: "/dashboard",
    dropdown: false,
    children: []
  },
  {
    id: 2,
    title: "Projects",
    icon: ProjectOutlined,
    dropdown: true,
    url: "/projects",
    children: [
      {
        id: 3,
        title: "All Projects",
        url: "/projects/allProjects",
      },
      {
        id: 4,
        title: "My Projects",
        url: "/projects/myProjects",
      }
    ]
  },
];



const Layouts = ({ children }: any) => {
  const [breadcrumb] = useAtom(breadcrumbStore)
  const router = useRouter();

  console.log('breadcrumb', breadcrumb)

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items2: MenuProps['items'] = sidebarContent.map(
    (item, index) => {
      const key = String(index + 1);

      return {
        key: `sub${key}`,
        icon: React.createElement(item?.icon),
        label: item?.title,
        onClick: (e: any) => {
          if (!item?.dropdown) router.push(item?.url)
        },

        children: item?.dropdown && item?.children.map((item: any) => {
          return {
            key: item?.id,
            label: item?.title,
            onClick: (e: any) => {
              router.push(item?.url);
            },
          };
        }),
      };
    },
  );

  return (
    <Layout>
      <div className="flex flex-col w-screen h-screen ">
        <Header className="w-full p-0">

          <Topbar className="p-0 w-full bg-white h-full" />
        </Header>

        <Layout className="w-full">
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
            {/* <Sidebar className="w-full bg-white h-full border-r-2 border-gray-100 flex flex-col justify-between" /> */}
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {breadcrumb && breadcrumb?.map((item: string, index: number) => {
                return (
                  <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                )
              })}

            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
              className="h-[92%] w-full pl-10"
            >
              {children}
            </Content>
          </Layout>
        </Layout>
        {/* <Sidebar className="w-[12%] bg-white h-full border-r-2 border-gray-100 flex flex-col justify-between" />
        <div className="w-[88%] flex flex-col items-center">
          <Topbar className="h-[8%] w-full bg-white" />
          <main className="h-[92%] w-full pl-10">{children}</main>
        </div> */}
      </div>
    </Layout>

  );
};

export default Layouts;
