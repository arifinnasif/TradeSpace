import { useEffect, useState } from "react";
import { homeService } from "../services/Home.service";

const Protected = () => {
  const [info, setInfo] = useState("");

  useEffect(() => {
    async function fetchData() {
      const info = await homeService.protectedInfo();
      setInfo(info);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>Protected</h1>
      <p>{info}</p>
    </div>
  );
};

export default Protected;
