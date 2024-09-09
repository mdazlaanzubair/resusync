import React from "react";
import { ProfilesForm } from "./components";

const ProfileSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <ProfilesForm />
    </div>
  );
};

export default ProfileSection;
