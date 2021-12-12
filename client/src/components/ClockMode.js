import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from '@chakra-ui/react';
import { CLOCK_TOGGLE_MODE } from '../constants/clockConstants';

const ClockMod = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const mode = ref.current.innerText.split(' ').join('_').toUpperCase();

    dispatch({
      type: CLOCK_TOGGLE_MODE,
      payload: mode,
    });
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
      onClick={handleClick}
    >
      {props.content}
    </Text>
  );
});

export default ClockMod;
