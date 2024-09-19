import React from "react";
import { LinkedInImport, QuickLinks, WelcomeCard } from "./components";
import { useUser } from "@clerk/clerk-react";

const DashboardModule = () => {
  const { user } = useUser();

  return (
    <div className="w-full p-5 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-y-auto pb-5">
        <WelcomeCard user={user} />
        <QuickLinks />
      </div>
      <LinkedInImport />
    </div>
  );
};

export default DashboardModule;
