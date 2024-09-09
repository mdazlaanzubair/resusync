import React from "react";
import { EducationForm } from "./components";

const EducationSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <EducationForm />
    </div>
  );
};

export default EducationSection;
