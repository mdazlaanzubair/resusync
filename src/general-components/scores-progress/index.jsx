import { Collapse, Progress } from "antd";
import React from "react";

const ShowScoresProgress = ({
  coreData,
  softData,
  geminiRemarks,
  missing_keywords,
  overAllCore,
  overAllSoft,
}) => {
  // Function to render the custom score text
  const renderScoreText = (value) => `${value} out of 5`;

  const items = [
    {
      key: "1",
      label: <h1 className="text-sm font-semibold">Core Evaluation Marking</h1>,
      children: coreData?.map((score) => {
        const [key, value] = Object.entries(score)[0];
        return (
          <div key={`key-${key}`} className="flex flex-col my-2">
            <div className="w-full flex items-center justify-between">
              <strong>{key}</strong>
              <em className="text-xs text-primary">{renderScoreText(value)}</em>
            </div>
            <Progress
              percent={(value / 5) * 100} // Convert score to percentage
              size="small"
              strokeColor="#1890ff"
              trailColor="#f5f5f5"
              showInfo={false} // Hide default info
            />
          </div>
        );
      }),
    },
    {
      key: "2",
      label: <h1 className="text-sm font-semibold">Soft Evaluation Marking</h1>,
      children: softData?.map((score) => {
        const [key, value] = Object.entries(score)[0];
        return (
          <div key={`key-${key}`} className="flex flex-col my-2">
            <div className="w-full flex items-center justify-between">
              <strong>{key}</strong>
              <em className="text-xs text-primary">{renderScoreText(value)}</em>
            </div>
            <Progress
              percent={(value / 5) * 100} // Convert score to percentage
              size="small"
              strokeColor="#1890ff"
              trailColor="#f5f5f5"
              showInfo={false} // Hide default info
            />
          </div>
        );
      }),
    },
    {
      key: "3",
      label: <h1 className="text-sm font-semibold">Gemini Remarks</h1>,
      children: <p className="text-xs text-left">{geminiRemarks}</p>,
    },
    {
      key: "4",
      label: <h1 className="text-sm font-semibold">Missing Keywords</h1>,
      children: (
        <p className="text-xs flex flex-wrap items-center gap-1">
          {missing_keywords?.length > 0 ? (
            missing_keywords?.map((item) => (
              <span
                key={`word-${item}`}
                className="px-2 py-1 bg-white rounded-sm text-black/50"
              >
                {item}
              </span>
            ))
          ) : (
            <strong>No missing keyword found</strong>
          )}
        </p>
      ),
    },
  ];

  return (
    <div className="relative w-full h-full text-center grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div className="p-5 bg-secondary rounded-lg shadow-sm border">
        <Progress
          className="mb-5 mx-auto"
          type="circle"
          percent={overAllCore}
        />
        <h1 className="font-semibold mb-3">Over All Core Score</h1>
      </div>
      <div className="p-5 bg-secondary rounded-lg shadow-sm border">
        <Progress
          className="mb-5 mx-auto"
          type="circle"
          percent={overAllSoft}
        />
        <h1 className="font-semibold mb-3">Over All Soft Score</h1>
      </div>
      <div className="col-span-1 lg:col-span-2 ">
        <Collapse defaultActiveKey={"1"} items={items} accordion />
      </div>
    </div>
  );
};

export default ShowScoresProgress;
