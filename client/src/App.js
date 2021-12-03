import {
  Box,
  Grid,
  GridItem,
  Center,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import Clock from './components/Clock';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Study from './assets/study.svg';
import Summary from './components/Summary';
import ModalDialog from './components/ModalDialog';

const App = () => {
  return (
    <Box bg='gray.800' h='100vh' >
      <Header h='10%' />
      <Grid h='90%' templateColumns='repeat(5, 1fr)'>
        <GridItem colSpan='2'>
          <Center h='100%'>
            <TaskList />
          </Center>
        </GridItem>
        <GridItem colSpan='3'>
          <Center h='10%' mt='1em'>
            <Heading color='gray.200'>
              Keep calm and <Text as='s'>play</Text>{' '}
              <Image src={Study} d='inline' w='55px' mb='-24px' /> hard
            </Heading>
          </Center>
          <Center color='gray.300' h='60%'>
            <Clock />
          </Center>
          <Center h='10%'>
            <Summary />
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default App;
