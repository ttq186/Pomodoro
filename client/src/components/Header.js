import { Flex, Text, Box, Button, Image } from '@chakra-ui/react';
import Pomodoro from '../assets/pomodoro.svg';

const Header = () => {
  return (
    <Flex color='gray.100' justify='space-between' align='center' w='95%' ml='40px' pt='20px'>
      <Flex fontSize='xl' align='center' fontWeight='600' color='gray.400'>
        <Image src={Pomodoro} w='50px' h='50px' ></Image>
        <Text >Pomodoro</Text>
      </Flex>
      <Box>
        <Button bg='gray.600' mx='20px' variant='customize'>Report</Button>
        <Button bg='gray.600' variant='customize'>Login</Button>
      </Box>
    </Flex>
  );
};

export default Header;
