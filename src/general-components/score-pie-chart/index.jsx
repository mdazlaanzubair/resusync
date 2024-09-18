import React from "react";
import Chart from "react-google-charts";

const ScorePieChart = ({ data }) => {
  return (
    <Chart
      className="relative w-full h-full"
      chartType="PieChart"
      data={data}
      // style={{
      //   display: "block",
      // }}

      legend_toggle={false}
      options={{
        // title: "My Daily Activities",
        pieSliceText: "value",
        pieHole: 0.5,
        is3D: false,
        legend: {
          position: "right",
        },
        chartArea: {
          left: 10,
          top: 10,
          width: "90%",
          height: "90%",
        },
        tooltip: {
          text: "value", // Show only the value in the tooltip (no percentage)
          trigger: "hover",
        },
        animation: {
          startup: true,
          duration: 1000,
          easing: "inAndOut", // Other options: "linear", "in", "out"
        },
      }}
    />
  );
};

export default ScorePieChart;
