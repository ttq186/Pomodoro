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
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  
  import Pomodoro from '../assets/icons/pomodoro.svg';
  import GoogleIcon from '../assets/icons/google-icon.png';
  
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
          pt='0.6em'
        >
          <Image
            src={Pomodoro}
            mb='1px'
            w={{ base: '30px', md: '50px' }}
            h={{ base: '30px', md: '50px' }}
          ></Image>
          <Link to='/'>Pomodoro</Link>
        </Flex>
  
        <Flex h='90vh' justifyContent='center'>
          <Box
            color='#fff'
            alignSelf='center'
            mt='-3em'
            w='380px'
            h='450px'
            bg='#fff'
            borderRadius='5px'
            p='1.4em'
            pt='2em'
            color='gray.700'
          >
            <FormControl isRequired>
              <FormLabel htmlFor='email' fontWeight='600'>
                Email
              </FormLabel>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email address'
                borderColor='gray.400'
                focusBorderColor='gray.600'
              />
            </FormControl>
            <FormControl isRequired mt='1.5em'>
              <FormLabel htmlFor='password' fontWeight='600'>
                Password
              </FormLabel>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                borderColor='gray.400'
                focusBorderColor='gray.600'
              />
            </FormControl>
            <Button
              bg='gray.700'
              variant='customize'
              color='gray.200'
              w='100%'
              borderRadius='5px'
              my='1.3em'
            >
              Sign Up
            </Button>
  
            <Flex alignItems='center'>
              <Divider />
              <Text fontWeight='600' mx='0.5em'>
                OR
              </Text>
              <Divider />
            </Flex>
  
            <Button
              bg='gray.300'
              color='gray.700'
              w='100%'
              borderRadius='5px'
              my='1.3em'
            >
              <Image src={GoogleIcon} w='20px' mx='0.5em' mt='-2px' /> Sign Up
              with Google
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
      </Box>
    );
  };
  
  export default SignUp;
  