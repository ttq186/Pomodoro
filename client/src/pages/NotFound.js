import {  Box, Center, Text } from '@chakra-ui/react';

import SimpleHeader from '../components/SimpleHeader';

const NotFound = () => {
  document.title = 'Page not found';

  return (
    <Box bg='gray.800' h='100vh'>
      <SimpleHeader />

      <Center color='gray.100' mt='5%' d='flex'  fontWeight='600'>
        <Text fontSize='150px' mr='20px'>404</Text>
        <Text fontSize='50px'> Page Not Found</Text>
      </Center>
    </Box>
  );
};

export default NotFound;
