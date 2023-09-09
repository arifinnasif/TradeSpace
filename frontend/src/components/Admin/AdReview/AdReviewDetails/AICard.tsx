import {
  Card,
  CardHeader,
  useColorModeValue,
  Heading,
  Divider,
  CardBody,
  VStack,
  HStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

const AICard = ({ aiVerdict }: { aiVerdict: any }) => {
  return (
    <Card
      width={{ base: "100%" }}
      height="md"
      //   direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant={"elevated"}
      shadow={"xl"}
      mt={6}
      bg={useColorModeValue("teal.50", "teal.900")}
    >
      <CardHeader>
        <Heading size="xl">Description</Heading>
        <Divider />
      </CardHeader>
      <CardBody>
        <VStack spacing={2}>
          {aiVerdict.exif_verdict && (
            <HStack spacing={2}>
              {aiVerdict.exif_verdict.is_image_downloaded && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Downloaded</TagLabel>
                </Tag>
              )}
              {aiVerdict.exif_verdict.is_image_tampered && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Tampered</TagLabel>
                </Tag>
              )}
              {aiVerdict.exif_verdict.is_image_stale && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Stale</TagLabel>
                </Tag>
              )}
            </HStack>
          )}
          {aiVerdict.category_verdict && (
            <HStack spacing={2}>
              {aiVerdict.category_verdict.specified_category_probability && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="orange"
                >
                  <TagLabel>
                    {(
                      aiVerdict.category_verdict
                        .specified_category_probability * 100
                    ).toFixed(2)}
                    % match
                  </TagLabel>
                </Tag>
              )}
            </HStack>
          )}
          {aiVerdict.nlp_verdict && (
            <HStack spacing={2}>
              {aiVerdict.nlp_verdict.has_banned_words && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Banned Words</TagLabel>
                </Tag>
              )}
              {aiVerdict.nlp_verdict.has_harmful_links && (
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                >
                  <TagLabel>Malicious Links</TagLabel>
                </Tag>
              )}
            </HStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AICard;
