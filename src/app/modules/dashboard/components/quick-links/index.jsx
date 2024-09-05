import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLink } from "react-icons/io";

const QuickLinks = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      key: "1",
      label: "View Resumes",
      onClick: () => navigate("/resumes"),
    },
    {
      key: "2",
      label: "Start Building",
      onClick: () => navigate("/resume-builder"),
    },
    {
      key: "3",
      label: "Edit Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "6",
      label: "Configure AI",
      onClick: () => navigate("/config"),
    },
  ];

  return (
    <div className="bg-[#ffffff] w-full rounded-lg text-left shadow">
      <h1 className="text-xl font-semibold p-5 pb-3">Quick Links</h1>
      {quickLinks?.map((item) => (
        <Button
          onClick={item?.onClick}
          type="text"
          className="text-left w-full p-5 border-b justify-start border-secondary rounded-none"
          icon={
            <IoMdLink />
          }
        >
          {item?.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickLinks;
