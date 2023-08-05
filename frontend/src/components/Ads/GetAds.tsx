// import { Link } from "react-router-dom";
import AdCard from "./AdCard.tsx";
import { VStack } from "@chakra-ui/react";

const ads = [
  {
    id: "1",
    title: "react tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum6/420/260",
    price: "$23.00",
  },
  {
    id: "2",
    title: "chakraUI mug",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum5/421/261",
    price: "$15.00",
  },
  {
    id: "3",
    title: "black tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum4/422/262",
    price: "$10.25",
  },
  {
    id: "4",
    title: "react tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum3/420/260",
    price: "$23.00",
  },
  {
    id: "5",
    title: "chakraUI mug",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum2/421/261",
    price: "$15.00",
  },
  {
    id: "6",
    title: "black tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum1/422/262",
    price: "$10.25",
  },
];

function GetAds() {
  return (
    <VStack spacing={"0"}>
      {ads.map((p) => (
        <AdCard key={p.id} {...p} />
      ))}
    </VStack>
  );
}

export default GetAds;
