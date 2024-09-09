import React from "react";
import { BiosForm } from "./components";

const BiosSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <BiosForm />
    </div>
  );
};

export default BiosSection;
