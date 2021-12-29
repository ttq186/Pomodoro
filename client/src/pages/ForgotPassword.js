import {
  Box,
  Flex,
  Image,
  FormControl,
  Input,
  Button,
  Text,
  Heading,
  ScaleFade,
  Spinner,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Pomodoro from '../assets/icons/pomodoro.svg';
import { resetPassword } from '../actions/userActions';

const SignIn = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = () => {
    const email = getValues().email;
    dispatch(resetPassword(email));
  };

  document.title = 'Forgot Password';

  return (
    <Box bg='gray.800'>
      <Flex
        h='10vh'
        alignItems='center'
        fontWeight='600'
        color='gray.400'
        fontSize={{ base: '18px', md: '20px' }}
        mx={{ base: '10px', md: '30px' }}
        pt='0.5em'
      >
        <Image
          src={Pomodoro}
          mb='-1px'
          w={{ base: '40px', md: '50px' }}
          h={{ base: '40px', md: '50px' }}
        ></Image>
        <Link to='/'>Pomodoro</Link>
      </Flex>

      <ScaleFade initialScale='0.8' in={true}>
        <Flex h='90vh' justifyContent='center'>
          {successMessage ? (
            <Alert
              status='success'
              borderRadius='md'
              w={{ base: '90%', md: '80%' }}
              mt='1em'
              maxH={{base: '120px', md: '80px'}}
              fontSize={{ base: 'md', md: 'lg' }}
            >
              <AlertIcon />
              An email has been sent to your email address. Please follow the
              instruction in the email to reset your password.
            </Alert>
          ) : (
            <Box
              alignSelf='center'
              w={{ base: '90%', sm: '380px' }}
              minH={{ base: '200px', sm: '250px' }}
              bg='#fff'
              borderRadius='5px'
              p={{ base: '1em', sm: '1.4em' }}
              color='gray.700'
            >
              {errorMessage && (
                <Alert
                  status='error'
                  borderRadius='md'
                  mb='1em'
                  fontSize='15px'
                >
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box textAlign='center'>
                  <Heading>Forgot Password</Heading>
                  <Text mb='1em' mt='0.5em'>
                    Enter the email address you use to sign in.
                  </Text>
                </Box>

                <FormControl isInvalid={errors.email}>
                  <Input
                    id='email'
                    // placeholder='Enter your email address'
                    borderColor='gray.400'
                    focusBorderColor='gray.600'
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Please fill in this field!',
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email format!',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type='submit'
                  bg='gray.700'
                  variant='customize'
                  color='gray.100'
                  w='100%'
                  borderRadius='5px'
                  mt={{ base: '1em', sm: '1.3em' }}
                >
                  Continue
                </Button>
              </form>
            </Box>
          )}
        </Flex>
      </ScaleFade>
    </Box>
  );
};

export default SignIn;
