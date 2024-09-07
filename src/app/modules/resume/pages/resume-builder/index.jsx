import { notify } from "@/utils";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResumeBuilderPage = () => {
  const { resume_id } = useParams();
  const navigate = useNavigate();
  console.log(resume_id);
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

  return <div>Resume Builder Page asd</div>;
};

export default ResumeBuilderPage;
