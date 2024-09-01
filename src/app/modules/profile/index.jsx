import { UserProfile } from "@clerk/clerk-react";
import React from "react";

const ProfileModule = () => {
  return (
    <div className="relative w-full h-full rounded-lg bg-[#ffffff] p-5 overflow-auto">
      <UserProfile appearance={{ variables: "#ffffff" }} />
    </div>
  );
};

export default ProfileModule;
