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
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const UserTable = () => {
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
            <Tr>
              <Td>arifinnasif</Td>
              <Td isNumeric>44</Td>
              <Td>Male</Td>
              <Td>2023-12-12</Td>
              <Td isNumeric>4</Td>
              <Td isNumeric>56</Td>
              <Td>
                <Button leftIcon={<FaVolumeMute />} colorScheme="red"></Button>
              </Td>
            </Tr>
            <Tr>
              <Td>fulan</Td>
              <Td isNumeric>23</Td>
              <Td>Male</Td>
              <Td>2023-12-12</Td>
              <Td isNumeric>4</Td>
              <Td isNumeric>5</Td>
              <Td>
                <Button leftIcon={<FaVolumeUp />} colorScheme="green"></Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
