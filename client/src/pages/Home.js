import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import Clock from '../components/Clock/Clock';
import TaskList from '../components/Task/TaskList';
import Header from '../components/Header';
import Study from '../assets/icons/study.svg';
import Summary from '../components/Summary';
import { useEffect } from 'react';
import {
  getTasks,
  toggleHasJustFinishedTask,
} from '../actions/taskListActions';
import { getSummary, getTimerSetting } from '../actions/clockActions';
import { getUserInfo } from '../actions/userActions';

const Home = () => {
  const dispatch = useDispatch();
  const hasJustFinishedTask = useSelector(
    (state) => state.taskList.hasJustFinishedTask
  );
  const loading = useSelector((state) => state.user.loading);
  const tokenData = useSelector((state) => state.user.tokenData);

  const handleCloseButtonClick = () => {
    dispatch(toggleHasJustFinishedTask());
  };

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getTasks());
    dispatch(getTimerSetting());
    dispatch(getSummary());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData]);

  document.title = 'Pomodoro Timer';

  return (
    <Box
      bg='gray.800'
      h={{ base: 'auto', lg: '100vh' }}
      pb={{ base: '100px', md: '100px', lg: '0px' }}
      overflowY='auto'
    >
      <Header />

      {loading ? (
        <Spinner size='xl' color='gray.200' speed='1.5s' mt='20%' ml='48%' />
      ) : (
        <Flex
          justifyContent='space-between'
          px={{ base: '2%', md: '1%', xl: '8%' }}
          mt={{base: '3em', md: '2em'}}
          mx='auto'
          flexDir={{ base: 'column-reverse', lg: 'row' }}
          alignItems='center'
        >
          <Center
            h='100%'
            w={{ base: '95%', lg: '40%' }}
            maxW={{ base: '420px', sm: '420px', md: '480px', lg: '450px' }}
            maxH='580px'
            mt={{ base: '1em', lg: '0' }}
          >
            <TaskList />
          </Center>

          <Box
            w={{ base: '95%', lg: '55%' }}
            maxW={{ base: '420px', sm: '420px', md: '480px', lg: '560px' }}
          >
            <Center h='10%' my='1em'>
              <Alert
                status='success'
                variant='left-accent'
                borderRadius='sm'
                mt='0em'
                py='1.5em'
                d={hasJustFinishedTask ? 'flex' : 'none'}
              >
                <AlertIcon />
                <Box flex='1'>
                  <AlertTitle fontSize='20px'>Congratulations!</AlertTitle>
                  <AlertDescription display='block' color='gray.700'>
                    You've just accomplished this task. Keep it up!
                  </AlertDescription>
                </Box>
                <CloseButton
                  position='absolute'
                  right='8px'
                  top='8px'
                  color='gray.700'
                  onClick={handleCloseButtonClick}
                />
              </Alert>

              <Heading
                color='gray.200'
                textAlign='center'
                fontSize={{
                  base: '6.5vw',
                  sm: '30px',
                  md: '34px',
                  lg: '39px',
                  xl: '41px',
                }}
                d={!hasJustFinishedTask ? 'block' : 'none'}
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
      )}
    </Box>
  );
};

export default Home;
