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

import { TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK } from '../constants/taskListConstants';
import Clock from '../components/Clock/Clock';
import TaskList from '../components/Task/TaskList';
import Header from '../components/Header';
import Study from '../assets/icons/study.svg';
import Summary from '../components/Summary';
import { useEffect } from 'react';
import { getTasksFromServer } from '../actions/taskListActions';
import {
  getSummaryFromServer,
  getTimerSettingFromServer,
} from '../actions/clockActions';
import { getUserInfoFromServer } from '../actions/userActions';

const Home = () => {
  const dispatch = useDispatch();
  const hasJustFinishedTask = useSelector(
    (state) => state.taskList.hasJustFinishedTask
  );
  const loading = useSelector((state) => state.user.loading);
  const tokenData = useSelector((state) => state.user.tokenData);

  const handleCloseButtonClick = () => {
    dispatch({ type: TASKLIST_TOGGLE_HAS_JUST_FINISHED_TASK });
  };

  useEffect(() => {
    dispatch(getUserInfoFromServer());
    dispatch(getTasksFromServer());
    dispatch(getTimerSettingFromServer());
    dispatch(getSummaryFromServer());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData]);

  return (
    <Box
      bg='gray.800'
      h={{ base: 'auto', lg: '100vh' }}
      pb={{ base: '100px', md: '100px', lg: '0px' }}
      overflowY='auto'
    >
      <Header h='10%' />

      {loading ? (
        <Spinner size='xl' color='gray.200' speed='1.5s' mt='20%' ml='48%' />
      ) : (
        <Flex
          justifyContent='space-between'
          px={{ base: '2%', md: '1%', xl: '8%' }}
          mt='2em'
          mx='auto'
          flexDir={{ base: 'column-reverse', lg: 'row' }}
          alignItems='center'
        >
          <Center
            h='100%'
            w={{ base: '95%', sm: '80%', md: '60%', lg: '35%' }}
            maxW={{ lg: '400px' }}
          >
            <TaskList />
          </Center>

          <Box w={{ base: '95%', sm: '80%', md: '60%', lg: '55%' }}>
            <Center h='10%' my='1em'>
              <Alert
                status='success'
                variant='left-accent'
                borderRadius='sm'
                mt='-1em'
                w='lg'
                d={hasJustFinishedTask ? 'flex' : 'none'}
              >
                <AlertIcon />
                <Box flex='1'>
                  <AlertTitle>Congratulations!</AlertTitle>
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
                  base: '20px',
                  sm: '34px',
                  md: '32px',
                  lg: '37px',
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
