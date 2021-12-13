import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Center, Button } from '@chakra-ui/react';
import ModalDialog from './ModalDialog';
import {
  CLOCK_TOGGLE_START,
  CLOCK_UPDATE_TIME_LEFT,
} from '../constants/clockConstants';
import ClockMod from './ClockMode';
import { secondsToTime } from '../utils';
import store from '../store';

const Clock = () => {
  const dispatch = useDispatch();
  const clockState = useSelector((state) => state.clock);

  const startSessionRef = useRef(null);
  const shortBreakRef = useRef(null);
  const longBreakRef = useRef(null);

  const mode = {
    isStartSession: clockState.mode === 'START_SESSION' ? true : false,
    isShortBreak: clockState.mode === 'SHORT_BREAK' ? true : false,
    isLongBreak: clockState.mode === 'LONG_BREAK' ? true : false,
  };

  const startCountdown = async (time) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    dispatch({ type: CLOCK_TOGGLE_START });

    if (time > 0) await delay(500);

    while (time > 0) {
      if (!store.getState().clock.isStart) return;

      time--;
      dispatch({
        type: CLOCK_UPDATE_TIME_LEFT,
        payload: time,
      });
      await delay(1000);
    }

    dispatch({ type: CLOCK_TOGGLE_START });
  };

  const stopCountdown = () => {
    dispatch({ type: CLOCK_TOGGLE_START });
  };

  const handleToggleState = async () => {
    if (!store.getState().clock.isStart) {
      const time = parseInt(clockState.timeLeft, 10);
      await startCountdown(time);
      return;
    }

    stopCountdown();
  };

  return (
    <Box
      h={{ base: '240px', md: '350px' }}
      w='lg'
      bg='gray.700'
      borderRadius='md'
      pos='relative'
    >
      <ModalDialog />
      <Flex
        w={{ base: '95%', md: '90%' }}
        mx='auto'
        justify='space-around'
        align='center'
        mt={{ base: '20px', md: '30px' }}
        mb='10px'
        fontWeight='500'
        fontSize={{ base: '11px', md: '16px' }}
      >
        <ClockMod
          isActive={mode.isStartSession}
          content='Start Session'
          ref={startSessionRef}
        />
        <ClockMod
          isActive={mode.isShortBreak}
          content='Short Break'
          ref={shortBreakRef}
        />
        <ClockMod
          isActive={mode.isLongBreak}
          content='Long Break'
          ref={longBreakRef}
        />
      </Flex>
      <Center fontSize={{ base: '90px', md: '130px' }} my='-15px'>
        {secondsToTime(clockState.timeLeft)}
      </Center>

      <Button
        variant='customize'
        fontSize={{ base: '19px', md: '25px' }}
        textTransform='uppercase'
        w='44%'
        py={{ base: '15px', md: '23px' }}
        mt={{ base: '17px', md: '15px' }}
        borderRadius='sm'
        borderWidth='2px'
        borderBottom='9px solid #CBD5E0'
        bg='gray.100'
        color='#171923'
        mx='28%'
        _active={{
          borderBottom: '2px solid #fefefe',
          mt: '22px',
        }}
        onClick={handleToggleState}
      >
        {clockState.isStart ? 'STOP' : 'START'}
      </Button>
    </Box>
  );
};

export default Clock;
