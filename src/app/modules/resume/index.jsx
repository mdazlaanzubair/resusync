import React from "react";
import { Outlet } from "react-router-dom";

const ResumeModule = () => {
  return (
    <div className="w-full h-full rounded-lg bg-[#ffffff] p-5 lg:p-10 overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default ResumeModule;
