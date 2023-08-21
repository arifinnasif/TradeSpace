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

const CategoryCard: FunctionComponent<CategoryType> = ({ name, ads_count }) => {
  return (
    <Box p={"3"}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        colorScheme="teal"
        width={"100%"}
        h={"100"}
        borderColor={"teal"}
      >
        <HStack spacing={"3"}>
          <Spacer />
          <Icon color={"teal"} h={"14"} w={"16"} as={FaThList} />
          <Stack>
            <CardBody>
              <Heading colorScheme={"teal"} size="md">
                {name}
              </Heading>

              <Text py="2">{ads_count} Advertisements</Text>
            </CardBody>
          </Stack>
        </HStack>
      </Card>
    </Box>
  );
};

export default CategoryCard;
