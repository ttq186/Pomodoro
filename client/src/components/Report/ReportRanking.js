import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { getUsersByPage } from '../../actions/userActions';

const ReportRanking = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const userListByPage = useSelector((state) => state.user.userListByPage);
  const userListByPageAfterSort = userListByPage.sort(
    (user1, user2) => user2.totalTimeThisWeek - user1.totalTimeThisWeek
  );

  const handleSwitchPrevPage = () => {
    if (page === 1) return;
    dispatch(getUsersByPage(page - 1, PAGE_SIZE));
    setPage(page - 1);
  };

  const handleSwitchNextPage = () => {
    if (userListByPage.length < PAGE_SIZE || userListByPage.length === 0)
      return;
    dispatch(getUsersByPage(page + 1, PAGE_SIZE));
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(getUsersByPage(page, PAGE_SIZE));
  }, []);

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
            <Th w='15%' px='0' textAlign='center'>
              TOTAL TIME
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userListByPageAfterSort?.map((user, index) => (
            <Tr color='gray.700' key={user.id}>
              <Td color='gray.600' px='0' textAlign='center'>
                {index + 1 + (page - 1) * PAGE_SIZE}
              </Td>
              <Td fontWeight='bold'>
                {user.username ? user.username : user.email.split('@')[0]}
              </Td>
              <Td
                fontWeight='bold'
                fontSize='20px'
                color='gray.600'
                px='0'
                textAlign='center'
              >
                {(user.totalTimeThisWeek / 3600).toFixed(1) !== '0.0'
                  ? `${(user.totalTimeThisWeek / 3600).toFixed(1)}h`
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
          onClick={handleSwitchPrevPage}
        />
        <Box px='20px' fontSize='23px' fontWeight='bold' color='gray.600'>
          {page}
        </Box>
        <Button
          rightIcon={<ArrowForwardIcon />}
          pl='10px'
          h='2em'
          variant='outline'
          onClick={handleSwitchNextPage}
        />
      </Box>
    </>
  );
};

export default ReportRanking;
