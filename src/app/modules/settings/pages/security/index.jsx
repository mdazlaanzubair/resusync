import { UserProfile } from "@clerk/clerk-react";
import React from "react";

const SecurityPage = () => {
  return (
    <div id="custom-user-profile-page" className="relative w-full h-full">
      <UserProfile>
        <UserProfile.Page label="account" />
      </UserProfile>
    </div>
  );
};

export default SecurityPage;
