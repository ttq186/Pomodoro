import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  ScaleFade,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { signUp } from '../actions/userActions';
import SimpleHeader from '../components/SimpleHeader';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignedUpSuccess = useSelector((state) => state.user.isSignedUpSuccess);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = () => {
    const email = getValues().email;
    const password = getValues().password;

    dispatch(signUp(email, password));
  };

  useEffect(() => {
    if (isSignedUpSuccess) navigate('/signin');
  });

  document.title = 'Sign Up';

  return (
    <Box bg='gray.800'>
      <SimpleHeader />

      <ScaleFade initialScale='0.8' in={true}>
        <Flex h={{ base: '95vh', sm: '90vh' }} justifyContent='center'>
          <Box
            alignSelf='center'
            mb={{base: '10vh', sm: '3em'}}
            w={{ base: '90%', sm: '385px' }}
            minH={{ base: '400px', sm: '465px' }}
            bg='#fff'
            borderRadius='5px'
            p={{ base: '1em', sm: '1.4em' }}
            pt={{ base: '1em', sm: '2em' }}
            color='gray.700'
          >
            {isSignedUpSuccess === false && (
              <Alert
                status='error'
                borderRadius='md'
                mt={{ base: '0', sm: '-1em' }}
                mb='1em'
                fontSize='15px'
              >
                <AlertIcon />
                This email already exists. Try again!
              </Alert>
            )}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor='email' fontSize='18px' fontWeight='600' d='inline-block'>
                  Email
                  <span style={{ color: '#E53E5E', marginLeft: '3px' }}>*</span>
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
                <FormLabel htmlFor='password' fontSize='18px' fontWeight='600' d='inline-block'>
                  Password
                  <span style={{ color: '#E53E5E', marginLeft: '3px' }}>*</span>
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
              <FormControl
                mt='1.5em'
                mb='0.5em'
                isInvalid={errors.confirmPassword}
              >
                <FormLabel
                  htmlFor='confirm-password'
                  fontWeight='600'
                  d='inline-block'
                  fontSize='18px'
                >
                  Confirm Password
                  <span style={{ color: '#E53E5E', marginLeft: '3px' }}>*</span>
                </FormLabel>
                <Input
                  id='confirm-password'
                  type='password'
                  placeholder='Enter your password again'
                  borderColor='gray.400'
                  focusBorderColor='gray.600'
                  {...register('confirmPassword', {
                    required: {
                      value: true,
                      message: 'Please fill in this field!',
                    },
                    minLength: {
                      value: 8,
                      message: 'Minimum length should be 8',
                    },
                    validate: {
                      matchPassword: (value) =>
                        value === getValues().password ||
                        'Password does not match!',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
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
                fontSize={{base: '16px', sm: '18px'}}
              >
                Sign Up
              </Button>
            </form>

            <Flex
              justifyContent='space-between'
              fontSize='16px'
              px='0.5em'
              fontWeight='600'
            >
              <Text mt='1em' textAlign='center'>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </Text>
              <Text mt='1em' textAlign='center'>
                <Link to='/signin'>Sign In</Link>
              </Text>
            </Flex>
          </Box>
        </Flex>
      </ScaleFade>
    </Box>
  );
};

export default SignUp;
