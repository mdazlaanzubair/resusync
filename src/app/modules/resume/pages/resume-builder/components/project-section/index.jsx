import React from "react";
import { ProjectsForm } from "./components";

const ProjectSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <ProjectsForm />
    </div>
  );
};

export default ProjectSection;
