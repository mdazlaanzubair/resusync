import { UserProfile } from "@clerk/clerk-react";
import React from "react";

const ProfilePage = () => {
  return (
    <div id="custom-user-profile-page" className="relative w-full h-full">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
