import { Box, Th, Td, Tr, Table, Thead, Tbody, Button } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const ReportTasks = () => {
  return (
    <>
      <Table textAlign='center'>
        <Thead>
          <Tr>
            <Th w='25%'>DATE</Th>
            <Th w='60%'>TASKS</Th>
            <Th w='15%'>MINUTES</Th>
          </Tr>
        </Thead>
        <Tbody fontWeight='bold'>
          <Tr color='gray.700'>
            <Td color='gray.500'>5-Jan-2022</Td>
            <Td>Hello World</Td>
            <Td pl='2.2em' fontSize='20px'>
              60
            </Td>
          </Tr>
          <Tr color='gray.700'>
            <Td color='gray.500'>5-Jan-2022</Td>
            <Td>Hello World</Td>
            <Td pl='2.2em' fontSize='20px'>
              60
            </Td>
          </Tr>
          <Tr color='gray.700'>
            <Td color='gray.500'>5-Jan-2022</Td>
            <Td>Hello World</Td>
            <Td pl='2.2em' fontSize='20px'>
              60
            </Td>
          </Tr>
          <Tr color='gray.700'>
            <Td color='gray.500'>5-Jan-2022</Td>
            <Td>Hello World</Td>
            <Td pl='2.2em' fontSize='20px'>
              60
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

export default ReportTasks;
