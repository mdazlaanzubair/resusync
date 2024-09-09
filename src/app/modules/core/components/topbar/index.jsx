import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { GiBrainFreeze } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaFileLines } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const Topbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <TbLayoutDashboardFilled />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
      style: {
        paddingBottom: "0.8rem",
      },
    },
    {
      key: "/resumes",
      icon: <FaFileLines />,
      label: "Resume",
      onClick: () => navigate("/resumes"),
      style: {
        paddingBottom: "0.8rem",
      },
    },
    {
      key: "/settings/config",
      label: "AI Config",
      icon: <GiBrainFreeze />,
      onClick: () => navigate("/settings/config"),
      style: {
        paddingBottom: "0.8rem",
      },
    },
    {
      key: "/settings/usage",
      label: "Usage",
      icon: <IoStatsChartSharp />,
      onClick: () => navigate("/settings/usage"),
      style: {
        paddingBottom: "0.8rem",
      },
    },
  ];

  return (
    <Menu
      className="hidden rounded-lg bg-white lg:inline-block flex-grow w-full mx-auto justify-center pr-24"
      mode="horizontal"
      defaultSelectedKeys={pathname}
      items={menuItems}
      selectable
    />
  );
};

export default Topbar;
