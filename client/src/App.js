import {
  Box,
  Grid,
  GridItem,
  Center,
  Container,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import Clock from './components/Clock';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Study from './assets/study.svg';
import Report from './components/Report';

const App = () => {
  return (
    <Box bg='gray.800' h='100vh' overflowY='hidden'>
      <Header h='10%' />
      <Grid h='90%' templateColumns='repeat(5, 1fr)'>
        <GridItem colSpan='2'>
          <Center h='100%'>
            <TodoList />
          </Center>
        </GridItem>
        <GridItem colSpan='3'>
          <Center h='10%' mt='1em'>
            <Heading color='gray.200'>
              Keep calm and <Text as='s'>play</Text>{' '}
              <Image src={Study} d='inline' w='55px' mb='-24px' /> hard
            </Heading>
          </Center>
          <Container  mt='40px'>
            <Report />
          </Container>
          <Center color='gray.300' h='60%' mt='-20px'>
            <Clock />
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default App;
