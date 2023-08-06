// teal themed spnner from chakra ui
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface SpinnerProps {
  size: string;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ size }) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <ChakraSpinner size={size} />
      </div>
    </>
  );
};

export default Spinner;
