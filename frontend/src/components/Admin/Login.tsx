"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/AuthSlice";
import { login } from "../../services/admin.service";
import { useCookies } from "react-cookie";
import { FaTerminal } from "react-icons/fa";

export default function Login() {
  const [cookies, setCookie] = useCookies(["token"]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      setCookie("token", response.data.token);

      console.log(response);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("token", response.data.token);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Admin Login</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Control can sometimes be an illusion. But sometimes you need
            illusion to gain control <FaTerminal />
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => onChange(e)}
                id="email"
                name="email"
                value={values.email}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => onChange(e)}
                value={values.password}
                id="password"
                name="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={(e) => onSubmit(e)}
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
