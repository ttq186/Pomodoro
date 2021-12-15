import {
  Flex,
  Text,
  Box,
  Button,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import Pomodoro from '../assets/icons/pomodoro.svg';

const Header = () => {
  const size = useBreakpointValue({ base: 'xs', sm: 'sm', lg: 'md' });

  return (
    <Flex
      color='gray.100'
      justify='space-between'
      align='center'
      mx={{ base: '10px', md: '30px' }}
      mb={{ base: '20px', md: '0px' }}
      pt='20px'
    >
      <Flex
        align='center'
        fontWeight='600'
        color='gray.400'
        fontSize={{ base: '18px', md: '20px' }}
      >
        <Image
          src={Pomodoro}
          w={{ base: '30px', md: '50px' }}
          h={{ base: '30px', md: '50px' }}
        ></Image>
        <Text>Pomodoro</Text>
      </Flex>
      <Box>
        <Button
          bg='gray.600'
          mx={{ base: '10px', md: '20px' }}
          variant='customize'
          size={size}
        >
          Report
        </Button>
        <Button
          bg='gray.600'
          variant='customize'
          size={size}
        >
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
