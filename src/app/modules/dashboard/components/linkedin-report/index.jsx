import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { notify } from "@/utils";

const LinkedInReport = () => {
  const navigate = useNavigate();

  const popAlertMessage = () => {
    notify(
      "info",
      "LinkedIn Analysis",
      "We're currently working on this feature with LinkedIn to enable this feature."
    );
  };
  return (
    <div className="bg-[#ffffff] w-full rounded-lg text-left shadow-lg p-5">
      <div
        className="flex items-center justify-between gap-5 cursor-pointer"
        onClick={popAlertMessage}
      >
        <h1 className="font-semibold">LinkedIn Report</h1>
        <Button
          type="text"
          icon={<FaLongArrowAltRight />}
          onClick={(e) => {
            e.stopPropagation();
            popAlertMessage();
          }}
        />
      </div>
    </div>
  );
};

export default LinkedInReport;
