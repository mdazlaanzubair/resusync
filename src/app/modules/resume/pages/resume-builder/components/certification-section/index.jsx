import React from "react";
import { CertificatesForm } from "./components";

const CertificationSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <CertificatesForm />
    </div>
  );
};

export default CertificationSection;
