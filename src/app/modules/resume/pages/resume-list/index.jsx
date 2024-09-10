import { useUser } from "@clerk/clerk-react";
import React, { useLayoutEffect, useState } from "react";
import { ModalBtn, ResumeCards, ResumeFormModal } from "./components";
import { FileUploadFormModal } from "@/general-components";
import ResumeCardSkeleton from "./components/resume-card/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Button, Empty } from "antd";
import { deleteResume, getAllResumes } from "@/redux/resume/actions";
import { resumeActions } from "@/redux/resume/slice";
import { useNavigate } from "react-router-dom";
import { getAIConfig } from "@/redux/llm-config/actions";

// Array of background colors or patterns
const backgroundPatterns = [
  "rgba(116, 235, 213, 0.5)", // Light teal blue with 50% opacity
  "rgba(37, 117, 252, 0.5)", // Medium blue with 50% opacity
  "rgba(102, 126, 234, 0.5)", // Slightly darker blue with 50% opacity
  "rgba(0, 150, 255, 0.5)", // Vibrant sky blue with 50% opacity
  "rgba(0, 85, 170, 0.5)", // Deep ocean blue with 50% opacity
];

const ResumeListPage = () => {
  const { user } = useUser();
  const { resumes } = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // LOCAL STATES
  const [isResumeDataLoading, setIsResumeDataLoading] = useState(true);
  const [isShowResumeModal, setIsShowResumeModal] = useState(false);
  const [isShowUploadModal, setIsShowUploadModal] = useState(false);

  const openResumeModalHandler = () => setIsShowResumeModal(true);
  const closeResumeModalHandler = () => setIsShowResumeModal(false);

  const openUploadModalHandler = () => setIsShowUploadModal(true);
  const closeUploadModalHandler = () => setIsShowUploadModal(false);

  // FUNCTION TO EDIT RESUME
  const editResumeHandler = (data = null) => {
    if (data) {
      dispatch(resumeActions.selectResume(data));
      openResumeModalHandler();
    }
  };

  // FUNCTION TO SELECT THE RESUME AND NAVIGATE TO THE BUILDER
  const selectAndNavigateHandler = async (data = null) => {
    if (data) {
      console.log("I've resume", data);
      await dispatch(resumeActions.selectResume(data));

      navigate(`/resumes/builder/${data?.id}`);
    }
  };

  useLayoutEffect(() => {
    // DISPATCHING ACTION TO FETCH RESUMES WITH A CALLBACK FUNCTION
    const callback = (isSuccess) => {
      if (isSuccess) {
        setIsResumeDataLoading(false);
        return;
      } else {
        setIsResumeDataLoading(false);
        return;
      }
    };
    dispatch(getAllResumes(user?.id, callback));
    dispatch(getAIConfig(user?.id));
  }, []);

  return (
    <>
      {isResumeDataLoading && (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {[1, 2, 3, 4, 5]?.map((item) => (
            <ResumeCardSkeleton key={`skeleton-card-${item}`} />
          ))}
        </div>
      )}
      {resumes?.length > 0 && !isResumeDataLoading && (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <ModalBtn clickHandler={openResumeModalHandler} />
          <ModalBtn clickHandler={openUploadModalHandler} isUploadBtn />
          {resumes?.map((resume, index) => (
            <ResumeCards
              key={`resume-card-${resume?.id}`}
              data={resume}
              selectResumeDataHandler={() => editResumeHandler(resume)}
              deleteResumeHandler={() => dispatch(deleteResume(resume))}
              selectAndNavigateHandler={() => selectAndNavigateHandler(resume)}
              backgroundColor={
                backgroundPatterns[index % backgroundPatterns.length]
              }
            />
          ))}
        </div>
      )}
      {resumes?.length <= 0 && !isResumeDataLoading && (
        <div className="w-full h-full flex flex-col items-start justify-center">
          <Empty
            className="mx-auto"
            imageStyle={{
              height: 100,
            }}
            description={<strong>You have no resume</strong>}
          >
            <div className="flex flex-wrap items-center justify-center">
              <Button
                className="text-xs"
                size="small"
                type="primary"
                onClick={openResumeModalHandler}
              >
                Create now
              </Button>
              <Button
                className="text-xs text-left"
                size="small"
                type="link"
                onClick={openUploadModalHandler}
              >
                Upload existing one
              </Button>
            </div>
          </Empty>
        </div>
      )}

      <ResumeFormModal
        visible={isShowResumeModal}
        closeHandler={closeResumeModalHandler}
      />
      <FileUploadFormModal
        visible={isShowUploadModal}
        closeHandler={closeUploadModalHandler}
      />
    </>
  );
};

export default ResumeListPage;
