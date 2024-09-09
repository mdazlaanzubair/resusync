import React from "react";
import { ExperiencePreview, ExperiencesForm } from "./components";

const ExperienceSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <ExperiencesForm />
      <ExperiencePreview />
    </div>
  );
};

export default ExperienceSection;
