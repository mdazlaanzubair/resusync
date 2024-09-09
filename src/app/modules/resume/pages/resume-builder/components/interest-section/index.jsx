import React from "react";
import {  InterestsForm } from "./components";

const InterestSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <InterestsForm />
    </div>
  );
};

export default InterestSection;
