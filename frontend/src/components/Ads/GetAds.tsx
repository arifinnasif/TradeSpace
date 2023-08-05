// import { Link } from "react-router-dom";

import { Grid, GridItem, Link, VStack } from "@chakra-ui/react";
import AdCard from "./AdCard";

const ads = [
  {
    id: "1",
    title: "react tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum6/420/260",
    price: "$23.00",
    is_used: true,
    is_negotiable: false,
  },
  {
    id: "2",
    title: "chakraUI mug",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum5/421/261",
    price: "$15.00",
    is_used: true,
    is_negotiable: true,
  },
  {
    id: "3",
    title: "black tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum4/422/262",
    price: "$10.25",
    is_used: false,
    is_negotiable: true,
  },
  {
    id: "4",
    title: "react tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum3/420/260",
    price: "$23.00",
    is_used: true,
    is_negotiable: true,
  },
  {
    id: "5",
    title: "chakraUI mug",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum2/421/261",
    price: "$15.00",
    is_used: false,
    is_negotiable: true,
  },
  {
    id: "6",
    title: "black tshirt",
    category: "category",
    imageSrc: "https://picsum.photos/seed/picsum1/422/262",
    price: "$10.25",
    is_used: true,
    is_negotiable: false,
  },
];

console.log(ads);

function GetAds() {
  return (
    <Grid
      templateAreas={`"filter_section ad_section"`}
      gridTemplateColumns={"1fr 700px"}
      color={"teal.600"}
      mx={"70px"}
      my={"10px"}
    >
      <GridItem area={"filter_section"}>Filter</GridItem>
      <GridItem area={"ad_section"}>
        <VStack spacing={"0"}>
          {ads.map((p) => (
            <Link>
              <AdCard key={p.id} {...p} />
            </Link>
          ))}
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default GetAds;
