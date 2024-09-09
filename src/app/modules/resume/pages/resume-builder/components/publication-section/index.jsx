import React from "react";
import { PublicationPreview, PublicationsForm } from "./components";

const PublicationSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <PublicationsForm />
      <PublicationPreview />
    </div>
  );
};

export default PublicationSection;
