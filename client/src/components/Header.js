import {
  Flex,
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pomodoro from '../assets/icons/pomodoro.svg';
import UserManualModal from './UserManualModal';
import Report from './Report';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogOutClick = () => {
    dispatch(logout());
  }

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
        <Report />

        {userInfo ? (
          <Menu closeOnSelect={true} autoSelect={false}>
            <MenuButton
              as={Button}
              bg='gray.600'
              variant='customize'
              size='sm'
              px={{ base: '1em', md: '1.2em' }}
              h='35px'
              fontSize={{ base: '14px', md: '15px' }}
              rightIcon={<ChevronDownIcon />}
            >
              TTQ
            </MenuButton>
            <MenuList
              color='gray.800'
              border='none'
              borderRadius='4px'
              minW='0'
              w='130px'
              py='10px'
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleLogOutClick}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            bg='gray.600'
            variant='customize'
            size='sm'
            px={{ base: '1em', md: '1.2em' }}
            h='35px'
            fontSize={{ base: '14px', md: '15px' }}
          >
            <Link to='/signin'>Sign In</Link>
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
