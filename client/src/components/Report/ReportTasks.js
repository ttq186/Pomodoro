import { useSelector, useDispatch } from 'react-redux';
import { Box, Th, Td, Tr, Table, Thead, Tbody, Button } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const ReportTasks = () => {
  const dispath = useDispatch();
  const tasks = useSelector((state) => state.taskList.tasks);
  const finishedTasks = tasks.filter((task) => task.isFinished);

  return (
    <>
      <Table textAlign='center'>
        <Thead>
          <Tr>
            <Th w='5%'>#</Th>
            <Th w='58%'>TASK</Th>
            <Th w='13%' px='0' textAlign='center'>CREATE DATE</Th>
            <Th w='13%' px='0'textAlign='center'>FINISH DATE</Th>
            <Th w='11%' px='0' textAlign='center'>TOTAL TIME</Th>
          </Tr>
        </Thead>
        <Tbody fontWeight='bold'>
          {finishedTasks.map((task, index) => {
            const totalTime = 368;
            return (
              <Tr color='gray.700' key={task.id}>
                <Td color='gray.600' fontWeight='normal'>{index + 1}</Td>
                <Td>{task.title}</Td>
                <Td color='gray.500' fontSize='14px' px='0' textAlign='center'>22-Jan-2022</Td>
                <Td color='gray.500' fontSize='14px' px='0' textAlign='center'>24-Jan-2022</Td>
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
