import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Badge,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
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
            Threat Score : 0.9
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <HStack spacing={2}>
            <Tag
              size={"lg"}
              borderRadius="full"
              variant="solid"
              colorScheme="red"
            >
              <TagLabel>Fake Image</TagLabel>
            </Tag>
            <Tag
              size={"lg"}
              borderRadius="full"
              variant="solid"
              colorScheme="red"
            >
              <TagLabel>No Match</TagLabel>
            </Tag>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AIModal;
