import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Center,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { IconType } from "react-icons";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: IconType;
}

const InfoCard: FunctionComponent<InfoCardProps> = ({
  title,
  subtitle,
  icon,
}) => {
  return (
    <Card
      variant={"elevated"}
      shadow={"xl"}
      bg={useColorModeValue("teal.50", "teal.900")}
      height={"xs"}
    >
      <CardBody textAlign={"center"}>
        <AbsoluteCenter>
          <Icon as={icon} w={10} h={10} alignSelf={"center"} />

          <Heading size="xl">{title}</Heading>
          {subtitle && <Text fontSize="lg">{subtitle}</Text>}
        </AbsoluteCenter>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
