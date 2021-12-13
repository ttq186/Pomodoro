import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, Image, Flex, Button } from '@chakra-ui/react';
import Todo from '../../assets/todo.svg';
import TaskItem from '../../components/Task/TaskItem';
import NewTaskForm from './NewTaskForm';
import { TASKLIST_ADD_TASK } from '../../constants/taskListConstants';

const TaskList = () => {
  const dispatch = useDispatch();
  const taskListState = useSelector((state) => state.taskList);

  const handleAddTask = () => {
    dispatch({ type: TASKLIST_ADD_TASK });
  };

  return (
    <Box bg='gray.700' maxH='560px' w='lg' py='1em' borderRadius='sm'>
      <Flex
        color='gray.300'
        align='center'
        borderBottom='2px solid #f2f2f2'
        pl='20px'
        mb='20px'
      >
        <Image src={Todo} w={{ base: '20px', md: '25px' }} />
        <Heading ml='10px' fontSize={{ base: '20px', md: '24px' }}>
          Task List
        </Heading>
      </Flex>

      {taskListState.isAddTask ? (
        <NewTaskForm handleAddTask={handleAddTask} />
      ) : (
        <Box
          overflowY='auto'
          mx='3px'
          h={{ base: '300px', md: '400px' }}
          sx={{
            '&::-webkit-scrollbar': {
              width: '7px',
              background: 'gray.600',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.800',
              borderRadius: '2px',
              marginEnd: '10px',
            },
          }}
        >
          <TaskItem progress={13} target={20} />
          <TaskItem progress={5} target={7} />
          <TaskItem progress={2} target={3} />
          <TaskItem progress={8} target={10} />
          <TaskItem progress={10} target={13} />
          <TaskItem progress={13} target={14} />
          <TaskItem progress={8} target={15} />
        </Box>
      )}

      {!taskListState.isAddTask  && (
        <Button
          variant='customize'
          bg='gray.800'
          color='gray.300'
          fontSize='22px'
          w='95%'
          mx='2.5%'
          py='20px'
          mt='25px'
          mb='5px'
          borderRadius='sm'
          opacity='0.8'
          _hover={{
            bg: 'gray.100',
            color: '#171923',
          }}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};

export default TaskList;
