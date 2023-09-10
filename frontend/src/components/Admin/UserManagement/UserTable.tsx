import {
  Box,
  Button,
  Center,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { UserType, getAllUsers } from "../../../services/admin.service";
import UserTableEntry from "./UserTableEntry";

const UserTable = () => {
  const [userList, setUserList] = useState<UserType[]>();

  async function fetchData() {
    try {
      const response = await getAllUsers();
      console.log("moo", response);

      setUserList(response!);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        fetchData();
      }, 5000);
    }
  }

  useEffect(() => {
    console.log("fetching data");

    fetchData();
  }, []);
  return (
    <Box padding={6}>
      <Center>
        <Heading size="md">Current Users</Heading>
      </Center>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>User Table</TableCaption>
          <Thead>
            <Tr>
              <Th>USERNAME</Th>
              <Th isNumeric>AGE</Th>
              <Th>GENDER</Th>
              <Th>JOINED</Th>
              <Th isNumeric>ACTIVE ADS</Th>
              <Th isNumeric>PENDING ADS</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList?.map((user) => (
              <UserTableEntry {...user} refreshAction={fetchData} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
