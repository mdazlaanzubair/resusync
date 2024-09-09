import React from "react";
import { Outlet } from "react-router-dom";

const ResumeModule = () => {
  return (
    <div className="rounded-lg p-5 lg:p-10">
      <Outlet />
    </div>
  );
};

export default ResumeModule;
