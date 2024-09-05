import { Spin } from "antd";
import React from "react";
import Chart from "react-google-charts";

const ScorePieChart = ({ data }) => {
  return (
    <Chart
      className="relative w-full h-full"
      chartType="PieChart"
      data={data}
      style={{
        display: "block",
        aspectRatio: 1.5, // Make the chart thinner
      }}
      legend_toggle={false}
      options={{
        // title: "My Daily Activities",
        pieSliceText: "none",
        pieHole: 0.4,
        is3D: false,
        legend: "none",
      }}
    />
  );
};

export default ScorePieChart;
