import { Box, Center, Heading, Text, Image, Flex } from '@chakra-ui/react';
import Clock from './components/Clock';
import TaskList from './components/Task/TaskList';
import Header from './components/Header';
import Study from './assets/study.svg';
import Summary from './components/Summary';

const App = () => {
  return (
    <Box
      bg='gray.800'
      h={{ base: 'auto', lg: '100vh' }}
      pb={{ base: '100px', md: '100px', lg: '0px' }}
      overflowY='auto'
    >
      <Header h='10%' />

      <Flex
        justifyContent='space-between'
        px={{ base: '2%', md: '1%', xl: '5%' }}
        mt='2em'
        mx='auto'
        flexDir={{ base: 'column-reverse', lg: 'row' }}
        alignItems='center'
      >
        <Center h='100%' w={{ base: '95%', md: '60%', lg: '35%', xl: '30%' }}>
          <TaskList />
        </Center>

        <Box w={{ base: '95%', md: '60%', lg: '55%' }}>
          <Center h='10%' my='1em'>
            <Heading
              color='gray.200'
              textAlign='center'
              fontSize={{ base: '20px', md: '32px', lg: '37px' }}
            >
              Keep calm and <Text as='s'>play</Text>{' '}
              <Image
                src={Study}
                d='inline'
                w={{ base: '40px', md: '55px' }}
                mb={{ base: '-18px', md: '-24px' }}
              />{' '}
              hard
            </Heading>
          </Center>

          <Center color='gray.300'>
            <Clock />
          </Center>

          <Center>
            <Summary />
          </Center>
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
