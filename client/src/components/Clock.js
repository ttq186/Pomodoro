import { Box, Flex, Text, Center, Button } from '@chakra-ui/react';

const Clock = () => {
  return (
    <Box h='350px' w='500px' bg='gray.700' borderRadius='lg'>
      <Flex
        justify='space-around'
        align='center'
        mx='30px'
        my='20px'
        fontWeight='500'
      >
        <Text
          fontWeight='700'
          bg='gray.600'
          w='33%'
          textAlign='center'
          py='4px'
          borderRadius='sm'
        >
          Start Session
        </Text>
        <Text w='33%' textAlign='center' py='4px'>
          Short Break
        </Text>
        <Text w='33%' textAlign='center' py='4px'>
          Long Break
        </Text>
      </Flex>
      <Center fontSize='100px'>50:00</Center>
      <Button
        variant='customize'
        fontSize='22px'
        textTransform='uppercase'
        w='50%'
        py='20px'
        my='30px'
        borderRadius='sm'
        borderWidth='2px'
        borderBottom='6px solid #CBD5E0'
        mx='25%'
        _hover={{
          bg: 'gray.100',
          color: '#171923',
        }}
        _active={{
          borderBottom: '2px solid #fefefe',
          my: '35px',
        }}
      >
        Start
      </Button>
    </Box>
  );
};

export default Clock;
