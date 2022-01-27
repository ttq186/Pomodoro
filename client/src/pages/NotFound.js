import {  Box, Center, Text } from '@chakra-ui/react';

import SimpleHeader from '../components/SimpleHeader';

const NotFound = () => {
  document.title = 'Page not found';

  return (
    <Box bg='gray.800' h='100vh'>
      <SimpleHeader />

      <Center color='gray.100' mt={{base: '15%', sm: '5%'}} d='flex' flexDir={{base: 'column', sm: 'row'}} fontWeight='600'>
        <Text fontSize={{base: '80px', md: '150px'}} mr='20px'>404</Text>
        <Text fontSize={{base: '10vw', sm: '35px', md: '50px'}}> Page Not Found</Text>
      </Center>
    </Box>
  );
};

export default NotFound;
