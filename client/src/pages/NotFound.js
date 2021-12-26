import { Flex, Image, Box, Center, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Pomodoro from '../assets/icons/pomodoro.svg';

const NotFound = () => {
  document.title = 'Page not found';

  return (
    <Box bg='gray.800' h='100vh'>
      <Flex
        h='10vh'
        alignItems='center'
        fontWeight='600'
        color='gray.400'
        fontSize={{ base: '18px', md: '20px' }}
        mx={{ base: '10px', md: '30px' }}
        pt='0.5em'
      >
        <Image
          src={Pomodoro}
          mb='-1px'
          w={{ base: '40px', md: '50px' }}
          h={{ base: '40px', md: '50px' }}
        ></Image>
        <Link to='/'>Pomodoro</Link>
      </Flex>

      <Center color='gray.100' mt='5%' d='flex'  fontWeight='600'>
        <Text fontSize='150px' mr='20px'>404</Text>
        <Text fontSize='50px'> Page Not Found</Text>
      </Center>
    </Box>
  );
};

export default NotFound;
