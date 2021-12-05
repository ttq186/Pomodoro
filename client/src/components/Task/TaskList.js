import { Box, Heading, Image, Flex, Button } from '@chakra-ui/react';
import Todo from '../../assets/todo.svg';
import TaskItem from '../../components/Task/TaskItem';

const TaskList = () => {
  return (
    <Box
      bg='gray.700'
      maxH='560px'
      w='lg'
      pt='10px'
      borderRadius='sm'
    >
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

      <Box
        overflowY='auto'
        mr='3px'
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

      <Button
        variant='customize'
        bg='gray.800'
        color='gray.300'
        fontSize='22px'
        w='95%'
        mx='2.5%'
        py='20px'
        my='25px'
        borderRadius='sm'
        opacity='0.8'
        _hover={{
          bg: 'gray.100',
          color: '#171923',
        }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskList;
