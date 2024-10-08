import React from "react";
import { fullLogo } from "@/assets";
import { Button, Menu } from "antd";
import { IoClose } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { BsFilePdf } from "react-icons/bs";

const Sidebar = ({ showMenu, toggleSidebar }) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "1",
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <BsFilePdf />,
      label: "Resume",
      onClick: () => navigate("/resumes"),
    },
    {
      key: "sub-menu-setting",
      label: "Settings",
      icon: <HiOutlineCog />,
      showMenu: true,
      children: [
        {
          key: "4",
          label: "Profile",
          onClick: () => navigate("/settings/profile"),
        },
        {
          key: "5",
          label: "Security",
          onClick: () => navigate("/settings/security"),
        },
        {
          key: "6",
          label: "AI Config",
          onClick: () => navigate("/settings/config"),
        },
        {
          key: "7",
          label: "Usage",
          onClick: () => navigate("/settings/usage"),
        },
      ],
    },
  ];

  return (
    <div
      className={`fixed top-0 bottom-0 z-50 shadow-xl lg:shadow-none lg:relative lg:h-full w-1/2 lg:w-1/6 
      ${showMenu ? "translate-x-0" : "-translate-x-[100vw] lg:translate-x-0"}
     flex flex-col bg-white border-r transition-transform duration-500 ease-in-out`}
    >
      <div className="relative flex lg:hidden items-center justify-between p-3 pb-[0.9rem] border-b">
        <img className="w-24 h-auto" src={fullLogo} alt="" srcSet="" />
        <Button
          onClick={toggleSidebar}
          size="small"
          className="absolute -right-3 rotate-45"
          icon={<IoClose className="rotate-45" />}
        />
      </div>
      <div className="relative flex flex-col h-full">
        <Menu
          className="rounded-lg bg-white flex-grow"
          mode="inline"
          defaultOpenKeys={[
            "sub-menu-setting",
            "sub-menu-resume",
            "sub-menu-ai-config",
          ]}
          items={menuItems}
        />
        <Button
          type="text"
          className="bg-secondary m-3"
          size="large"
          icon={<MdLogout />}
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
