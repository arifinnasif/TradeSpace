// teal themed spnner from chakra ui
import { Center, Spinner as ChakraSpinner } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface SpinnerProps {
  size: string;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ size }) => {
  return (
    <Center h="500px" textAlign="center" py="auto">
      <ChakraSpinner
        thickness="8px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        boxSize={size}
      />
    </Center>
  );
};

export default Spinner;
