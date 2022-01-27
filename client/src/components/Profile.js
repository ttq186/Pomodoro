import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useBreakpointValue,
  MenuItem,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { updateUserInfo } from '../actions/userActions';

const Profile = () => {
  const size = useBreakpointValue({ base: 'md', md: 'xl', xl: '2xl' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = () => {
    const newUserInfo = {
      username: getValues().name,
    };
    if (getValues().password) {
      newUserInfo.password = getValues().password;
    }
    dispatch(updateUserInfo(newUserInfo));
    reset();
    onClose();
  };

  return (
    <>
      <Button
        as={MenuItem}
        onClick={onOpen}
        w='100%'
        mb='5px'
        pr='50%'
        bg='#fff'
        fontWeight='500'
      >
        Profile
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        closeOnOverlayClick={false}
      >
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent
          top={{ base: '8%', md: '10vh', lg: '5vh' }}
          w='90%'
          minH='510px'
          mb={{ base: '10em', md: '2em' }}
        >
          <ModalCloseButton />
          <ModalBody p='0' as={Flex} justifyContent='space-between'>
            <Box
              w='28%'
              bg='linear-gradient(0deg, rgba(74,85,104,1) 10%, rgba(113,128,150,1) 42%, rgba(203,213,224,1) 82%)'
              borderLeftRadius='md'
              d={{ base: 'none', sm: 'block' }}
            ></Box>
            <Box
              w={{ base: '100%', sm: '68%' }}
              py='1.5em'
              pr='2em'
              pl={{ base: '2em', sm: '0' }}
            >
              <Heading color='gray.600' mb='0.3em'>
                Profile
              </Heading>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <FormControl my='0.8em'>
                  <FormLabel htmlFor='name' fontWeight='600' color='gray.600'>
                    Name
                  </FormLabel>
                  <Input
                    id='name'
                    focusBorderColor='gray.500'
                    borderColor='gray.300'
                    defaultValue={userInfo.username}
                    placeholder='Enter your name'
                    {...register('name')}
                  />
                </FormControl>
                <FormControl my='0.8em'>
                  <FormLabel htmlFor='email' fontWeight='600' color='gray.600'>
                    Email
                  </FormLabel>
                  <Input
                    id='email'
                    focusBorderColor='gray.500'
                    defaultValue={userInfo.email}
                    isDisabled
                    borderColor='gray.300'
                  />
                </FormControl>

                <FormControl
                  my='1.5em'
                  mb='0.8em'
                  isInvalid={errors.currentPassword}
                >
                  <FormLabel
                    htmlFor='currentPassword'
                    fontWeight='600'
                    color='gray.600'
                  >
                    Current Password
                  </FormLabel>
                  <Input
                    id='currentPassword'
                    type='password'
                    focusBorderColor='gray.500'
                    borderColor='gray.300'
                    {...register('password', {
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
                <FormControl my='0.8em' isInvalid={errors.password}>
                  <FormLabel
                    htmlFor='password'
                    fontWeight='600'
                    color='gray.600'
                  >
                    New Password
                  </FormLabel>
                  <Input
                    id='password'
                    type='password'
                    focusBorderColor='gray.500'
                    borderColor='gray.300'
                    {...register('password', {
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
                <FormControl my='0.8em' isInvalid={errors.confirmPassword}>
                  <FormLabel
                    htmlFor='confirm-password'
                    fontWeight='600'
                    color='gray.600'
                  >
                    Confirm New Password
                  </FormLabel>
                  <Input
                    id='confirm-password'
                    type='password'
                    focusBorderColor='gray.500'
                    borderColor='gray.300'
                    {...register('confirmPassword', {
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

                <Box fontSize='13px' fontWeight='600'>
                  <span style={{ color: '#E53E5E', marginRight: '3px' }}>
                    *
                  </span>
                  Don't fill in password section if you don't want to change
                  password
                </Box>
                <Button
                  type='submit'
                  w='50%'
                  variant='customize'
                  bg='gray.400'
                  color='gray.700'
                  mx='25%'
                  mt='1.5em'
                >
                  Update
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
