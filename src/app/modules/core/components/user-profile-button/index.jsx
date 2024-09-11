import { useClerk, useUser } from "@clerk/clerk-react";
import { Button, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { GiBrainFreeze } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbLayoutDashboardFilled, TbUserShield } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfileButton = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    {
      key: "/dashboard",
      icon: <TbLayoutDashboardFilled />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
      style: {
        display: isMobile ? "" : "none",
      },
    },
    {
      key: "/resumes",
      icon: <FaFileLines />,
      label: "Resume",
      onClick: () => navigate("/resumes"),
      style: {
        display: isMobile ? "" : "none",
      },
    },
    {
      label: "Settings",
      disabled: true,
      style: {
        fontSize: "0.7rem",
      },
    },
    {
      key: "/settings/profile",
      label: "Profile",
      icon: <FaUserCog />,
      onClick: () => navigate("/settings/profile"),
    },
    {
      key: "/settings/security",
      label: "Account",
      icon: <MdAdminPanelSettings />,
      onClick: () => navigate("/settings/security"),
    },
    {
      key: "/settings/config",
      label: "AI Config",
      icon: <GiBrainFreeze />,
      onClick: () => navigate("/settings/config"),
      style: {
        display: isMobile ? "" : "none",
      },
    },
    // {
    //   key: "/settings/usage",
    //   label: "Usage",
    //   icon: <IoStatsChartSharp />,
    //   onClick: () => navigate("/settings/usage"),
    //   style: {
    //     display: isMobile ? "" : "none",
    //   },
    // },
    {
      type: "Divider",
    },
    {
      key: "8",
      label: "Sign out",
      icon: <FiLogOut />,
      onClick: () => signOut({ redirectUrl: "/" }),
    },
  ];

  return (
    <Dropdown
      className="w-100"
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [pathname],
        style: {
          width: "200px",
        },
      }}
      placement="bottomRight"
      arrow={{
        pointAtCenter: true,
      }}
      trigger={["click"]}
    >
      <Button
        type="link"
        icon={<img className="w-8 rounded-full" src={user?.imageUrl} />}
      />
    </Dropdown>
  );
};

export default UserProfileButton;
