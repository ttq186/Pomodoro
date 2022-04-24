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
  const dispatch = useDispatch();
  const size = useBreakpointValue({ base: 'md', md: 'xl', xl: '2xl' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loginType = useSelector((state) => state.user.tokenData.loginType);
  const userInfo = useSelector((state) => state.user.userInfo);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    reset,
  } = useForm(userInfo);

  const handleFormSubmit = () => {
    const newUserInfo = {
      username: getValues().name,
    };
    if (getValues().password) {
      newUserInfo.password = getValues().password;
    }
    dispatch(updateUserInfo(newUserInfo));
    reset(userInfo);
    onClose();
  };

  const handleCloseButtonClick = () => {
    reset();
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
          top={{ base: '8%', md: '8%' }}
          w='90%'
          minH='510px'
          mb='10em'
        >
          <ModalCloseButton onClick={handleCloseButtonClick} />
          <ModalBody p='0' as={Flex} justifyContent='space-between'>
            <Box
              w='30%'
              bg='linear-gradient(0deg, rgba(74,85,104,1) 10%, rgba(113,128,150,1) 42%, rgba(203,213,224,1) 82%)'
              borderLeftRadius='md'
              d={{ base: 'none', sm: 'block' }}
            ></Box>

            <Box
              w={{ base: '100%', sm: '64%' }}
              py='1.5em'
              pr='2.5em'
              pl={{ base: '2em', sm: '0' }}
              h=''
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
                <FormControl my='0.8em' isInvalid={errors.password}>
                  <FormLabel
                    htmlFor='password'
                    fontWeight='600'
                    color='gray.600'
                  >
                    Password
                  </FormLabel>
                  <Input
                    id='password'
                    type='password'
                    focusBorderColor='gray.500'
                    borderColor='gray.300'
                    isDisabled={loginType !== 'normal'}
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
                    Confirm Password
                  </FormLabel>
                  <Input
                    id='confirm-password'
                    type='password'
                    focusBorderColor='gray.500'
                    borderColor='gray.300'
                    isDisabled={loginType !== 'normal'}
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

                <Button
                  type='submit'
                  w='50%'
                  variant='customize'
                  bg='gray.400'
                  color='gray.700'
                  mx='25%'
                  mt='0.5em'
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
