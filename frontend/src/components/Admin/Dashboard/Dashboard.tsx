import { useState } from "react";

import LineChart from "./LineChart";

import { UserData, BuySellData } from "./Data";
import "chart.js/auto";
import { Box, Center } from "@chakra-ui/react";
import PieChart from "./PieChart";

function Dashboard() {
  const [revenueData, setRevenueData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Revenue",
        data: UserData.map((data) => data.revenue),
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "teal",
        borderWidth: 2,
      },
    ],
  });

  const [buySellCount, setBuySellCount] = useState({
    labels: BuySellData.map((data) => data.type),
    datasets: [
      {
        label: "Current Active Ad Types",
        data: BuySellData.map((data) => data.count),
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
        borderWidth: 0,
      },
    ],
  });

  return (
    <>
      <Center padding={10} height={"md"} w="100%">
        <LineChart chartData={revenueData} />
      </Center>
      <Center padding={10} height={"md"} w="100%">
        <PieChart chartData={buySellCount} />
      </Center>
    </>
  );
}

export default Dashboard;
