import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Heading,
  Image,
  Flex,
  Button,
  ScaleFade,
  SlideFade,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Todo from '../../assets/icons/todo.svg';
import TaskItem from '../../components/Task/TaskItem';
import TaskForm from './TaskForm';
import { toggleAddTask } from '../../actions/taskListActions';

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignedIn = useSelector((state) => state.user.tokenData);
  const taskListState = useSelector((state) => state.taskList);
  const modifiedTask = taskListState.modifiedTask;

  const handleAddTask = () => {
    if (!isSignedIn) {
      alert('Oops, you need to sign in to use this feature!');
      navigate('/signin');
      return;
    }
    dispatch(toggleAddTask());
  };

  return (
    <Box bg='gray.700' w='xl' py='0.8em' borderRadius='sm'>
      <Flex
        color='gray.300'
        align='center'
        borderBottom='2px solid #f2f2f2'
        pl='20px'
        mb='20px'
        pb='5px'
      >
        <Image src={Todo} w={{ base: '20px', md: '25px' }} />
        <Heading ml='10px' fontSize={{ base: '20px', md: '27px' }}>
          Task List
        </Heading>
      </Flex>

      {taskListState.isAddTask ? (
        <ScaleFade initialScale={0.9} in={true}>
          <TaskForm />
        </ScaleFade>
      ) : modifiedTask ? (
        <ScaleFade initialScale={0.9} in={true}>
          <TaskForm {...modifiedTask} />
        </ScaleFade>
      ) : (
        <SlideFade offsetY='-20px' in={true}>
          <Box
            overflowY='auto'
            mx='3px'
            h={{ base: '300px', md: '440px' }}
            sx={{
              '&::-webkit-scrollbar': {
                width: '7px',
                background: 'gray.600',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#222730',
                borderRadius: '2px',
                marginEnd: '10px',
              },
            }}
          >
            {taskListState.tasks.map((item) => (
              <TaskItem key={item.id} {...item} />
            ))}
          </Box>
        </SlideFade>
      )}

      {!taskListState.isAddTask && !modifiedTask && (
        <Button
          variant='customize'
          bg='gray.800'
          color='gray.300'
          fontSize='22px'
          w='95%'
          mx='2.5%'
          py='22px'
          mt='25px'
          mb='5px'
          borderRadius='sm'
          opacity='0.8'
          _hover={{
            bg: 'gray.100',
            color: '#171923',
          }}
          isDisabled={taskListState.hasChoseTask}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};

export default TaskList;
