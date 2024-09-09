import React from "react";
import {  ExperiencesForm } from "./components";

const ExperienceSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <ExperiencesForm />
    </div>
  );
};

export default ExperienceSection;
