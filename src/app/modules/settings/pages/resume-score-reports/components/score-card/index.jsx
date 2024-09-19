import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Button, Progress, Tooltip, Typography } from "antd";
import { truncateText } from "@/utils";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const ScoreCard = ({ scoreData, selectAndNavigateHandler }) => {
  const [showCore, setShowCore] = useState(true);

  // Memoize the percentage calculation to optimize performance
  const corePercent = useMemo(() => {
    const totalScore =
      scoreData?.keyword_matched +
      scoreData?.skills_aligned +
      scoreData?.experience_relevance +
      scoreData?.education_relevance +
      scoreData?.quantifiable_achievement;

    return Math.round((totalScore / 25) * 100);
  }, [scoreData]);

  const softPercent = useMemo(() => {
    const totalScore =
      scoreData?.culture_fit +
      scoreData?.communication_skill +
      scoreData?.problem_solving_skill +
      scoreData?.adaptability +
      scoreData?.career_progression;

    return Math.round((totalScore / 25) * 100);
  }, [scoreData]);

  return (
    <div
      className="relative group flex flex-col w-full h-auto border rounded-lg hover:shadow overflow-hidden cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        selectAndNavigateHandler();
      }}
    >
      <div className="w-full flex flex-col items-center justify-between gap-3 p-5">
        <h1 className="text-lg font-semibold">
          {showCore ? "Core Evaluation" : "Soft Evaluation"}
        </h1>
        {showCore ? (
          <Progress
            className="mb-5 mx-auto"
            type="circle"
            percent={corePercent}
          />
        ) : (
          <Progress
            className="mb-5 mx-auto"
            type="circle"
            percent={softPercent}
          />
        )}
        <div className="py-2 pl-2 flex flex-col items-center">
          <Tooltip
            placement="top"
            title={scoreData?.resumes?.title}
            overlayInnerStyle={{ fontSize: "0.75rem" }}
            
          >
            <p className="font-semibold text-xs m-0 p-0 cursor-pointer">
              {truncateText(scoreData?.resumes?.title, 20)}
            </p>
          </Tooltip>

          <Tooltip
            placement="bottom"
            title={`Analyzed ${dayjs(scoreData?.createdAt).fromNow()}`}
            overlayInnerStyle={{ fontSize: "0.7rem" }}
          >
            <Typography.Text
              className="font-light text-[0.6rem] m-0 p-0 cursor-pointer"
              ellipsis
            >
              {truncateText(
                `Analyzed ${dayjs(scoreData?.createdAt).fromNow()}`,
                20
              )}
            </Typography.Text>
          </Tooltip>

          <Button
            className="text-sm bg-transparent mt-5"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();

              setShowCore(!showCore);
            }}
          >
            {showCore ? "View Soft Evaluations" : "View Core Evaluations"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
