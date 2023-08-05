import { ChatIcon } from "@chakra-ui/icons";
import {
  Grid,
  Image,
  GridItem,
  Text,
  Icon,
  HStack,
  Badge,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
  Button,
  Divider,
} from "@chakra-ui/react";
import {
  FaUser,
  FaThList,
  FaClock,
  FaDollarSign,
  FaCalendarDay,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SlBadge } from "react-icons/sl";

export default function AdDetils() {
  return (
    // <Box>

    // </Box>

    <Grid
      templateAreas={`"adtype_section adtype_section"
                            "header_section header_section"
                            "image_section feature_section"
                            "details_section details_section"
                            "button_section button_section"`}
      gridTemplateRows={"50px 50px 400px 1fr 1fr"}
      gridTemplateColumns={"400px 1fr"}
      // h='200px'
      // w='100%'
      gap="3"
      // color="blackAlpha.700"
      // fontWeight="bold"
      mx="70px"
    >
      <GridItem
        py="2"
        textAlign="center"
        // bg="orange.300"
        area={"adtype_section"}
      >
        <Text fontWeight="bold" fontSize="2xl">
          Sell Ad
        </Text>
        <Divider/>
      </GridItem>
      <GridItem pl="2" fontWeight="bold" area={"header_section"}>
        <HStack>
          <Text fontSize="4xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quod
            cum nobis.
          </Text>
          <Tag
            size="lg"
            key="lg"
            variant="solid"
            fontWeight="bold"
            colorScheme="yellow"
          >
            <TagLeftIcon as={SlBadge} />
            <TagLabel>Gold</TagLabel>
          </Tag>
        </HStack>
      </GridItem>
      <GridItem pl="2" area={"image_section"}>
        <Image
          boxSize="400px"
          objectFit="cover"
          src="https://placehold.co/600x400"
        />
      </GridItem>
      <GridItem p="5" fontWeight="bold" fontSize="xl" area={"feature_section"}>
        <VStack align="left">
          <HStack>
            <Icon as={FaUser} />
            <Text>@johndoe</Text>
            <Text>(John Doe)</Text>
          </HStack>
          <HStack>
            <Icon as={FaCalendarDay} />
            <Text>4 June, 2023</Text>
          </HStack>
          <HStack>
            <Icon as={FaThList} />
            <Text>Laptop</Text>
          </HStack>
          <HStack>
            <Icon as={FaDollarSign} />
            <Text>BDT 25,000</Text>
            <Badge colorScheme="green" borderRadius="md">
              Negotiable
            </Badge>
          </HStack>
          <HStack>
            <Icon as={FaClock} />
            <Text>2 years</Text>
          </HStack>
        </VStack>
      </GridItem>
      <GridItem pl="2" area={"details_section"}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est delectus
        totam aliquid quis, culpa iste ratione esse ipsum hic sint possimus
        vitae aliquam perspiciatis consequuntur quibusdam ex accusantium
        suscipit recusandae adipisci dolor nulla? Voluptates est temporibus
        repellendus porro totam debitis excepturi sed, voluptatem numquam eum
        corporis mollitia soluta pariatur, modi dignissimos voluptatum ducimus
        rem, ipsum sit labore corrupti. Sequi ducimus accusamus laborum magni
        repudiandae pariatur, delectus aut voluptatum at vel quis, nisi
        laboriosam! Temporibus facere reiciendis officia ratione eos, illo error
        molestiae dicta. Facere, eaque nemo? Aspernatur dolor beatae
        perspiciatis repellat natus voluptatem, quos eum. Accusamus vero vel
        atque labore pariatur impedit sequi ad! Vel quos, architecto distinctio
        quasi, quae corrupti non omnis ipsam maxime consectetur, vitae sequi.
        Ipsa, esse.
      </GridItem>

      <GridItem area={"button_section"}>
        <Divider/>
        <HStack py="4" spacing={4} direction="row" justify="right">
          <Button leftIcon={<ChatIcon/>} colorScheme="teal" size="lg">
            Chat
          </Button>
          <Button leftIcon={<FaMapMarkerAlt/>} colorScheme="teal" size="lg">
            Address
          </Button>
        </HStack>
      </GridItem>
    </Grid>
  );
}
