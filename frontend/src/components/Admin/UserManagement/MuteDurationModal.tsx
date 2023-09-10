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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { declineAReview } from "../../../services/admin.service";

interface MuteDurationModalProps {
  username: string;
  initialRef: MutableRefObject<null>;
  finalRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
  refreshAction?: () => void;
}

const MuteDurationModal: FunctionComponent<MuteDurationModalProps> = ({
  username,
  initialRef,
  finalRef,
  isOpen,
  onClose,
  refreshAction,
}) => {
  const handleDaysChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setMuteDays(+tmp);
  };

  const handleHoursChange = (e: FormEvent<HTMLInputElement>) => {
    const tmp = e.currentTarget.value;
    setMuteHours(+tmp);
  };

  const [muteDays, setMuteDays] = useState<number>();
  const [muteHours, setMuteHours] = useState<number>();
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
            Mute {username}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Days</FormLabel>
            <Input
              ref={initialRef}
              value={muteDays}
              onChange={handleDaysChange}
              type="number"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Hours</FormLabel>
            <Input
              ref={initialRef}
              value={muteHours}
              onChange={handleHoursChange}
              type="number"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            spinner={<Spinner size={"md"} color="white" />}
          >
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MuteDurationModal;
