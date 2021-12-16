import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import {
  CLOCK_SWITCH_MODE,
  CLOCK_UPDATE_TIME_LEFT,
  CLOCK_TOGGLE_START,
} from '../constants/clockConstants';

const ClockMod = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const timerSettingState = useSelector((state) => state.clock.timerSetting);
  const isStart = useSelector((state) => state.clock.isStart);

  const handleToggleMode = () => {
    const mode = ref.current.innerText.split(' ').join('_').toUpperCase();

    const time =
      mode === 'START_SESSION'
        ? timerSettingState.sessionTime
        : mode === 'SHORT_BREAK'
        ? timerSettingState.shortBreakTime
        : timerSettingState.longBreakTime;

    if (isStart) {
      const confirm = window.confirm(
        'Be careful! The timer is still running. Are you sure you want to switch to this mode?'
      );
      if (confirm) dispatch({ type: CLOCK_TOGGLE_START });
      else return;
    }
    dispatch({ type: CLOCK_SWITCH_MODE, payload: { mode, time } });
    dispatch({ type: CLOCK_UPDATE_TIME_LEFT, payload: time });
  };

  return props.isActive ? (
    <Text
      w='30%'
      textAlign='center'
      py='4px'
      cursor='pointer'
      fontWeight='700'
      bg='gray.600'
      borderRadius='sm'
    >
      {props.content}
    </Text>
  ) : (
    <Text
      w='30%'
      textAlign='center'
      py='4px'
      cursor='pointer'
      _hover={{
        color: 'gray.100',
      }}
      ref={ref}
      onClick={handleToggleMode}
    >
      {props.content}
    </Text>
  );
});

export default ClockMod;
