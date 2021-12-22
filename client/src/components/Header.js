import {
  Flex,
  Text,
  Box,
  Button,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Pomodoro from '../assets/icons/pomodoro.svg';
import UserManualModal from './UserManualModal';

const Header = () => {
  const size = useBreakpointValue({ base: 'xs', sm: 'sm', lg: 'md' });

  return (
    <Flex
      color='gray.100'
      justifyContent='space-between'
      alignItems='center'
      flexDir={{ base: 'column', sm: 'row' }}
      mx={{ base: '10px', md: '30px' }}
      mb={{ base: '-15px', md: '0px' }}
      pt={{ base: '1em', sm: '1.2em' }}
    >
      <Flex
        alignItems='center'
        fontWeight='600'
        color='gray.400'
        fontSize='20px'
      >
        <Image src={Pomodoro} w='50px' h='50px'></Image>
        <Link to='/'>Pomodoro</Link>
      </Flex>
      <Box mt='0.7em'>
        <UserManualModal />

        <Button
          bg='gray.600'
          mx={{ base: '15px', md: '20px' }}
          variant='customize'
          size='sm'
          px={{ base: '1em', md: '1.2em' }}
          fontSize={{ base: '14px', md: '15px' }}
        >
          Report
        </Button>
        <Button
          bg='gray.600'
          variant='customize'
          size='sm'
          px={{ base: '1em', md: '1.2em' }}
          fontSize={{ base: '14px', md: '15px' }}
        >
          <Link to='/signin'>Sign In</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
