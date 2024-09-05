import React from "react";
import {
  LinkedInImport,
  LinkedInReport,
  QuickLinks,
  ResumeReport,
  WelcomeCard,
} from "./components";
import { useUser } from "@clerk/clerk-react";

const DashboardModule = () => {
  const { user } = useUser();

  return (
    <div className="w-full h-full rounded-lg bg-[#ffffff]/0 p-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 overflow-y-auto pb-5">
        <WelcomeCard user={user} />
        <ResumeReport />
        <QuickLinks />
      </div>
      <LinkedInImport />
    </div>
  );
};

export default DashboardModule;
