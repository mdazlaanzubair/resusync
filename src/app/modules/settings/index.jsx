import React from "react";
import { Outlet } from "react-router-dom";

const SettingsModule = () => {
  return (
    <div className="relative w-full h-full rounded-lg bg-[#ffffff] p-5 lg:p-10 overflow-y-hidden">
      <Outlet />
    </div>
  );
};

export default SettingsModule;
