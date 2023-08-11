"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  useColorModeValue,
  useColorMode,
  Image,
  Link,
} from "@chakra-ui/react";

import {
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

import logo from "../../../../logos/tradespace-lettermark-white-navbar.png"
import React from "react";




interface Props {
  children: React.ReactNode;
  href: string;
}

const NavLink = (props: Props) => {
  const { children, href } = props;

  return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          // color: useColorModeValue("teal.500", "teal.200"),
          bg: useColorModeValue("gray.200", "gray.700"),
          color: useColorModeValue("black", "white"),
        }}
        href={href}
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
}

// get user image if he has any.
const userImage = () => {
  return "https://bit.ly/sage-adebayo";
}

// Why is the name necessary?
// Because the user name is displayed on the navbar
// incase the user has no image
const userName = () => {
  return "Sage Adebayo";
}

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              {/* link the image to home */}
              <Link href="/">
              <Image width='115px' height='35px' src={logo} alt="Logo" />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink href="/">
                  Home
              </NavLink>

              <NavLink href="/ads">
                All Ads
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <HStack spacing={"4"}>
              <Button onClick={toggleColorMode}>
                {
                  colorMode === "light" ? <MoonIcon boxSize={6}/> : <SunIcon boxSize={6}/>
                }
              </Button>

              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  // color: useColorModeValue("teal.500", "teal.200"),
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: useColorModeValue("black", "white")
                }}
                href={isLoggedIn() ? "/profile" : "/login"}
              >
                { isLoggedIn() ? "Profile" : "Login" }
              </Box>

              <Button
                as="a"
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                color={"white"}
                _hover={{ 
                  color: useColorModeValue("black", "white"),
                  bg: "teal.600"
                }}
                href={isLoggedIn() ? "/ads/post-ad" : "/login"}
                leftIcon={<AddIcon />}
              >
                Post Ad
              </Button>
    
              {
                isLoggedIn() ?
                <Avatar
                  as="a"
                  size={"md"}
                  colorScheme="teal"
                  showBorder={true}
                  name={userName()}
                  href="/profile"
                  // currently commenting out. 
                  // takes a lot of time to load
                  // will handle later
                  // src={userImage()}
                />
                :
                <></>
              }
            </HStack>
          </Flex>
        </Flex>
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
};

export default Navbar;
