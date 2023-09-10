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
import { muteAUser } from "../../../services/admin.service";

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

  const [muteDays, setMuteDays] = useState<number>(1);
  const [muteHours, setMuteHours] = useState<number>(0);

  const [isMuteButtonLoading, setIsMuteButtonLoading] =
    useState<boolean>(false);

  const toast = useToast();

  const muteButtonAction = async (username: string) => {
    setIsMuteButtonLoading(true);
    console.log("mute button clicked", username, muteDays, muteHours);

    try {
      await muteAUser(username, { days: muteDays, hours: muteHours });
      toast({
        title: "User muted successfully",
        status: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Cannot mute this user",
        description: error.message,
        status: "error",
      });
    }
    setIsMuteButtonLoading(false);
    refreshAction && refreshAction();
    onClose();
  };

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
            Mute @{username}
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
            isLoading={isMuteButtonLoading}
            onClick={() => {
              muteButtonAction(username);
              //   refreshAction && refreshAction();
            }}
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
