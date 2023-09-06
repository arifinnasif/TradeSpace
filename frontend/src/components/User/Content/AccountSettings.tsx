import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { userProfileType, userService } from "../../../services/User.service";
import { useEffect, useState } from "react";

function ProfileInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<userProfileType>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userInfo = await userService.getUserInfo();
      setUserInfo(userInfo);
      // console.log(userInfo);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const textColor = "teal";
  return (
    <Card p="1rem" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Profile Information
        </Text>
      </CardHeader>
      <CardBody p="0px 5px">
        <Flex direction="column">
          <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
            Hi, I’m {userInfo?.name} , Decisions: If you can’t decide, the
            answer is no. If two equally difficult paths, choose the one more
            painful in the short term (pain avoidance is creating an illusion of
            equality).
          </Text>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              UserName:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {userInfo?.username}
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Full Name:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {userInfo?.name}
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Mobile:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {userInfo?.phone}
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Email:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {userInfo?.email}
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Date of Birth:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {/* show date in 5 December, 2023 format */}
              {new Date(userInfo?.dob).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Gender:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {/* make the first letter uppercase */}
              {userInfo?.gender.charAt(0).toUpperCase() +
                userInfo?.gender.slice(1)}
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Joined On:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {/* show date in 5 December, 2023 format */}
              {new Date(userInfo?.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Social Media:{" "}
            </Text>
            <Flex>
              <Link
                href="#"
                color="teal.300"
                fontSize="lg"
                me="10px"
                _hover={{ color: "teal.300" }}
              >
                <Icon as={FaFacebook} />
              </Link>
              <Link
                href="#"
                color="teal.300"
                fontSize="lg"
                me="10px"
                _hover={{ color: "teal.300" }}
              >
                <Icon as={FaInstagram} />
              </Link>
              <Link
                href="#"
                color="teal.300"
                fontSize="lg"
                me="10px"
                _hover={{ color: "teal.300" }}
              >
                <Icon as={FaTwitter} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default ProfileInfo;
