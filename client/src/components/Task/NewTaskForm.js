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

const NewTaskForm = (props) => {
  return (
    <Box
      as='form'
      mr='3px'
      bg='gray.600'
      mx='0.7em'
      p='1em'
      borderRadius='sm'
    >
      <Input
        variant='flushed'
        placeholder='Flushed'
        placeholder='What is your target?'
        focusBorderColor='gray.700'
        fontSize='lg'
        fontWeight='600'
        color='gray.200'
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
          min={1}
          max={100}
          maxW='20'
        >
          <NumberInputField />
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
      />
      <Box textAlign='right' mt='15px'>
        <Button
          bg='gray.700'
          mx={{ base: '10px', md: '20px' }}
          variant='customize'
          color='gray.200'
          size='sm'
          onClick={props.handleAddTask}
        >
          Cancel
        </Button>
        <Button bg='gray.200' variant='customize' size='sm' px='20px'>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default NewTaskForm;
