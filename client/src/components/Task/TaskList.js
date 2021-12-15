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
import Todo from '../../assets/icons/todo.svg';
import TaskItem from '../../components/Task/TaskItem';
import TaskForm from './TaskForm';
import { TASKLIST_ADD_TASK_TOGGLE } from '../../constants/taskListConstants';

const TaskList = () => {
  const dispatch = useDispatch();
  const taskListState = useSelector((state) => state.taskList);
  const modifiedTask = taskListState.modifiedTask;

  const handleAddTask = () => {
    dispatch({ type: TASKLIST_ADD_TASK_TOGGLE });
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
        <ScaleFade initialScale={0.9} in={true}>
          <TaskForm />
        </ScaleFade>
      ) : modifiedTask ? (
        <ScaleFade initialScale={0.9} in={true}>
          <TaskForm
            id={modifiedTask.id}
            title={modifiedTask.title}
            target={modifiedTask.target}
            progress={modifiedTask.progress}
            notes={modifiedTask.notes}
          />
        </ScaleFade>
      ) : (
        <SlideFade offsetY='-20px' in={true}>
          <Box
            overflowY='auto'
            mx='3px'
            h='400px'
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
              <TaskItem
                key={item.id}
                id={item.id}
                title={item.title}
                notes={item.notes}
                progress={item.progress}
                target={item.target}
                isDisabled={item.isDisabled}
              />
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
          py='20px'
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
