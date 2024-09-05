import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { notify } from "@/utils";
import { ScorePieChart } from "@/general-components";

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
    <div className="bg-[#ffffff] w-full rounded-lg text-left shadow p-5">
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
      <ScorePieChart
        data={[
          ["Task", "Hours per Day"],
          ["Work", 11],
          ["Eat", 2],
          ["Commute", 2],
          ["Watch TV", 2],
          ["Sleep", 7], // CSS-style declaration
        ]}
      />
    </div>
  );
};

export default LinkedInReport;
