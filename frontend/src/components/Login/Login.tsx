import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { PasswordField } from "./PasswordField";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginComponent;
