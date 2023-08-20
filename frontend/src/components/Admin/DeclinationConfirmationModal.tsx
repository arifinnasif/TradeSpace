import { FormEvent, MutableRefObject, useState } from "react";

import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { declineAReview } from "../../services/admin.service";

interface DeclinationConfirmationModal {
  id: number;
  title: string;
  initialRef: MutableRefObject<null>;
  finalRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
  refreshAction: () => void;
}

const DeclinationConfirmationModal: FunctionComponent<
  DeclinationConfirmationModal
> = ({ id, title, initialRef, finalRef, isOpen, onClose, refreshAction }) => {
  const declineButtonAction = async (review_id: number) => {
    console.log("decline button clicked", review_id, reason);
    await declineAReview(review_id, { reason: reason });
  };

  const handleDeclinationReasonChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setReason(tmp);
  };

  const [reason, setReason] = useState<string>();
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
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Reason for declination</FormLabel>
            <Input
              ref={initialRef}
              value={reason}
              onChange={handleDeclinationReasonChange}
              placeholder="eg. Image not taken by user"
            />
          </FormControl>

          {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              declineButtonAction(+id);
              refreshAction();
              onClose();
            }}
          >
            Confirm Declination
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeclinationConfirmationModal;
