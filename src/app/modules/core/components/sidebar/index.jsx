import { fullLogo } from "@/assets";
import { Button, Menu } from "antd";
import React from "react";
import { IoClose } from "react-icons/io5";
import { MdLogout, MdOutlineDocumentScanner } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = ({ isShow, toggleSidebar }) => {
  const menuItems = [
    {
      key: "1",
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <MdOutlineDocumentScanner />,
      label: "Scan Resume",
    },
    {
      key: "sub1",
      label: "Settings",
      icon: <HiOutlineCog />,
      children: [
        {
          key: "5",
          label: "Edit Profile",
        },
        {
          key: "6",
          label: "AI Config",
        },
      ],
    },
  ];

  return (
    <div
      className={`fixed top-0 bottom-0 z-50 shadow-xl lg:shadow-none lg:relative lg:h-full w-1/2 lg:w-1/6 
      ${isShow ? "translate-x-0" : "-translate-x-[50vh] lg:translate-x-0"}
     flex flex-col bg-white border-r transition-transform duration-500 ease-in-out`}
    >
      <div className="relative flex lg:hidden items-center justify-between mb-2 p-3 pb-[0.9rem] border-b">
        <img className="w-24 h-auto" src={fullLogo} alt="" srcSet="" />
        <Button
          onClick={toggleSidebar}
          size="small"
          className="absolute -right-3 rotate-45"
          icon={<IoClose className="rotate-45" />}
        />
      </div>
      <div className="relative flex flex-col h-full bg">
        <Menu
          className="rounded-lg bg-white flex-grow"
          mode="inline"
          items={menuItems}
        />
        <Button
          type="text"
          className="bg-secondary m-3"
          size="large"
          icon={<MdLogout />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
