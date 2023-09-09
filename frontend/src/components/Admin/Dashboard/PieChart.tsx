import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData, Chart as ChartJS, Point } from "chart.js/auto";

function PieChart({
  chartData,
}: {
  chartData: ChartData<"pie", (number | Point | null)[], unknown>;
}) {
  return <Pie data={chartData} />;
}

export default PieChart;
