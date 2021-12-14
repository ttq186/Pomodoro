import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Tag,
  Box,
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
  TASKLIST_ADD_TASK_SUBMIT,
  TASKLIST_ADD_TASK_TOGGLE,
  TASKLIST_MODIFY_TASK_SUBMIT,
  TASKLIST_MODIFY_TASK_CANCEL,
} from '../../constants/taskListConstants';

const NewTaskForm = ({ title, target, progress, notes }) => {
  const [isValidForm, setValidForm] = useState(true);

  const inputTitleRef = useRef();
  const inputSessionRef = useRef();
  const notesRef = useRef();

  const dispatch = useDispatch();

  const handleCancelClick = () => {
    if (title) {
      dispatch({ type: TASKLIST_MODIFY_TASK_CANCEL });
    } else dispatch({ type: TASKLIST_ADD_TASK_TOGGLE });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newTitle = inputTitleRef.current.value;
    const newTarget = inputSessionRef.current.value;
    const newNotes = notesRef.current.value;

    if (!newTitle) {
      setValidForm(false);
      return;
    }

    setValidForm(true);
    const payload = {
      title: newTitle,
      target: newTarget,
      notes: newNotes,
    };

    console.log(payload);
    if (title) {
      dispatch({ type: TASKLIST_MODIFY_TASK_SUBMIT, payload });
      return;
    }

    dispatch({ type: TASKLIST_ADD_TASK_SUBMIT, payload });
    dispatch({ type: TASKLIST_ADD_TASK_TOGGLE });
  };

  return (
    <Box as='form' mr='3px' bg='gray.600' mx='0.7em' p='1em' borderRadius='sm'>
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
          defaultValue={1}
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
      <Box textAlign='right' mt='15px'>
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

export default NewTaskForm;
