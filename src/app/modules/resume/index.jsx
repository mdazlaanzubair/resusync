import { getAllResume } from "@/supabase/resumes";
import { notify } from "@/utils";
import { useUser } from "@clerk/clerk-react";
import React, { useLayoutEffect, useState } from "react";
import { ModalBtn, ResumeCards, ResumeFormModal } from "./components";
import { FileUploadFormModal } from "@/general-components";
import ResumeCardSkeleton from "./components/resume-card/skeleton";

// Array of background colors or patterns
const backgroundPatterns = [
  "rgba(116, 235, 213, 0.5)", // Light teal blue with 50% opacity
  "rgba(37, 117, 252, 0.5)", // Medium blue with 50% opacity
  "rgba(102, 126, 234, 0.5)", // Slightly darker blue with 50% opacity
  "rgba(0, 150, 255, 0.5)", // Vibrant sky blue with 50% opacity
  "rgba(0, 85, 170, 0.5)", // Deep ocean blue with 50% opacity
];

const ResumeModule = () => {
  const { user } = useUser();
  const [resumeData, setResumeData] = useState([]);
  const [isResumeDataLoading, setIsResumeDataLoading] = useState(false);
  const [isShowResumeModal, setIsShowResumeModal] = useState(false);
  const [isShowUploadModal, setIsShowUploadModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const openResumeModalHandler = () => setIsShowResumeModal(true);
  const closeResumeModalHandler = () => setIsShowResumeModal(false);

  const openUploadModalHandler = () => setIsShowUploadModal(true);
  const closeUploadModalHandler = () => setIsShowUploadModal(false);

  useLayoutEffect(() => {
    const fetchAllResumes = async () => {
      setIsResumeDataLoading(true);
      try {
        const { data, error } = await getAllResume(user?.id);

        if (error) throw error;

        setResumeData(data);
      } catch ({ error, message }) {
        notify("error", `Oops! ${error} Error`, `${message}`);
        console.error("Upload failed:", error);
      } finally {
        setIsResumeDataLoading(false);
      }
    };
    fetchAllResumes();
  }, []);

  return (
    <div className="w-full h-full rounded-lg bg-[#ffffff] p-5">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5">
        <ModalBtn clickHandler={openResumeModalHandler} />
        <ModalBtn clickHandler={openUploadModalHandler} isUploadBtn />
        {isResumeDataLoading &&
          [1, 2, 3]?.map((item) => <ResumeCardSkeleton key={item} />)}
        {!isResumeDataLoading &&
          resumeData?.map((resume, index) => (
            <ResumeCards
              key={resume?.id}
              data={resume}
              selectResumeDataHandler={setEditData}
              backgroundColor={
                backgroundPatterns[index % backgroundPatterns.length]
              }
            />
          ))}
        <ResumeFormModal
          visible={isShowResumeModal}
          closeHandler={closeResumeModalHandler}
          editResumeData={editData}
        />
        <FileUploadFormModal
          visible={isShowUploadModal}
          closeHandler={closeUploadModalHandler}
        />
      </div>
    </div>
  );
};

export default ResumeModule;
