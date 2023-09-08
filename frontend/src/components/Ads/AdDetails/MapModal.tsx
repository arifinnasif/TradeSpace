import { MutableRefObject } from "react";

import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface MapModalProps {
  initialRef: MutableRefObject<null>;
  finalRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
}

const MapModal: FunctionComponent<MapModalProps> = ({
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
            "Lorem"
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
          quibusdam exercitationem natus ullam accusamus sit alias cupiditate
          iure voluptatibus, delectus necessitatibus omnis dolore voluptas nemo
          dolor quo nihil, molestias libero?
        </ModalBody>

        <ModalFooter>footer area</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MapModal;
