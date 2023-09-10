import { Button, Td, Tr, useDisclosure } from "@chakra-ui/react";
import _ from "lodash";
import { FunctionComponent } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import MuteDurationModal from "./MuteDurationModal";
import React from "react";

interface UserTableEntryProps {
  username: string;
  age: number;
  gender: string;
  created_at: Date;
  approved_ads: number;
  pending_ads: number;
  is_muted: boolean;
}

const UserTableEntry: FunctionComponent<UserTableEntryProps> = ({
  username,
  age,
  gender,
  created_at,
  approved_ads,
  pending_ads,
  is_muted,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialMuteRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Tr>
        <Td>@{username}</Td>
        <Td isNumeric>{age}</Td>
        <Td>{_.startCase(gender)}</Td>
        <Td>{new Date(created_at).toLocaleString()}</Td>
        <Td isNumeric>{approved_ads}</Td>
        <Td isNumeric>{pending_ads}</Td>
        <Td>
          {is_muted ? (
            <Button leftIcon={<FaVolumeMute />} colorScheme="red"></Button>
          ) : (
            <Button
              leftIcon={<FaVolumeUp />}
              onClick={() => onOpen()}
              colorScheme="green"
            ></Button>
          )}
        </Td>
      </Tr>
      <MuteDurationModal
        username={username}
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialMuteRef}
        finalRef={finalRef}
      />
    </>
  );
};

export default UserTableEntry;
