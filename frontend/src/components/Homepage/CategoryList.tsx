import { useEffect, useState } from "react";

import { CategoryType, homeService } from "../../services/Home.service";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

function CategoryList() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const categories = await homeService.getCategories();
      setCategories(categories);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={4}>
          <Heading colorScheme={"teal"} p={"3"}>
            Browse Ads by Category
          </Heading>
        </GridItem>
        {categories?.map((p) => (
          <Link to={`/ads?cat[]=${p.name}`}>
            <GridItem>
              <CategoryCard key={p.name} {...p} />
            </GridItem>
          </Link>
        ))}
      </Grid>
    </>
  );
}

export default CategoryList;
