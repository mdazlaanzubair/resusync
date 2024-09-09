import React from "react";
import { VolunteersForm } from "./components";

const VolunteersSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <VolunteersForm />
    </div>
  );
};

export default VolunteersSection;
