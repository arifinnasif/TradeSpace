import { Box, Text, VStack } from "@chakra-ui/react";

function Data({ posted_ads_count, sold_ads_count, active_ads_count }) {
  const list = [
    {
      id: 1,
      name: "Posted Ads",
      value: posted_ads_count,
      color: "yellow",
    },
    {
      id: 2,
      name: "Sold Ads",
      value: sold_ads_count,
      color: "green",
    },
    {
      id: 3,
      name: "Active Ads",
      value: active_ads_count,
      color: "cadet",
    },
  ];
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      {list.map((item) => (
        <Box
          key={item.id}
          as="li"
          w="full"
          py={3}
          px={5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          // borderColor="brand.light"
          borderColor="teal.200"
        >
          <Text color="teal">{item.name}</Text>
          <Text color={"teal"} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export default Data;
