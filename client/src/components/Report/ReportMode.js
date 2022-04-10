import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';

import { switchReportMode } from '../../actions/reportActions';

const ReportMode = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const handleToggleMode = () => {
    const mode = ref.current.innerText.split(' ').join('_').toUpperCase();
    dispatch(switchReportMode(mode));
  };

  return props.isActive ? (
    <Box
      border='1px'
      px='1.5em'
      borderRadius='4'
      cursor='pointer'
      bg='gray.600'
      color='gray.100'
    >
      {props.content}
    </Box>
  ) : (
    <Box
      border='1px'
      px='1.5em'
      borderRadius='4'
      cursor='pointer'
      ref={ref}
      onClick={handleToggleMode}
    >
      {props.content}
    </Box>
  );
});

export default ReportMode;
