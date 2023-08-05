import { Card, CardBody, Image, Stack, Heading, Text } from "@chakra-ui/react";

function AdCard() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://placehold.co/600x400"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">Galaxy A52 (Used)</Heading>
          {/* Category */}
          <Text py={2}>Mobile Phone</Text>
          {/* Price */}
          <Text>20000 Tk (Negotiable)</Text>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default AdCard;
