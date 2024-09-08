import React from "react";
import { ProfilesForm, ProfilesPreview } from "./components";

const ProfileSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5">
      <ProfilesForm />
      <ProfilesPreview />
    </div>
  );
};

export default ProfileSection;
