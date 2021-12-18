import { Box, Checkbox, Image, Divider, Flex } from '@chakra-ui/react';
import Setting from '../../assets/icons/setting.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  modifyTask,
  chooseTask,
  unChooseTask,
  updateTaskFinish,
  toggleHasJustFinishedTask,
} from '../../actions/taskListActions';
import { updateTotalFinishedTask } from '../../actions/clockActions';
import { useEffect } from 'react';

const TaskItem = (props) => {
  const hasChoseTask = useSelector((state) => state.taskList.hasChoseTask);
  const dispatch = useDispatch();

  const { id, title, notes, isDisabled, progress, target, isFinished } = {
    ...props,
  };

  useEffect(() => {
    if (target === progress && !isFinished) {
      dispatch(unChooseTask());
      dispatch(toggleHasJustFinishedTask());
      dispatch(updateTaskFinish(id));
      dispatch(updateTotalFinishedTask());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const handleSettingClick = () => {
    if (!hasChoseTask || progress === target) dispatch(modifyTask(id));
  };

  const handleChooseTask = (e) => {
    if (e.target.checked) dispatch(chooseTask(id));
    else dispatch(unChooseTask());
  };

  return (
    <Box
      bg='gray.500'
      w='95%'
      mx='auto'
      mb={{ base: '8px', md: '11px' }}
      py={{ base: '5px', md: '10px' }}
      borderRadius='sm'
      opacity={isDisabled || progress === target ? '0.4' : '1'}
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
          isDisabled={isDisabled || progress === target}
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
          cursor={
            hasChoseTask && progress !== target ? 'not-allowed' : 'pointer'
          }
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
