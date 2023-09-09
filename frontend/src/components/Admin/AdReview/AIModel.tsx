import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FunctionComponent, MutableRefObject } from "react";

interface AIModalProps {
  initialRef: MutableRefObject<null>;
  finalRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
}

const AIModal: FunctionComponent<AIModalProps> = ({
  initialRef,
  finalRef,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text maxWidth={"350px"} noOfLines={1}>
            TITLE
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam vel,
          maxime tempora voluptatibus a commodi excepturi delectus iusto odio
          possimus voluptatum, itaque illum, alias sit nisi. Iste voluptatibus
          laborum at!
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AIModal;
