import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

const InfoCard = () => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Buy</Heading>
      </CardHeader>
      {/* <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter> */}
    </Card>
  );
};

export default InfoCard;
