import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  ScaleFade,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Heading,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Pomodoro from '../assets/icons/pomodoro.svg';
import { resetPasswordConfirm } from '../actions/userActions';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const {successMessage, errorMessage} = useSelector(
    (state) => state.user
  );
  const { id, token } = useParams();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = () => {
    const newPassword = getValues().password;

    dispatch(resetPasswordConfirm(id, token, newPassword));
  };

  document.title = 'Reset Password';

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
          {successMessage ? (
            <Alert
              status='success'
              borderRadius='md'
              w={{ base: '90%', md: '80%' }}
              mt='1em'
              maxH={{ base: '50px', md: '70px' }}
              fontSize={{ base: 'md', md: 'lg' }}
            >
              <AlertIcon />
              {successMessage}
            </Alert>
          ) : (
            <Box
              alignSelf='center'
              mb='2em'
              w={{ base: '90%', sm: '380px' }}
              minH={{ base: '300px', sm: '350px' }}
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
                  <Heading>Reset Password</Heading>
                </Box>
                <FormControl mt='1.5em' isInvalid={errors.password}>
                  <FormLabel
                    htmlFor='password'
                    fontWeight='600'
                    d='inline-block'
                  >
                    New Password
                    <span style={{ color: '#E53E5E', marginLeft: '3px' }}>
                      *
                    </span>
                  </FormLabel>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Enter your new password'
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
                  >
                    Confirm Password
                    <span style={{ color: '#E53E5E', marginLeft: '3px' }}>
                      *
                    </span>
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
                  mt={{ base: '1em', sm: '1.3em' }}
                >
                  Update
                </Button>
              </form>
            </Box>
          )}
        </Flex>
      </ScaleFade>
    </Box>
  );
};

export default ResetPassword;
