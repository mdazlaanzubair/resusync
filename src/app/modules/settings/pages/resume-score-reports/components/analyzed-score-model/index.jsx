import React, { useMemo } from "react";
import { ShowScoresProgress } from "@/general-components";
import { Modal } from "antd";
import { useSelector } from "react-redux";

const AnalyzedScoreModal = ({ visible, closeHandler }) => {
  const { selected_score: score } = useSelector((state) => state.report);

  // Memoize the percentage calculation to optimize performance
  const corePercent = useMemo(() => {
    const totalScore =
      score?.keyword_matched +
      score?.skills_aligned +
      score?.experience_relevance +
      score?.education_relevance +
      score?.quantifiable_achievement;

    return Math.round((totalScore / 25) * 100);
  }, [score]);

  const softPercent = useMemo(() => {
    const totalScore =
      score?.culture_fit +
      score?.communication_skill +
      score?.problem_solving_skill +
      score?.adaptability +
      score?.career_progression;

    return Math.round((totalScore / 25) * 100);
  }, [score]);

  return (
    <Modal
      title={"Analysis Results"}
      open={visible}
      onCancel={closeHandler}
      footer={null}
    >
      <div className="relative max-h-[65vh] overflow-y-auto pr-1 mt-5">
        <ShowScoresProgress
          coreData={[
            { "Keyword Matched": score?.keyword_matched },
            { "Skill Aligned": score?.skills_aligned },
            { "Experience Relevancy": score?.experience_relevance },
            { "Education Relevancy": score?.education_relevance },
            { "Quantifiable Achievements": score?.quantifiable_achievement },
          ]}
          softData={[
            { "Culture Fit": score?.culture_fit },
            { "Communication Skills": score?.communication_skill },
            { "Problem Solving Skills": score?.problem_solving_skill },
            { Adaptability: score?.adaptability },
            { "Career Progression": score?.career_progression },
          ]}
          geminiRemarks={score?.hr_remarks}
          missing_keywords={score?.missing_keywords}
          overAllCore={corePercent}
          overAllSoft={softPercent}
        />
      </div>
    </Modal>
  );
};

export default AnalyzedScoreModal;
