import React from "react";
import { SkillsForm, SkillsPreview } from "./components";

const SkillsSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <SkillsForm />
      <SkillsPreview />
    </div>
  );
};

export default SkillsSection;
