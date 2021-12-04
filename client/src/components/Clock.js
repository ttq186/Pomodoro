import { Box, Flex, Text, Center, Button } from '@chakra-ui/react';
import ModalDialog from './ModalDialog';

const Clock = () => {
  return (
    <Box h='350px' w='500px' bg='gray.700' borderRadius='lg'>
      <ModalDialog />
      <Flex
        justify='space-around'
        align='center'
        m='30px'
        mb='10px'
        fontWeight='500'
      >
        <Text
          fontWeight='700'
          bg='gray.600'
          w='30%'
          textAlign='center'
          py='4px'
          borderRadius='sm'
          cursor='pointer'
        >
          Start Session
        </Text>
        <Text w='30%' textAlign='center' py='4px' cursor='pointer'>
          Short Break
        </Text>
        <Text w='30%' textAlign='center' py='4px' cursor='pointer'>
          Long Break
        </Text>
      </Flex>
      <Center fontSize='110px'>31:07</Center>
      <Button
        variant='customize'
        fontSize='22px'
        textTransform='uppercase'
        w='50%'
        py='20px'
        mt='30px'
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
          mt: '35px',
        }}
      >
        Start
      </Button>
    </Box>
  );
};

export default Clock;
