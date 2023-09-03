import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }: any) => {
  return (
    <div className="flex w-screen h-screen ">
      <Sidebar className="w-[12%] bg-white h-full border-r-2 border-gray-100 flex flex-col justify-between" />
      <div className="w-[88%] flex flex-col items-center">
        <Topbar className="h-[8%] w-full bg-white" />
        <main className="h-[92%] w-full pl-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
