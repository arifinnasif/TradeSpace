import { useEffect, useState } from "react";

import LineChart from "./LineChart";

import { UserData, BuySellData, PromotionData, AIData } from "./Data";
import "chart.js/auto";
import { Center, Spacer } from "@chakra-ui/react";
import PieChart from "./PieChart";
import { getDashboardData } from "../../../services/admin.service";

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
        label: "count",
        data: BuySellData.map((data) => data.count),
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
        borderWidth: 0,
      },
    ],
  });
  const [promotionCount, setPromotionCount] = useState({
    labels: PromotionData.map((data) => data.type),
    datasets: [
      {
        label: "count",
        data: PromotionData.map((data) => data.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  });
  const [approvableDeclinableCount, setApprovableDeclinableCount] = useState({
    labels: AIData.map((data) => data.type),
    datasets: [
      {
        label: "count",
        data: AIData.map((data) => data.count),
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(75, 192, 192, 0.8)"],
        borderWidth: 0,
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getDashboardData().then((res) => {
      console.log(res);

      setBuySellCount({
        labels: res.buy_sell_data.map((data) => data.type),
        datasets: [
          {
            label: "count",
            data: res.buy_sell_data.map((data) => data.count),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
            ],
            borderWidth: 0,
          },
        ],
      });

      setPromotionCount({
        labels: res.promotion_data.map((data) => data.type),
        datasets: [
          {
            label: "count",
            data: res.promotion_data.map((data) => data.count),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
            ],
            borderWidth: 0,
          },
        ],
      });

      setApprovableDeclinableCount({
        labels: res.ai_data.map((data) => data.type),
        datasets: [
          {
            label: "count",
            data: res.ai_data.map((data) => data.count),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(75, 192, 192, 0.8)",
            ],
            borderWidth: 0,
          },
        ],
      });
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Center padding={10} height={"md"} w="100%">
        <LineChart chartData={revenueData} />
      </Center>
      <Center padding={10} height={"md"} w="100%">
        <PieChart chartData={buySellCount} />
        <Spacer />
        <PieChart chartData={promotionCount} />
        <Spacer />
        <PieChart chartData={approvableDeclinableCount} />
      </Center>
    </>
  );
}

export default Dashboard;
