import { getScores } from "@/redux/report/actions";
import { useUser } from "@clerk/clerk-react";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnalyzedScoreModal, ScoreCard } from "./components";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import ScoreCardSkeleton from "./components/score-card/skeleton";
import { reportActions } from "@/redux/report/slice";

const ResumeScoreReports = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scores } = useSelector((state) => state.report);

  const [isLoading, setIsLoading] = useState(false);
  const [isShowScoreModal, setIsShowScoreModal] = useState(false);

  useLayoutEffect(() => {
    if (user) {
      setIsLoading(true);
      const callback = () => setIsLoading(false);
      dispatch(getScores(user?.id, callback));
    }
  }, [user]);

  return (
    <div id="custom-user-profile-page" className="relative w-full h-full">
      <h1 className="font-bold text-lg mb-5">Analysis History</h1>
      {isLoading && (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {[1, 2, 3, 4, 5]?.map((item) => (
            <ScoreCardSkeleton key={`skeleton-card-${item}`} />
          ))}
        </div>
      )}

      {scores?.length > 0 && !isLoading && (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {scores?.map((score) => (
            <ScoreCard
              key={`resume-card-${score?.id}`}
              scoreData={score}
              selectAndNavigateHandler={() => {
                setIsShowScoreModal(true);
                dispatch(reportActions.selectScore(score));
              }}
            />
          ))}
        </div>
      )}

      {scores?.length <= 0 && !isLoading && (
        <div className="w-full h-full flex flex-col items-start justify-center">
          <Empty
            className="mx-auto"
            imageStyle={{
              height: 100,
            }}
            description={
              <strong>You haven't performed and analysis yet</strong>
            }
          >
            <Button
              className="text-xs"
              size="small"
              type="primary"
              onClick={() => navigate("/resumes")}
            >
              Analyze now
            </Button>
          </Empty>
        </div>
      )}

      <AnalyzedScoreModal
        visible={isShowScoreModal}
        closeHandler={() => {
          setIsShowScoreModal(false);
          dispatch(reportActions.selectScore(null));
        }}
      />
    </div>
  );
};

export default ResumeScoreReports;
