import React from "react";
import Chart from "react-google-charts";

const ScorePieChart = ({
  data,
  position = "bottom",
  showLegend = true,
  totalPercent = "NA",
}) => {
  return (
    <div className="relative w-full h-full">
      <Chart
        chartType="PieChart"
        data={data}
        legend_toggle={false}
        style={{
          height:"auto",
          display: "block",
        }}
        options={{
          // title: "My Daily Activities",
          pieSliceText: "value",
          pieHole: 0.5,
          is3D: false,
          legend: showLegend
            ? {
                position,
              }
            : "none",
          chartArea: {
            left: 10,
            top: 10,
            width: "100%",
            height: "100%",
          },
          tooltip: {
            text: "value", // Show only the value in the tooltip (no percentage)
            trigger: "hover",
          },
        
        }}
      />
      {/* Text in the center of the pie chart */}
      {totalPercent && (
        <div
          className={`absolute top-[50%] -translate-y-[50%] ${
            showLegend
              ? "left-[25%] -translate-x-[0%]"
              : "left-[50%] -translate-x-[50%]"
          } `}
          style={{ pointerEvents: "none" }} // Ensure text doesn't block chart interaction
        >
          <span className="text-lg font-bold">{totalPercent}</span>
        </div>
      )}
    </div>
  );
};

export default ScorePieChart;
