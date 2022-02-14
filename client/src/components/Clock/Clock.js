import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Center, Button } from '@chakra-ui/react';
import useSound from 'use-sound';

import {
  toggleClockStart,
  updateTimeLeft,
  updateSummary,
  switchClockMode,
  updateTotalFinishedTask,
} from '../../actions/clockActions';
import {
  toggleHasJustFinishedTask,
  unChooseTask,
  updateTaskFinish,
  updateTaskProgress,
} from '../../actions/taskListActions';
import ClockModal from '../../components/Clock/ClockModal';
import ClockMode from '../../components/Clock/ClockMode';
import { secondsToTime } from '../../utils';
import store from '../../store';
import drumKick from '../../assets/sounds/drum-kick.mp3';
import alarm from '../../assets/sounds/alarm-sound.mp3';
import ticking from '../../assets/sounds/ticking-sound.mp3';
import { useNavigate } from 'react-router-dom';

const Clock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignedIn = useSelector((state) => state.user.tokenData);
  const clockState = useSelector((state) => state.clock);
  const choseTask = useSelector((state) => state.taskList.choseTask);
  const timerSetting = clockState.timerSetting;
  const { sessionTime, shortBreakTime, longBreakTime, longBreakInterval } =
    timerSetting;
  const clockMode = clockState.mode;

  const startSessionRef = useRef(null);
  const shortBreakRef = useRef(null);
  const longBreakRef = useRef(null);

  const mode = {
    isStartSession: clockMode === 'START_SESSION' ? true : false,
    isShortBreak: clockMode === 'SHORT_BREAK' ? true : false,
    isLongBreak: clockMode === 'LONG_BREAK' ? true : false,
  };

  const [playSound] = useSound(drumKick);
  const [playAlarmSound] = useSound(alarm, {
    sprite: {
      bell: [0, 2000],
      digital: [2600, 2000],
      doorbell: [4300, 2000],
      kitchen: [10000, 2000],
    },
    interrupt: true,
  });
  const [playTickingSound, { stop }] = useSound(ticking, {
    sprite: {
      fast: [0, 1000],
      slow: [5000, 1100],
    },
    interrupt: true,
  });

  const [playTickingNoneSound] = useSound(ticking, {
    sprite: { none: [0, 200] },
    interrupt: true,
    volume: 0.01,
  });

  useEffect(() => {
    const time =
      clockMode === 'START_SESSION'
        ? sessionTime
        : clockMode === 'SHORT_BREAK'
        ? shortBreakTime
        : longBreakTime;

    dispatch(updateTimeLeft(time));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionTime, shortBreakTime, longBreakTime]);

  const startCountdown = async (time) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    dispatch(toggleClockStart());
    if (time > 0) await delay(500);

    while (time > 0) {
      let tickingSoundValue = timerSetting.tickingSound.toLowerCase();
      if (tickingSoundValue === 'none')
        playTickingNoneSound({ id: tickingSoundValue });
      else 
        playTickingSound({ id: tickingSoundValue });

      if (time === 1) {
        if (clockMode === 'START_SESSION') {
          const newTotalTime = clockState.summary.totalTime + sessionTime;
          const newTotalSessions = clockState.summary.totalSessions + 1;
          dispatch(updateSummary(newTotalTime, newTotalSessions));
        }
      }

      if (!store.getState().clock.isStart) return;

      time--;
      document.title = `${secondsToTime(time)} - Time to focus`;
      dispatch(updateTimeLeft(time));
      await delay(1000);
    }

    handleFinishCountdown();
  };

  const handleFinishCountdown = () => {
    stop();
    let alarmSoundValue = timerSetting.alarmSound
      .toLowerCase()
      .split(' ')
      .join('');
    playAlarmSound({ id: alarmSoundValue });

    dispatch(toggleClockStart());
    if (choseTask) {
      let { id, target, progress } = choseTask;
      dispatch(updateTaskProgress(id, progress));

      if (target === progress + 1) {
        dispatch(unChooseTask());
        dispatch(toggleHasJustFinishedTask());
        dispatch(updateTaskFinish(id));
        dispatch(updateTotalFinishedTask());
      }
    }

    if (clockMode === 'SHORT_BREAK' || clockMode === 'LONG_BREAK') {
      dispatch(switchClockMode({ mode: 'START_SESSION', time: sessionTime }));
      document.title = `${secondsToTime(sessionTime)} - Time to focus`;
      return;
    }

    if (store.getState().clock.totalSubSessions % longBreakInterval !== 0) {
      dispatch(switchClockMode({ mode: 'SHORT_BREAK', time: shortBreakTime }));
      document.title = `${secondsToTime(shortBreakTime)} - Time to break`;
    } else {
      dispatch(switchClockMode({ mode: 'LONG_BREAK', time: longBreakTime }));
      document.title = `${secondsToTime(longBreakTime)} - Time to break`;
    }
  };

  const stopCountdown = () => {
    stop(); // stop current ticking sound
    dispatch(toggleClockStart());
  };

  const handleToggleStart = async () => {
    if (!isSignedIn) {
      alert('Oops, you need to sign in to use this feature!');
      navigate('/signin');
      return;
    }

    playSound();
    if (!store.getState().clock.isStart) {
      await startCountdown(clockState.timeLeft);
      return;
    }

    stopCountdown();
  };

  return (
    <Box
      h={{ base: '240px', sm: '280px', md: '330px', lg: '390px' }}
      w='xl'
      bg='gray.700'
      borderRadius='md'
      pos='relative'
    >
      <ClockModal />

      <Flex
        w={{ base: '85%', md: '90%' }}
        mx='auto'
        justify='space-around'
        align='center'
        mt={{ base: '20px', md: '30px' }}
        mb='10px'
        fontWeight='500'
        fontSize={{ base: '11px', md: '16px', lg: '18px' }}
      >
        <ClockMode
          isActive={mode.isStartSession}
          content='Start Session'
          ref={startSessionRef}
        />
        <ClockMode
          isActive={mode.isShortBreak}
          content='Short Break'
          ref={shortBreakRef}
        />
        <ClockMode
          isActive={mode.isLongBreak}
          content='Long Break'
          ref={longBreakRef}
        />
      </Flex>
      <Center
        fontSize={{ base: '95px', sm: '120px', md: '130px', lg: '160px' }}
        my='-20px'
      >
        {secondsToTime(clockState.timeLeft)}
      </Center>

      <Button
        variant='customize'
        fontSize={{ base: '19px', md: '27px' }}
        textTransform='uppercase'
        w='44%'
        py={{ base: '15px', md: '20px', lg: '26px' }}
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
        onClick={handleToggleStart}
      >
        {clockState.isStart ? 'STOP' : 'START'}
      </Button>
    </Box>
  );
};

export default Clock;
