import { Box, Checkbox, Image, Divider, Flex } from '@chakra-ui/react';
import Setting from '../../assets/setting.svg';

const TaskItem = ({ progress, target }) => {
  return (
    <Box
      bg='gray.500'
      w='95%'
      mx='auto'
      mb={{ base: '8px', md: '11px' }}
      py={{ base: '5px', md: '10px' }}
    >
      <Flex d='flex' mb='2px'>
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
        <Box
          color='gray.300'
          mr='10px'
          fontWeight='600'
          my='auto'
          textAlign='right'
        >
          {progress}
          <Divider />
          {target}
        </Box>
        <Image src={Setting} w='25px' mr='5px' mt='5px' cursor='pointer' />
      </Flex>

      <Box
        bg='gray.600'
        py='5px'
        pl='10px'
        mx='5%'
        borderRadius='sm'
        fontSize='14px'
        color='gray.400'
      >
        Hoan thanh project nay trong 2 tuan nua
      </Box>
    </Box>
  );
};

export default TaskItem;
