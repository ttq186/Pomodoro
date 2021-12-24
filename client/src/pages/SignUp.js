import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  ScaleFade,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Pomodoro from '../assets/icons/pomodoro.svg';

const SignUp = () => {
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
          <Box
            alignSelf='center'
            mt='-3em'
            w={{ base: '90%', sm: '380px' }}
            h={{ base: '400px', sm: '450px' }}
            bg='#fff'
            borderRadius='5px'
            p={{ base: '1em', sm: '1.4em' }}
            pt={{ base: '1em', sm: '2em' }}
            color='gray.700'
          >
            <FormControl>
              <FormLabel htmlFor='email' fontWeight='600' d='inline-block'>
                Email
                <span style={{ color: '#E53E5E', marginLeft: '3px' }}>*</span>
              </FormLabel>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email address'
                borderColor='gray.400'
                focusBorderColor='gray.600'
              />
            </FormControl>
            <FormControl mt='1.5em'>
              <FormLabel htmlFor='password' fontWeight='600' d='inline-block'>
                Password
                <span style={{ color: '#E53E5E', marginLeft: '3px' }}>*</span>
              </FormLabel>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                borderColor='gray.400'
                focusBorderColor='gray.600'
              />
            </FormControl>
            <FormControl mt='1.5em' mb='0.5em'>
              <FormLabel
                htmlFor='confirm-password'
                fontWeight='600'
                d='inline-block'
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
              />
            </FormControl>

            <Button
              bg='gray.700'
              variant='customize'
              color='gray.100'
              w='100%'
              borderRadius='5px'
              my={{ base: '1em', sm: '1.3em' }}
            >
              Sign Up
            </Button>

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
