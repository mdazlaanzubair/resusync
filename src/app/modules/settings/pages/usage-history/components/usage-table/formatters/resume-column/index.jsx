import { handleDownload } from "@/redux/resume/actions";
import React, { useState } from "react";

const ResumeColumnFormatter = ({ resumeData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadNow = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    const callback = () => setIsLoading(false);
    handleDownload(resumeData?.file_path, resumeData?.slug, callback);
  };

  return (
    <>
      <h1 className="font-bold">{resumeData?.title}</h1>
      <span>
        {resumeData?.file_path && !isLoading ? (
          <sup
            to="#"
            className="text-primary/80 underline underline-offset-2 text-xs cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
            onClick={downloadNow}
          >
            { resumeData?.slug}
          </sup>
        ) : resumeData?.file_path && isLoading ? (
          <sup
            to="#"
            className="text-slate-400 animate-pulse text-xs"
            onClick={downloadNow}
          >
            Downloading...
          </sup>
        ) : (
          resumeData?.slug
        )}
      </span>
    </>
  );
};

export default ResumeColumnFormatter;
