import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { GiBrain } from "react-icons/gi";
import { FaChartArea, FaChartPie, FaShield } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";

const SettingsModule = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = [
    {
      key: "/settings/profile",
      label: "Profile Edit",
      icon: <FaUserCog className="inline" />,
      onClick: () => navigate("/settings/profile"),
    },
    {
      key: "/settings/security",
      label: "Account & Security",
      icon: <FaShield className="inline" />,
      onClick: () => navigate("/settings/security"),
    },
    {
      key: "/settings/config",
      label: "AI Configuration",
      icon: <GiBrain className="inline" />,
      onClick: () => navigate("/settings/config"),
    },
    {
      key: "/settings/usage-history",
      label: "AI Usage & History",
      icon: <FaChartArea className="inline" />,
      onClick: () => navigate("/settings/usage-history"),
    },
    {
      key: "/settings/resume-score-reports",
      label: "Resume Score Reports",
      icon: <FaChartPie className="inline" />,
      onClick: () => navigate("/settings/resume-score-reports"),
    },
  ];

  return (
    <div className="px-5 lg:px-10 pt-5 lg:pt-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <h1 className="font-bold text-xl w-fit flex-nowrap">Configurations &amp; History</h1>
        <Menu
          className="bg-white flex-grow lg:justify-end"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
        />
      </div>
      <div className="relative w-full h-full rounded-lg bg-[#ffffff] py-5 overflow-y-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsModule;
