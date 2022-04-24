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
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

import { getUsersByPage } from '../../actions/userActions';
import PaginationButton from '../PaginationButton';

const ReportRanking = () => {
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'sm' });
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text
        fontSize={{ base: '16px', md: 'xl' }}
        fontWeight='bold'
        textAlign='center'
        color='gray.700'
        my={{ base: '0.35em', xl: '0.5em' }}
      >
        Focus time this week
      </Text>
      <Table textAlign='center' size={tableSize}>
        <Thead>
          <Tr>
            <Th textAlign='center' fontSize={{ base: '10px', md: '14px' }}>
              #
            </Th>
            <Th w='75%' fontSize={{ base: '10px', md: '12px' }}>
              USER
            </Th>
            <Th
              w='20%'
              px='0'
              textAlign='center'
              fontSize={{ base: '10px', md: '12px' }}
            >
              TOTAL
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userListByPageAfterSort?.map((user, index) => (
            <Tr color='gray.700' key={user.id}>
              <Td color='gray.600' px='0' textAlign='center'>
                {index + 1 + (page - 1) * PAGE_SIZE}
              </Td>
              <Td
                fontWeight='bold'
                fontSize={{ base: '13px', md: '16px' }}
                textTransform='capitalize'
              >
                {user.username ? user.username : user.email.split('@')[0]}
              </Td>
              <Td
                fontWeight='bold'
                fontSize={{ base: '16px', md: '20px' }}
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

      <Box
        d='flex'
        justifyContent='center'
        alignItems='center'
        my={{ base: '0.5em', md: '1em' }}
      >
        <PaginationButton
          icon={<ArrowBackIcon />}
          size={buttonSize}
          onClickHandler={handleSwitchPrevPage}
        />
        <Box
          px='20px'
          fontSize={{ base: '20px', md: '23px' }}
          fontWeight='bold'
          color='gray.600'
        >
          {page}
        </Box>
        <PaginationButton
          icon={<ArrowForwardIcon />}
          size={buttonSize}
          onClickHandler={handleSwitchNextPage}
        />
      </Box>
    </>
  );
};

export default ReportRanking;
