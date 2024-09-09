import React from "react";
import { LanguagesForm, LanguagesPreview } from "./components";

const LanguageSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <LanguagesForm />
      <LanguagesPreview />
    </div>
  );
};

export default LanguageSection;
