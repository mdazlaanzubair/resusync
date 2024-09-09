import React from "react";
import { ReferencePreview, ReferencesForm } from "./components";

const ReferenceSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <ReferencesForm />
      <ReferencePreview />
    </div>
  );
};

export default ReferenceSection;
