import { useEffect, useState } from "react";

import { CategoryType, homeService } from "../../services/Home.service";
import { Grid } from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";

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
    <Grid templateColumns="repeat(4, 1fr)" mx={"10"}>
      {categories?.map((p) => (
        <CategoryCard key={p.category} {...p} />
      ))}
    </Grid>
  );
}

export default CategoryList;
