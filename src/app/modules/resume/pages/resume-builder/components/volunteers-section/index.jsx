import React from "react";
import { VolunteersForm, VolunteersPreview } from "./components";

const VolunteersSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <VolunteersForm />
      <VolunteersPreview />
    </div>
  );
};

export default VolunteersSection;
