import { Box, Checkbox, Image, Divider, Flex, Text } from '@chakra-ui/react';
import Setting from '../../assets/icons/setting.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  modifyTask,
  chooseTask,
  unChooseTask,
} from '../../actions/taskListActions';

const TaskItem = (props) => {
  const dispatch = useDispatch();
  const choseTask = useSelector((state) => state.taskList.choseTask);

  const { id, title, notes, isDisabled, progress, target } = {
    ...props,
  };

  const handleSettingClick = () => {
    if (!choseTask) dispatch(modifyTask(id));
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
      opacity={isDisabled || target === progress ? '0.4' : '1'}
    >
      <Flex d='flex' mb='2px'>
        <Checkbox
          iconColor='gray.900'
          colorScheme='gray'
          w='95%'
          p='10px'
          borderRadius='sm'
          color='gray.100'
          fontWeight='600'
          isDisabled={isDisabled || target === progress}
          onChange={handleChooseTask}
        >
          <Text fontSize={{ base: 'md', md: 'lg' }}>{title}</Text>
        </Checkbox>
        <Box
          color='gray.300'
          mr='10px'
          fontWeight='600'
          my='auto'
          textAlign='right'
          fontSize={{ base: 'md', md: 'lg' }}
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
          cursor={choseTask ? 'not-allowed' : 'pointer'}
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
          fontSize='15px'
          color='gray.400'
        >
          {notes}
        </Box>
      )}
    </Box>
  );
};

export default TaskItem;
