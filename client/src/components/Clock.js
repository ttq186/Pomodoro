import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Center, Button } from '@chakra-ui/react';
import ModalDialog from './ModalDialog';
import { CLOCK_TOGGLE_START } from '../constants/clockConstants';
import ClockMod from './ClockMode';

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

  const handleStartClick = () => {
    dispatch({
      type: CLOCK_TOGGLE_START,
      payload: !clockState.isStart,
    });
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
        <ClockMod isActive={mode.isShortBreak} content='Short Break' ref={shortBreakRef} />
        <ClockMod isActive={mode.isLongBreak} content='Long Break' ref={longBreakRef} />
      </Flex>
      <Center fontSize={{ base: '70px', md: '110px' }}>31:07</Center>

      <Button
        variant='customize'
        fontSize={{ sm: '20px', md: '25px' }}
        textTransform='uppercase'
        w='50%'
        py={{ base: '15px', md: '23px' }}
        mt={{ base: '17px', md: '15px' }}
        borderRadius='sm'
        borderWidth='2px'
        borderBottom='9px solid #CBD5E0'
        mx='25%'
        _hover={{
          bg: 'gray.100',
          color: '#171923',
        }}
        _active={{
          borderBottom: '2px solid #fefefe',
          mt: '22px',
        }}
        onClick={handleStartClick}
      >
        {clockState.isStart ? 'STOP' : 'START'}
      </Button>
    </Box>
  );
};

export default Clock;
