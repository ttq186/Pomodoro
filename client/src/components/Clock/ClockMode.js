import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import {
  switchClockMode,
  updateTimeLeft,
  toggleClockStart,
} from '../../actions/clockActions';

const ClockMode = forwardRef((props, ref) => {
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
      if (confirm) dispatch(toggleClockStart());
      else return;
    }
    dispatch(switchClockMode({ mode, time }));
    dispatch(updateTimeLeft(time));
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

export default ClockMode;
