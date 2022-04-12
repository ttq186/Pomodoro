import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import {
  toggleClockStart,
  updateTimeLeft,
  switchClockMode,
} from '../../actions/clockActions';
import {
  toggleHasJustFinishedTask,
  unChooseTask,
  updateTaskProgress,
} from '../../actions/taskListActions';
import { addSession } from '../../actions/reportActions';
import ClockModal from '../../components/Clock/ClockModal';
import ClockMode from '../../components/Clock/ClockMode';
import { secondsToTime } from '../../utils';
import store from '../../store';
import drumKick from '../../assets/sounds/drum-kick.mp3';
import alarm from '../../assets/sounds/alarm-sound.mp3';
import ticking from '../../assets/sounds/ticking-sound.mp3';
import noneSound from '../../assets/sounds/none-sound.mp3';

const Clock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignedIn = useSelector((state) => state.user.tokenData);
  const clockState = useSelector((state) => state.clock);
  const choseTask = useSelector((state) => state.taskList.choseTask);
  const totalSubSessions = useSelector(
    (state) => state.report.totalSubSessions
  );
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
  // const isLongBreakMode =
  //   store.getState().report.totalSubSessions % longBreakInterval === 0;

  const [playButtonSound] = useSound(drumKick);
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
  const [playTickingNoneSound] = useSound(noneSound, {
    sprite: { none: [0, 2000] },
    interrupt: true,
    volume: 0.01,
  });

  useEffect(() => {
    const timeByMode =
      clockMode === 'START_SESSION'
        ? sessionTime
        : clockMode === 'SHORT_BREAK'
        ? shortBreakTime
        : longBreakTime;

    dispatch(updateTimeLeft(timeByMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionTime, shortBreakTime, longBreakTime]);

  const playClockTickingSound = () => {
    const tickingSoundValue = timerSetting.tickingSound.toLowerCase();
    if (tickingSoundValue === 'none') {
      playTickingNoneSound({ id: tickingSoundValue });
    } else {
      playTickingSound({ id: tickingSoundValue });
    }
  };

  // const handleUpdateSummary = () => {
  //   const newTotalTime = summaryState.totalTime + sessionTime;
  //   const newTotalSessions = summaryState.totalSessions + 1;
  //   dispatch(
  //     updateSummary({
  //       totalTime: newTotalTime,
  //       totalSessions: newTotalSessions,
  //     })
  //   );
  // };

  const startCountdown = async (timeLeft) => {
    dispatch(toggleClockStart());
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // delay 0.5s for smoother clock toggling state
    if (timeLeft > 0) await delay(500);

    while (timeLeft > 0) {
      playClockTickingSound();
      if (timeLeft === 1 && clockMode === 'START_SESSION') {
        // handleUpdateSummary();
      }
      // Stop countdown if stop button is clicked
      if (!store.getState().clock.isStart) return;

      timeLeft--;
      if (clockMode === 'START_SESSION') {
        document.title = `${secondsToTime(timeLeft)} - Time to focus`;
      } else {
        document.title = `${secondsToTime(timeLeft)} - Time to break`;
      }
      dispatch(updateTimeLeft(timeLeft));
      await delay(1000);
    }
    handleFinishCountdown();
  };

  const playClockAlarmSound = () => {
    let alarmSoundValue = timerSetting.alarmSound
      .toLowerCase()
      .split(' ')
      .join('');
    playAlarmSound({ id: alarmSoundValue });
  };

  const switchToStartSessionMode = () => {
    dispatch(switchClockMode({ mode: 'START_SESSION', time: sessionTime }));
    document.title = `${secondsToTime(sessionTime)} - Time to focus`;
  };

  const switchToShortBreakMode = () => {
    dispatch(switchClockMode({ mode: 'SHORT_BREAK', time: shortBreakTime }));
    document.title = `${secondsToTime(shortBreakTime)} - Time to break`;
  };

  const switchToLongBreakMode = () => {
    dispatch(switchClockMode({ mode: 'LONG_BREAK', time: longBreakTime }));
    document.title = `${secondsToTime(longBreakTime)} - Time to break`;
  };

  const handleFinishCountdown = () => {
    stopCountdown();
    playClockAlarmSound();
    if (clockMode === 'SHORT_BREAK' || clockMode === 'LONG_BREAK') {
      switchToStartSessionMode();
      return;
    }
    const newSessionInfo = { length: sessionTime };
    if (choseTask) {
      const { id, target, progress } = choseTask;
      const updatedTaskInfo = { progress: progress + 1 };
      newSessionInfo.taskId = id;
      if (target === progress + 1) {
        dispatch(unChooseTask());
        dispatch(toggleHasJustFinishedTask());
        updatedTaskInfo.isFinished = true;
      }
      dispatch(updateTaskProgress(id, updatedTaskInfo));
    }
    dispatch(addSession(newSessionInfo));
    const isLongBreakMode =
      store.getState().report.totalSubSessions % longBreakInterval === 0;
    if (isLongBreakMode) {
      switchToLongBreakMode();
    } else {
      switchToShortBreakMode();
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

    playButtonSound();
    if (!store.getState().clock.isStart) {
      await startCountdown(clockState.timeLeft);
    } else {
      stopCountdown();
    }
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
