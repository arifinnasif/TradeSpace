import { Line } from "react-chartjs-2";
import { ChartData, Chart as ChartJS, Point } from "chart.js/auto";

function LineChart({
  chartData,
}: {
  chartData: ChartData<"line", (number | Point | null)[], unknown>;
}) {
  return <Line data={chartData} width={"550px"} />;
}

export default LineChart;
