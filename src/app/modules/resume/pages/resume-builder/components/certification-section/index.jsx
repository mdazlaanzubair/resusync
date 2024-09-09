import React from "react";
import { CertificatesForm, CertificatesPreview } from "./components";

const CertificationSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <CertificatesForm />
      <CertificatesPreview />
    </div>
  );
};

export default CertificationSection;
