import { Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import PomodoroIcon from '../assets/icons/pomodoro.svg';

const SimpleHeader = () => {
  return (
    <Flex
      h='10vh'
      alignItems='center'
      fontWeight='600'
      color='gray.400'
      fontSize={{ base: '22px', md: '24px' }}
      mx={{ base: '10px', md: '30px' }}
      pt='0.8em'
      pb='0.1em'
    >
      <Image
        src={PomodoroIcon}
        w={{ base: '45px', md: '55px' }}
        h={{ base: '45px', md: '55px' }}
      ></Image>
      <Link to='/'>Pomodoro</Link>
    </Flex>
  );
};

export default SimpleHeader;
