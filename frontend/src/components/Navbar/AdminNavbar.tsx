"use client";

// navbar 24m

import {
  Text,
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  useColorModeValue,
  useColorMode,
  Image,
  AvatarBadge,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import logo from "../../../../logos/tradespace-lettermark-combined-non-fill-teal.svg";
import logoForDarkMode from "../../../../logos/tradespace-lettermark-combined-non-fill-teal-light.svg";
import React from "react";

import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  href: string;
  isClicked: boolean;
}

const NavLink = (props: Props) => {
  const { children, href, isClicked } = props;

  return (
    <Box
      as={Link}
      to={href}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        // color: useColorModeValue("teal.500", "teal.200"),
        bg: useColorModeValue("gray.200", "gray.700"),
        color: useColorModeValue("black", "white"),
      }}
      bg={isClicked ? useColorModeValue("gray.300", "gray.700") : " "}
    >
      {children}
    </Box>
  );
};

// if the used id logged in or not
// checked by this function
// integrated with backend later
const isLoggedIn = () => {
  return true;
};

// get user image if he has any.
const userImage = () => {
  return "https://bit.ly/sage-adebayo";
};

// Why is the name necessary?
// Because the user name is displayed on the navbar
// incase the user has no image
const userName = () => {
  return "TradeSpace Admin";
};

const AdminNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHomeClicked, setIsHomeClicked] = React.useState(false);

  const changeHomeClicked = () => {
    setIsHomeClicked(true);
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        // to make the navbar stick to the top
        // the next 3 parameters are necessary
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            {/* company logo here. */}
            <Box>
              {/* link the image to home */}
              <Link to="/admin/">
                <Image
                  height="40px"
                  src={useColorModeValue(logo, logoForDarkMode)}
                  alt="Logo"
                />
              </Link>
            </Box>

            <HStack
              as={"nav"}
              mt={2}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box>
                <Text
                  as="b"
                  fontSize={22}
                  color={useColorModeValue("gray.600", "gray.300")}
                >
                  Admin Panel
                </Text>
              </Box>
              {/* <Box onClick={changeHomeClicked}>
                <NavLink href="/admin" isClicked={isHomeClicked}>
                  Home
                </NavLink>
              </Box> */}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <HStack spacing={"4"}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? (
                  <MoonIcon boxSize={6} />
                ) : (
                  <SunIcon boxSize={6} />
                )}
              </Button>

              {/* <Box onClick={changeAccountClicked}>
                <NavLink
                  href={isLoggedIn() ? "/profile" : "/login"}
                  isClicked={isAccountClicked}
                >
                  {isLoggedIn() ? "Profile" : "Login"}
                </NavLink>
              </Box> */}

              {/* <Button
                as={Link}
                to={isLoggedIn() ? "/ads/post-ad" : "/login"}
                variant="outline"
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                color={useColorModeValue("black", "white")}
                _hover={{
                  color: useColorModeValue("black", "white"),
                  bg: "teal.500",
                }}
                leftIcon={<AddIcon />}
              >
                Post Ad
              </Button> */}

              <Avatar
                as="a"
                size={"md"}
                colorScheme="teal"
                showBorder={true}
                name={userName()}

                // currently commenting out.
                // takes a lot of time to load
                // will handle later

                // src={userImage()}
              >
                <AvatarBadge boxSize="1.25em" bg="gray.500" color={"gold"}>
                  <FaCrown />
                </AvatarBadge>
              </Avatar>
            </HStack>
          </Flex>
        </Flex>
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
};

export default AdminNavbar;
