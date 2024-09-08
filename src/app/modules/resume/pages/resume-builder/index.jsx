import { notify } from "@/utils";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiosSection, ProfileSection } from "./components";

const ResumeBuilderPage = () => {
  const { resume_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!resume_id) {
      notify(
        "info",
        "Resume Not Selected",
        "Please select a resume before navigating to the builder."
      );
      navigate("/resumes");
    }
  }, [resume_id]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold">Resume Builder</h1>
      {/* <hr />
      <BiosSection /> */}
      <hr />
      <ProfileSection/>
    </div>
  );
};

export default ResumeBuilderPage;
