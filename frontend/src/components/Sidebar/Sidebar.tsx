"use client";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Tabs,
  TabList,
  Tab,
  Center,
  Spacer,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronRight,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { Link, NavLink, NavLinkProps } from "react-router-dom";
import { color } from "framer-motion";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, link: "/admin/" },
  { name: "Ad Reviews", icon: FiTrendingUp, link: "/admin/ad_reviews" },
  { name: "User Management", icon: FiCompass, link: "/admin/user_management" },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Spacer height={"4"} />
        {/* <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex> */}
        {/* {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))} */}
        <Center>
          <Tabs
            defaultIndex={1}
            variant={"soft-rounded"}
            orientation="vertical"
            colorScheme="teal"
          >
            <TabList>
              {LinkItems.map((link) => (
                <Tab
                  margin={3}
                  _hover={{
                    bg: useColorModeValue("teal.100", "teal.900"),
                    color: "gray.600",
                  }}
                >
                  <NavItem key={link.name} icon={link.icon} link={link.link}>
                    <Text as="b">{link.name}</Text>
                  </NavItem>
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </Center>
      </Box>
      <p>Hello</p>
    </>
  );
};

interface NavItemProps extends NavLinkProps {
  icon: IconType;
  title?: string;
  link: string;
  children: React.ReactNode;
}
const NavItem = ({ icon, title, link, children, ...rest }: NavItemProps) => {
  return (
    <NavLink
      // onSelect={() => set}
      style={{ color: "inherit" }}
      // style={({ isActive }) => ({
      //   textDecoration: "none",
      //   background: isActive ? "tomato.400" : "blue.400",
      //   color: isActive ? "green" : "gray.600",
      // })}
      to={link}
    >
      <Flex
        align="center"
        // p="2"
        // mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        // _hover={{
        //   bg: "cyan.400",
        //   color: "white",
        // }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            // _groupHover={{
            //   color: "white",
            // }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text> */}
    </Flex>
  );
};
