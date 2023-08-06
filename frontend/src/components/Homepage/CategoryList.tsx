import { useEffect, useState } from "react";

import { CategoryType, homeService } from "../../services/Home.service";
import { HStack } from "@chakra-ui/react";
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
    <HStack spacing={"2"}>
      {categories?.map((p) => (
        <CategoryCard key={p.category} {...p} />
      ))}
    </HStack>
  );
}

export default CategoryList;
