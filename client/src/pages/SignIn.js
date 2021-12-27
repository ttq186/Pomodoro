import { useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Divider,
  ScaleFade,
  Spinner,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Pomodoro from '../assets/icons/pomodoro.svg';
import { login } from '../actions/userActions';
import GoogleLogin from '../components/GoogleLogin';

const SignIn = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const {
    loading,
    tokenData,
    isloggedInSuccess,
    isSignedUpSuccess,
    errorMessage,
  } = userLogin;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = () => {
    const email = getValues().email;
    const password = getValues().password;
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (tokenData) navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenData]);

  document.title = 'Sign In';

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
        <Flex h={{ base: '95vh', sm: '90vh' }} justifyContent='center'>
          {loading ? (
            <Spinner size='xl' color='gray.200' speed='1.5s' mt='20%' />
          ) : (
            <Box
              alignSelf='center'
              mb='2em'
              w={{ base: '90%', sm: '380px' }}
              minH={{ base: '400px', sm: '450px' }}
              bg='#fff'
              borderRadius='5px'
              p={{ base: '1em', sm: '1.4em' }}
              pt={{ base: '1em', sm: '2em' }}
              color='gray.700'
            >
              {isloggedInSuccess === false && (
                <Alert
                  status='error'
                  borderRadius='md'
                  mt={{ base: '0', sm: '-1em' }}
                  mb='1em'
                  fontSize='15px'
                >
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              {isSignedUpSuccess === true && (
                <Alert
                  status='success'
                  borderRadius='md'
                  mt={{ base: '0', md: '-1em' }}
                  mb='1em'
                  pl='10px'
                  fontSize='14px'
                >
                  <AlertIcon mr='5px' />
                  Your account has been created successfully!
                </Alert>
              )}
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor='email' fontWeight='600' d='inline-block'>
                    Email
                    <span style={{ color: '#E53E5E', marginLeft: '3px' }}>
                      *
                    </span>
                  </FormLabel>
                  <Input
                    id='email'
                    placeholder='Enter your email address'
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
                <FormControl mt='1.5em' isInvalid={errors.password}>
                  <FormLabel
                    htmlFor='password'
                    fontWeight='600'
                    d='inline-block'
                  >
                    Password
                    <span style={{ color: '#E53E5E', marginLeft: '3px' }}>
                      *
                    </span>
                  </FormLabel>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    borderColor='gray.400'
                    focusBorderColor='gray.600'
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Please fill in this field!',
                      },
                      minLength: {
                        value: 8,
                        message: 'Minimum length should be 8',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type='submit'
                  bg='gray.700'
                  variant='customize'
                  color='gray.100'
                  w='100%'
                  borderRadius='5px'
                  my={{ base: '1em', sm: '1.3em' }}
                >
                  Sign In
                </Button>
              </form>

              <Flex alignItems='center'>
                <Divider />
                <Text fontWeight='600' mx='0.5em'>
                  OR
                </Text>
                <Divider />
              </Flex>

              <GoogleLogin />

              <Flex
                justifyContent='space-between'
                fontSize='15px'
                px='0.5em'
                fontWeight='600'
              >
                <Text mt='1em' textAlign='center'>
                  <Link to='/reset-password'>Forgot Password?</Link>
                </Text>
                <Text mt='1em' textAlign='center'>
                  <Link to='/signup'>Sign Up</Link>
                </Text>
              </Flex>
            </Box>
          )}
        </Flex>
      </ScaleFade>
    </Box>
  );
};

export default SignIn;
