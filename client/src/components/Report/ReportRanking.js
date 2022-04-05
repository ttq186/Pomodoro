import {
  Box,
  Text,
  Th,
  Td,
  Tr,
  Table,
  Thead,
  Tbody,
  Button,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const ReportRanking = () => {
  return (
    <>
      <Text
        fontSize='xl'
        fontWeight='bold'
        textAlign='center'
        color='gray.700'
        mt='0.5em'
      >
        Focus time this week
      </Text>
      <Table textAlign='center'>
        <Thead>
          <Tr>
            <Th w='5%'>#</Th>
            <Th w='80%'>USER</Th>
            <Th w='15%'>TIME</Th>
          </Tr>
        </Thead>
        <Tbody color='gray.600'>
          <Tr color='gray.600'>
            <Td>1</Td>
            <Td fontWeight='bold'>Thanh Quang</Td>
            <Td fontWeight='bold' fontSize='20px'>
              60.5h
            </Td>
          </Tr>
          <Tr>
            <Td>1</Td>
            <Td fontWeight='bold'>Thanh Quang</Td>
            <Td fontWeight='bold' fontSize='20px'>
              60.5h
            </Td>
          </Tr>
          <Tr>
            <Td>1</Td>
            <Td fontWeight='bold'>Thanh Quang</Td>
            <Td fontWeight='bold' fontSize='20px'>
              60.5h
            </Td>
          </Tr>
          <Tr>
            <Td>1</Td>
            <Td fontWeight='bold'>Thanh Quang</Td>
            <Td fontWeight='bold' fontSize='20px'>
              60.5h
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <Box d='flex' justifyContent='center' alignItems='center' my='1em'>
        <Button
          rightIcon={<ArrowBackIcon />}
          pl='10px'
          h='2em'
          variant='outline'
        ></Button>
        <Box px='20px' fontSize='23px' fontWeight='bold' color='gray.600'>
          1
        </Box>
        <Button
          rightIcon={<ArrowForwardIcon />}
          pl='10px'
          h='2em'
          variant='outline'
        ></Button>
      </Box>
    </>
  );
};

export default ReportRanking;
