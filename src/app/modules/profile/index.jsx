import { UserProfile } from "@clerk/clerk-react";
import React from "react";

const ProfileModule = () => {
  return (
    <div
      id="custom-user-profile-page"
      className="relative w-full h-full rounded-lg bg-[#ffffff] p-5 lg:p-10 overflow-y-hidden"
    >
      <UserProfile />
    </div>
  );
};

export default ProfileModule;
