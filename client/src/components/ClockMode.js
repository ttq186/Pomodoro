import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import {
  CLOCK_TOGGLE_MODE,
  CLOCK_UPDATE_TIME_LEFT,
} from '../constants/clockConstants';

const ClockMod = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const timerSettingState = useSelector((state) => state.clock.timerSetting);

  const handleToggleMode = () => {
    const mode = ref.current.innerText.split(' ').join('_').toUpperCase();

    const time =
      mode === 'START_SESSION'
        ? timerSettingState.sessionTime
        : mode === 'SHORT_BREAK'
        ? timerSettingState.shortBreakTime
        : timerSettingState.longBreakTime;

    dispatch({ type: CLOCK_TOGGLE_MODE, payload: { mode, time } });

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
