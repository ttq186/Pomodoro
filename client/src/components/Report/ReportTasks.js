import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Th,
  Td,
  Tr,
  Table,
  Thead,
  Tbody,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

import { formatServerDatetime } from '../../utils/timeUtils';
import PaginationButton from '../../components/PaginationButton';

const ReportTasks = () => {
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'sm' });
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [page, setPage] = useState(1);
  const tasks = useSelector((state) => state.taskList.tasks);
  const finishedTasks = tasks.filter((task) => task.isFinished);
  const PAGE_SIZE = 8;
  const MAX_PAGE =
    finishedTasks.length !== 0
      ? Math.ceil(finishedTasks.length / PAGE_SIZE)
      : 1;
  const finishedTasksByPage = finishedTasks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleSwitchPrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleSwitchNextPage = () => {
    if (page === MAX_PAGE) return;
    setPage(page + 1);
  };

  return (
    <>
      <Table textAlign='center' size={tableSize}>
        <Thead>
          <Tr>
            <Th textAlign='center' fontSize={{ base: '10px', md: '14px' }}>
              #
            </Th>
            <Th w='57%' pl='0' fontSize={{ base: '9px', md: '12px' }}>
              TASK
            </Th>
            <Th
              w='13%'
              px='0'
              textAlign='center'
              fontSize={{ base: '9px', md: '12px' }}
            >
              CREATE
            </Th>
            <Th
              w='14%'
              px='0.2em'
              textAlign='center'
              fontSize={{ base: '9px', md: '12px' }}
            >
              FINISH
            </Th>
            <Th
              w='11%'
              px='0'
              textAlign='center'
              fontSize={{ base: '9px', md: '12px' }}
            >
              TOTAL
            </Th>
          </Tr>
        </Thead>
        <Tbody fontWeight='bold'>
          {finishedTasksByPage.map((task, index) => {
            return (
              <Tr color='gray.600' key={task.id}>
                <Td
                  color='gray.600'
                  fontWeight='normal'
                  textAlign='center'
                  px='0'
                >
                  {index + 1 + (page - 1) * PAGE_SIZE}
                </Td>
                <Td
                  pl='0'
                  color='gray.700'
                  fontSize={{
                    base: '13px',
                    md: '15px',
                    lg: '17px',
                    xl: '18px',
                  }}
                >
                  {task.title}
                </Td>
                <Td
                  color='gray.500'
                  fontSize={{ base: '10px', md: '13px', lg: '14px' }}
                  px='2px'
                  textAlign='center'
                  py={{ base: '0.7em', md: '1.2em' }}
                >
                  {formatServerDatetime(task.createdAt)}
                </Td>
                <Td
                  color='gray.500'
                  fontSize={{ base: '10px', md: '13px', lg: '14px' }}
                  px='2px'
                  textAlign='center'
                  py={{ base: '0.7em', md: '1.2em' }}
                >
                  {formatServerDatetime(task.finishedAt)}
                </Td>
                <Td
                  fontSize={{ base: '15px', lg: '20px' }}
                  textAlign='center'
                  px='0.2em'
                >
                  {(task.totalTime / 3600).toFixed(1) !== '0.0'
                    ? `${(task.totalTime / 3600).toFixed(1)}h`
                    : '0h'}
                </Td>
              </Tr>
            );
          })}
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

export default ReportTasks;
