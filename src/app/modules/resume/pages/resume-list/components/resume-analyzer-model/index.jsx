import React, { useState } from "react";
import { analyzeData } from "@/assets";
import { ScorePieChart, ShowLottie } from "@/general-components";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resumeActions } from "@/redux/resume/slice";
import { BsQrCode } from "react-icons/bs";
import { preprocessText, resumeAnalyzer } from "@/utils";

const ResumeAnalyzerModal = ({ visible, closeHandler }) => {
  const dispatch = useDispatch();
  const { resume_selected } = useSelector((state) => state.resume);
  const { llmConfigs } = useSelector((state) => state.llmConfig);
  const { id: api_key_id } = llmConfigs || {};
  const { id: resume_id, user_id } = resume_selected || {};
  const [jobDescFormRef] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);

  const handleCloseModal = () => {
    if (!isLoading) {
      closeHandler();
      setScore(null);
      dispatch(resumeActions.selectResume(null));
    }
  };

  const handleResumeAnalysisSubmit = async ({ job_desc }) => {
    setIsLoading(true);

    // DISPATCHING ACTION WITH REQUEST BODY TO FETCH RESUMES WITH A CALLBACK FUNCTION
    const callback = (isSuccess, data) => {
      if (isSuccess) {
        setIsLoading(false);
        setScore(data);
        return;
      } else {
        setIsLoading(false);
        return;
      }
    };

    // PRE PROCESSING TEXT BEFORE SENDING FOR ANALYSIS
    const rawString = preprocessText(job_desc);
    if (resume_selected && llmConfigs && rawString) {
      const reqBody = {
        api_key_id,
        resume_id,
        user_id,
        job_desc: rawString,
      };
      await resumeAnalyzer(reqBody, callback);
    }
  };

  return (
    <Modal
      title={"Analyze Resume with Gemini"}
      open={visible}
      onCancel={!isLoading && handleCloseModal}
      footer={null}
      className="relative"
    >
      {isLoading && (
        <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-white/80 rounded-md flex items-center justify-center">
          <ShowLottie animationData={analyzeData} />
        </div>
      )}
      {score ? (
        <div>
          <h1 className="text-xs font-semibold mb-2">Core Evaluation</h1>
          <ScorePieChart
            data={[
              ["Criteria", "Score"],
              ["Keyword Matched", score?.keyword_matched],
              ["Skill Aligned", score?.skills_aligned],
              ["Experience Relevancy", score?.experience_relevance],
              ["Education Relevancy", score?.education_relevance],
              ["Quantifiable Achievements", score?.quantifiable_achievement],
            ]}
          />
          <hr className="my-3" />
          <h1 className="text-xs font-semibold mb-2">Soft Evaluation</h1>
          <ScorePieChart
            data={[
              ["Criteria", "Score"],
              ["Culture Fit", score?.culture_fit],
              ["Communication Skills", score?.communication_skill],
              ["Problem Solving Skills", score?.problem_solving_skill],
              ["Adaptability", score?.adaptability],
              ["Career Progression", score?.career_progression],
            ]}
          />
          <hr className="my-3" />
          <h1 className="text-xs font-semibold mb-2">Gemini Remarks</h1>
          <p className="text-xs">{score?.hr_remarks}</p>
          <hr className="my-3" />
          <h1 className="text-xs font-semibold mb-2">Missing Keywords</h1>
          <p className="text-xs flex flex-wrap items-center gap-1">
            {score?.missing_keywords?.length > 0 ? (
              score?.missing_keywords?.map((item) => (
                <span key={`word-${item}`} className="px-2 py-1 bg-secondary">
                  {item}
                </span>
              ))
            ) : (
              <strong>No missing keyword found</strong>
            )}
          </p>
        </div>
      ) : (
        <Form
          form={jobDescFormRef}
          onFinish={handleResumeAnalysisSubmit}
          layout="vertical"
          className=" flex flex-col items-center justify-center"
        >
          <Form.Item
            name="job_desc"
            className="mt-3 mb-5 w-full"
            rules={[
              {
                required: true,
                message: "Job description is a required field",
              },
            ]}
          >
            <Input.TextArea
              size="large"
              className="text-sm w-full"
              rows={5}
              placeholder="Paste the job description that you would like your resume to be assessed against."
              disabled={isLoading}
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-3">
            <Button
              size=""
              className="mx-auto text-xs"
              key="reset"
              type=""
              onClick={() => jobDescFormRef.resetFields()}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button
              htmlType="submit"
              size=""
              className="mx-auto text-xs"
              key="submit"
              type="primary"
              loading={isLoading}
              disabled={isLoading}
              icon={<BsQrCode />}
            >
              Start Analysis
            </Button>
          </div>
        </Form>
      )}

      {score && (
        <Button
          size=""
          className="block mx-auto text-xs mt-5"
          key="analyze-again"
          type="dashed"
          disabled={isLoading}
          onClick={() => setScore(null)}
          color="primary"
        >
          Analyze with another job description
        </Button>
      )}
    </Modal>
  );
};

export default ResumeAnalyzerModal;
