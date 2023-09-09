import { useState } from "react";

import LineChart from "./LineChart";

import { UserData } from "./Data";
import "chart.js/auto";
import { Box, Center } from "@chakra-ui/react";

function Dashboard() {
  const [userData, setUserData] = useState({
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

  return (
    <Center padding={10} height={"md"} w="100%">
      <LineChart chartData={userData} />
    </Center>
  );
}

export default Dashboard;
