import {
  Badge,
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
import { TransactionType, userService } from "../../../services/User.service";
import _ from "lodash";

const TransactionTable = () => {
  const [transactionList, setTransactionList] = useState<TransactionType[]>();
  useEffect(() => {
    console.log("fetching data");

    async function fetchData() {
      try {
        const response = await userService.getUserTransactions();
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
              <Th>PROMOTION</Th>
              <Th>METHOD</Th>
              <Th>AD TITLE</Th>
              <Th isNumeric>AD PRICE</Th>
              <Th>AD STATUS</Th>
              <Th isNumeric>AMOUNT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactionList?.map((transaction) => (
              <Tr>
                <Td>{transaction.trx_id}</Td>
                <Td>{new Date(transaction.created_at).toLocaleString()}</Td>
                <Td>{_.startCase(transaction.promotion)}</Td>
                <Td>{_.startCase(transaction.method)}</Td>
                <Td>{transaction.ad_title}</Td>
                <Td isNumeric>{transaction.ad_price}</Td>
                <Td>
                  {transaction.is_active_ad ? (
                    <Badge variant="solid" colorScheme="green">
                      ACTIVE
                    </Badge>
                  ) : (
                    <Badge variant="solid" colorScheme="red">
                      ARCHIVED
                    </Badge>
                  )}
                </Td>
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
