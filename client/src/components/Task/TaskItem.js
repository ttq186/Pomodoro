import { Box, Checkbox, Image, Divider, Flex } from '@chakra-ui/react';
import Setting from '../../assets/setting.svg';
import { useDispatch } from 'react-redux';
import {
  TASKLIST_MODIFY_TASK,
  TASKLIST_CHOOSE_TASK,
  TASKLIST_UNCHOOSE_TASK,
} from '../../constants/taskListConstants';

const TaskItem = (props) => {
  const dispatch = useDispatch();

  const { id, title, notes, isDisabled, progress, target } = {
    ...props,
  };

  const handleSettingClick = () => {
    dispatch({ type: TASKLIST_MODIFY_TASK, payload: id });
  };

  const handleChooseTask = (e) => {
    if (e.target.checked) dispatch({ type: TASKLIST_CHOOSE_TASK, payload: id });
    else dispatch({ type: TASKLIST_UNCHOOSE_TASK });
  };

  return (
    <Box
      bg='gray.500'
      w='95%'
      mx='auto'
      mb={{ base: '8px', md: '11px' }}
      py={{ base: '5px', md: '10px' }}
      borderRadius='sm'
      opacity={isDisabled ? '0.4' : '1'}
    >
      <Flex d='flex' mb='2px'>
        <Checkbox
          iconColor='gray.900'
          colorScheme='gray'
          w='95%'
          p='10px'
          borderRadius='sm'
          color='gray.100'
          fontSize='lg'
          fontWeight='600'
          isDisabled={isDisabled}
          onChange={handleChooseTask}
        >
          {title}
        </Checkbox>
        <Box
          color='gray.300'
          mr='10px'
          fontWeight='600'
          my='auto'
          textAlign='right'
        >
          {progress}
          <Divider />
          {target}
        </Box>
        <Image
          src={Setting}
          w='25px'
          mr='5px'
          mt='5px'
          cursor='pointer'
          onClick={handleSettingClick}
        />
      </Flex>

      {notes && (
        <Box
          bg='gray.600'
          py='5px'
          pl='10px'
          mx='5%'
          borderRadius='sm'
          fontSize='14px'
          color='gray.400'
        >
          {notes}
        </Box>
      )}
    </Box>
  );
};

export default TaskItem;
