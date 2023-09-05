"use client";

// navbar 24m

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react";

import {
  AddIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

import logo from "../../../../logos/tradespace-lettermark-combined-non-fill-teal.svg";
import logoForDarkMode from "../../../../logos/tradespace-lettermark-combined-non-fill-teal-light.svg";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


import { notificationService,
  NotificationType
} from "../../services/Notification.service";


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
// const LoggedIn = () => {
//   const { isAuth } = useSelector((state: any) => state.auth);
//   return isAuth;
// };

// get user image if he has any.
const userImage = () => {
  return "https://bit.ly/sage-adebayo";
};

// Why is the name necessary?
// Because the user name is displayed on the navbar
// incase the user has no image
const userName = () => {
  return "Sage Adebayo";
};

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHomeClicked, setIsHomeClicked] = React.useState(false);
  const [isAllAdsClicked, setIsAllAdsClicked] = React.useState(false);
  const [isAccountClicked, setIsAccountClicked] = React.useState(false);
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  const changeHomeClicked = () => {
    setIsHomeClicked(true);
  };

  const changeAllAdsClicked = () => {
    setIsAllAdsClicked(true);
  };

  const changeAccountClicked = () => {
    setIsAccountClicked(true);
  };



  // check if the user is logged in or not continuously
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const { isAuth } = useSelector((state: any) => state.auth);
  //     setIsAuth(isAuth);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);



  // check if new notifications are available for logged in user at every 5 seconds
  // if available, then show the red dot
  // if not, then don't show the red dot
  const [isNotificationAvailable, setIsNotificationAvailable] = React.useState(false);

  useEffect(() => {

    const fetchData = async () => {

      if (!isAuth) {
        return;
      }

      const notifications = await notificationService.getNotifications()

      if (notifications.length > 0) {
        // iterate through the notifications. check if any of them is not seen yet
        // if not seen, then set isNotificationAvailable to true
        setIsNotificationAvailable(false);

        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].is_seen === false) {
            // console.log("new notification available");
            setIsNotificationAvailable(true);
            break;
          }
        }
        
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);



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
        height={"60px"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            {/* company logo here. */}
            <Box>
              {/* link the image to home */}
              <Link to="/">
                <Image
                  height="40px"
                  src={useColorModeValue(logo, logoForDarkMode)}
                  alt="Logo"
                />
              </Link>
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box onClick={changeHomeClicked}>
                <NavLink href="/" isClicked={isHomeClicked}>
                  Home
                </NavLink>
              </Box>

              <Box onClick={changeAllAdsClicked}>
                <NavLink href="/ads" isClicked={isAllAdsClicked}>
                  All Ads
                </NavLink>
              </Box>
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
              
              {isAuth ?
                <Link to="/notifications">
                  <Button>
                    <BellIcon boxSize={6} />
                    {/* if there are new notifications, then show the red dot */}
                    {isNotificationAvailable ?
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "3px",
                        width: "10px",
                        height: "10px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                      }}
                    ></span>
                    :
                    <></>
                    }
                  </Button>
                </Link>
              :
                <></>
              }
              
              <Box onClick={changeAccountClicked}>
                <NavLink
                  href={isAuth ? "/profile" : "/login"}
                  isClicked={isAccountClicked}
                >
                  {isAuth ? "Profile" : "Login"}
                </NavLink>
              </Box>

              <Button
                as={Link}
                to={isAuth ? "/ads/post-ad" : "/login"}
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
              </Button>

              {isAuth ? (
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
              ) : (
                <></>
              )}
            </HStack>
          </Flex>
        </Flex>
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
};

export default Navbar;
