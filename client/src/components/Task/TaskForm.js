import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Tag,
  Box,
  Text,
  Button,
  Flex,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  submitAddTask,
  toggleAddTask,
  submitModifyTask,
  cancelModifyTask,
  removeTask,
} from '../../actions/taskListActions';

const TaskForm = ({ title, target, progress, notes, id }) => {
  const [isValidForm, setValidForm] = useState(true);

  const inputTitleRef = useRef(null);
  const inputSessionRef = useRef(null);
  const notesRef = useRef(null);

  const dispatch = useDispatch();

  const handleCancelClick = () => {
    if (title) {
      dispatch(cancelModifyTask());
      return;
    }
    
    dispatch(toggleAddTask());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newTitle = inputTitleRef.current.value;
    const newTarget = +inputSessionRef.current.value;
    const newNotes = notesRef.current.value;

    if (!newTitle) {
      setValidForm(false);
      return;
    }

    setValidForm(true);
    const taskInfo = {
      title: newTitle,
      target: newTarget,
      notes: newNotes,
    };

    if (title) {
      dispatch(submitModifyTask(taskInfo));
      return;
    }

    dispatch(submitAddTask(taskInfo));
    dispatch(toggleAddTask());
  };

  const handleRemoveTaskClick = () => {
    const confirmRemove = window.confirm(
      'Are you sure you want to remove this task?'
    );
    if (!confirmRemove) return;

    dispatch(removeTask(id));
    dispatch(cancelModifyTask());
  };

  return (
    <Box
      as='form'
      h='265px'
      mr='3px'
      bg='gray.600'
      mx='0.7em'
      p='1em'
      borderRadius='sm'
    >
      <Input
        variant='flushed'
        placeholder='What is your target?'
        focusBorderColor='gray.700'
        fontSize='lg'
        fontWeight='600'
        color='gray.200'
        ref={inputTitleRef}
        isInvalid={!isValidForm}
        defaultValue={title}
      />

      <Flex justifyContent='space-between' alignItems='center' my='1em'>
        <Tag
          bg='gray.500'
          fontSize='15px'
          py='5px'
          fontWeight='600'
          borderRadius='sm'
          color='gray.300'
          mr='2em'
        >
          Estimated sessions:
        </Tag>
        <NumberInput
          focusBorderColor='gray.700'
          color='gray.200'
          step={1}
          size='sm'
          min={progress ? progress + 1 : 1}
          max={1000}
          maxW='20'
          defaultValue={target ? target : 1}
        >
          <NumberInputField ref={inputSessionRef} />
          <NumberInputStepper>
            <NumberIncrementStepper border='none' />
            <NumberDecrementStepper border='none' />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      <Textarea
        size='sm'
        focusBorderColor='gray.700'
        bg='gray.500'
        color='gray.200'
        fontWeight='600'
        placeholder='Notes'
        ref={notesRef}
        defaultValue={notes}
      />

      <Text
        color='gray.200'
        fontWeight='600'
        pl='5px'
        cursor='pointer'
        _hover={{ color: 'gray.900' }}
        onClick={handleRemoveTaskClick}
        float='left'
        mt='25px'
        d={id ? 'block' : 'none'}
      >
        REMOVE
      </Text>
      <Box float='right' mt='20px'>
        <Button
          bg='gray.700'
          mx={{ base: '10px', md: '20px' }}
          variant='customize'
          color='gray.200'
          size='sm'
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          bg='gray.200'
          variant='customize'
          size='sm'
          px='20px'
          onClick={handleFormSubmit}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
