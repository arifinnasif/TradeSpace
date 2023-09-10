import {
  Box,
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

const TransactionTable = () => {
  return (
    <Box padding={6}>
      <Center>
        <Heading size="md">Transactions</Heading>
      </Center>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Transaction History Table</TableCaption>
          <Thead>
            <Tr>
              <Th>TRX ID</Th>
              <Th>DATE</Th>
              <Th>USERNAME</Th>
              <Th>PROMOTION</Th>
              <Th>METHOD</Th>
              <Th>AD ID</Th>
              <Th isNumeric>AMOUNT</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>30</Td>
              <Td>2023-12-12</Td>
              <Td>arifinnasif</Td>
              <Td>GOLD</Td>
              <Td>card</Td>
              <Td>2</Td>
              <Td isNumeric>400</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionTable;
