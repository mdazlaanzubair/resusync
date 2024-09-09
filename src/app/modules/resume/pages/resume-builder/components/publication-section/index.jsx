import React from "react";
import {  PublicationsForm } from "./components";

const PublicationSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <PublicationsForm />
    </div>
  );
};

export default PublicationSection;
