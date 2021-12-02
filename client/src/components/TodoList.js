import { Box, Text, Heading, Image, Flex, Checkbox, Button, Divider } from '@chakra-ui/react';
import Todo from '../assets/todo.svg';
import Setting from '../assets/setting.svg';

const TodoList = () => {
  return (
    <Box bg='gray.700' h='80%' w='70%' py='10px' borderRadius='sm'>
      <Flex
        color='gray.300'
        align='center'
        borderBottom='2px solid #f2f2f2'
        pl='20px'
        mb='20px'
      >
        <Image src={Todo} w='30px' />
        <Heading ml='10px' fontSize='24px'>
          Todo List
        </Heading>
      </Flex>

      <Box bg='gray.500' d='flex' w='95%' mx='auto' my='0.7em' py='10px'>
        <Checkbox
          iconColor='gray.900'
          colorScheme='gray'
          w='95%'
          p='10px'
          borderRadius='sm'
          color='gray.100'
          fontSize='lg'
          fontWeight='600'
        >
          Coding pomodoro app
        </Checkbox>
        <Text color='gray.300' mr='10px' fontWeight='600'>13<Divider />20</Text>
        <Image src={Setting} w='30px' mr='10px' mt='5px' />
      </Box>
      <Box bg='gray.500' d='flex' w='95%' mx='auto' my='0.7em' py='10px'>
        <Checkbox
          iconColor='gray.900'
          colorScheme='gray'
          w='95%'
          p='10px'
          borderRadius='sm'
          color='gray.100'
          fontSize='lg'
          fontWeight='600'
        >
          Coding pomodoro app
        </Checkbox>
        <Text color='gray.300' mr='10px' fontWeight='600'>7<Divider />11</Text>
        <Image src={Setting} w='30px' mr='10px' mt='5px' />
      </Box>
      <Box bg='gray.500' d='flex' w='95%' mx='auto' my='0.7em' py='10px'>
        <Checkbox
          iconColor='gray.900'
          colorScheme='gray'
          w='95%'
          p='10px'
          borderRadius='sm'
          color='gray.100'
          fontSize='lg'
          fontWeight='600'
        >
          Coding pomodoro app
        </Checkbox>
        <Text color='gray.300' mr='10px' fontWeight='600'>4<Divider />12</Text>
        <Image src={Setting} w='30px' mr='10px' mt='5px' />
      </Box>
      <Box bg='gray.500' d='flex' w='95%' mx='auto' my='0.7em' py='10px'>
        <Checkbox
          iconColor='gray.900'
          colorScheme='gray'
          w='95%'
          p='10px'
          borderRadius='sm'
          color='gray.100'
          fontSize='lg'
          fontWeight='600'
        >
          Coding pomodoro app
        </Checkbox>
        <Text color='gray.300' mr='10px' fontWeight='600'>21<Divider />30</Text>
        <Image src={Setting} w='30px' mr='10px' mt='5px' />
      </Box>
      <Box bg='gray.500' d='flex' w='95%' mx='auto' my='0.7em' py='10px'>
        <Checkbox
          iconColor='gray.900'
          colorScheme='gray'
          w='95%'
          p='10px'
          borderRadius='sm'
          color='gray.100'
          fontSize='lg'
          fontWeight='600'
        >
          Coding pomodoro app
        </Checkbox>
        <Text color='gray.300' mr='10px' fontWeight='600'>20<Divider />40</Text>
        <Image src={Setting} w='30px' mr='10px' mt='5px' />
      </Box>

      <Button
        variant='customize'
        bg='gray.800'
        color='gray.300'
        fontSize='22px'
        w='95%'
        mx='2.5%'
        py='20px'
        my='30px'
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

export default TodoList;
