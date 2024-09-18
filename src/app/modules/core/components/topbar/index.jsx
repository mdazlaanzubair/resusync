import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { GiBrain, GiBrainFreeze } from "react-icons/gi";
import {
  FaChartArea,
  FaChartPie,
  FaFileLines,
  FaShield,
} from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";

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
      key: "/settings",
      label: "Settings",
      icon: <GiBrainFreeze />,
      style: {
        paddingBottom: "0.8rem",
      },
      children: [
        {
          key: "/settings/profile",
          label: "Profile",
          icon: <FaUserCog />,
          onClick: () => navigate("/settings/profile"),
        },
        {
          key: "/settings/security",
          label: "Account & Security",
          icon: <FaShield />,
          onClick: () => navigate("/settings/security"),
        },
        {
          key: "/settings/config",
          label: "AI Configuration",
          icon: <GiBrain />,
          onClick: () => navigate("/settings/config"),
        },
        {
          key: "/settings/usage-history",
          label: "AI Usage & History",
          icon: <FaChartArea />,
          onClick: () => navigate("/settings/usage-history"),
        },
        {
          key: "/settings/resume-score-reports",
          label: "Resume Score Reports",
          icon: <FaChartPie />,
          onClick: () => navigate("/settings/resume-score-reports"),
        },
      ],
    },
  ];

  return (
    <Menu
      className="hidden rounded-lg bg-white lg:inline-block flex-grow w-full mx-auto justify-center pr-24"
      mode="horizontal"
      defaultSelectedKeys={pathname}
      selectedKeys={[pathname]}
      items={menuItems}
      selectable
    />
  );
};

export default Topbar;
