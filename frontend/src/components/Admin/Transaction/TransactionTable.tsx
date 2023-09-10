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
import { useEffect, useState } from "react";
import {
  TransactionType,
  getTransactions,
} from "../../../services/admin.service";
import _ from "lodash";

const TransactionTable = () => {
  const [transactionList, setTransactionList] = useState<TransactionType[]>();
  useEffect(() => {
    console.log("fetching data");

    async function fetchData() {
      try {
        const response = await getTransactions();
        console.log("woof", response);
        setTransactionList(response!);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          fetchData();
        }, 5000);
      }
    }

    fetchData();
  }, []);
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
              <Th>STATUS</Th>
              <Th>AD ID</Th>
              <Th isNumeric>AMOUNT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactionList?.map((transaction) => (
              <Tr>
                <Td>{transaction.trx_id}</Td>
                <Td>{new Date(transaction.created_at).toLocaleString()}</Td>
                <Td>@{transaction.username}</Td>
                <Td>{_.startCase(transaction.promotion)}</Td>
                <Td>{_.startCase(transaction.method)}</Td>
                <Td>{transaction.status}</Td>
                <Td>{transaction.ad_id}</Td>
                <Td isNumeric>{transaction.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionTable;
