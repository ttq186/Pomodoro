import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Th, Td, Tr, Table, Thead, Tbody, Button } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

import { formatServerDatetime } from '../../utils';

const ReportTasks = () => {
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
      <Table textAlign='center'>
        <Thead>
          <Tr>
            <Th w='5%'>#</Th>
            <Th w='57%' pl='0'>
              TASK
            </Th>
            <Th w='13%' px='0' textAlign='center'>
              CREATE
            </Th>
            <Th w='14%' px='0' textAlign='center'>
              FINISH
            </Th>
            <Th w='11%' px='0' textAlign='center'>
              TOTAL
            </Th>
          </Tr>
        </Thead>
        <Tbody fontWeight='bold'>
          {finishedTasksByPage.map((task, index) => {
            const totalTime = 368;
            return (
              <Tr color='gray.600' key={task.id}>
                <Td color='gray.600' fontWeight='normal'>
                  {index + 1 + (page - 1) * PAGE_SIZE}
                </Td>
                <Td pl='0' color='gray.700'>
                  {task.title}
                </Td>
                <Td color='gray.500' fontSize='14px' px='0' textAlign='center'>
                  {formatServerDatetime(task.createdAt)}
                </Td>
                <Td color='gray.500' fontSize='14px' px='0' textAlign='center'>
                  {formatServerDatetime(task.finishedAt)}
                </Td>
                <Td fontSize='20px' textAlign='center' px='0.2em'>
                  {(totalTime / 60).toFixed(1) !== '0.0'
                    ? `${(totalTime / 60).toFixed(1)}h`
                    : '0h'}
                </Td>
              </Tr>
            );
          })}
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

export default ReportTasks;
