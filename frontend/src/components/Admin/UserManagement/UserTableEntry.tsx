import { Button, Td, Tr } from "@chakra-ui/react";
import _ from "lodash";
import { FunctionComponent } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

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
  return (
    <Tr>
      <Td>{username}</Td>
      <Td isNumeric>{age}</Td>
      <Td>{_.startCase(gender)}</Td>
      <Td>{new Date(created_at).toLocaleString()}</Td>
      <Td isNumeric>{approved_ads}</Td>
      <Td isNumeric>{pending_ads}</Td>
      <Td>
        {is_muted ? (
          <Button leftIcon={<FaVolumeMute />} colorScheme="red"></Button>
        ) : (
          <Button leftIcon={<FaVolumeUp />} colorScheme="green"></Button>
        )}
      </Td>
    </Tr>
  );
};

export default UserTableEntry;
