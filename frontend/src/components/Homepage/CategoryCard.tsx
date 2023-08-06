import {
  Text,
  Card,
  Stack,
  CardBody,
  Heading,
  Box,
  Icon,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { FaThList } from "react-icons/fa";
import { CategoryType } from "../../services/Home.service";

const CategoryCard: FunctionComponent<CategoryType> = ({ category, count }) => {
  return (
    <Box p={"3"}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        colorScheme="teal"
        width={"80"}
        height={"40"}
      >
        <HStack spacing={"3"}>
          <Spacer />
          <Icon w={"16"} h={"20"} as={FaThList} />
          <Stack>
            <CardBody>
              <Heading size="md">{category}</Heading>

              <Text py="2">{count} Advertisements</Text>
            </CardBody>
          </Stack>
        </HStack>
      </Card>
    </Box>
  );
};

export default CategoryCard;
