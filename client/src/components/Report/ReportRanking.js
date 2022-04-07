import { useSelector } from 'react-redux';
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
  const userList = useSelector((state) => state.user.userList);
  const userListAfterSort = userList.sort(
    (user1, user2) => user2.summary.totalTime - user1.summary.totalTime
  );

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
            <Th w='15%' px='0' textAlign='center'>TOTAL TIME</Th>
          </Tr>
        </Thead>
        <Tbody color='gray.600'>
          {userListAfterSort?.map((user, index) => (
            <Tr color='gray.600' key={user.id}>
              <Td>{index + 1}</Td>
              <Td fontWeight='bold'>
                {user.username ? user.username : user.email.split('@')[0]}
              </Td>
              <Td fontWeight='bold' fontSize='20px'>
                {(user.summary.totalTime / 3600).toFixed(1) !== '0.0'
                  ? `${(user.summary.totalTime / 3600).toFixed(1)}h`
                  : '0h'}
              </Td>
            </Tr>
          ))}
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
