import { Box, Flex, Text, Center, Button } from '@chakra-ui/react';
import ModalDialog from './ModalDialog';

const Clock = () => {
  return (
    <Box
      h={{ base: '240px', md: '350px' }}
      w='lg'
      bg='gray.700'
      borderRadius='md'
      pos='relative'
    >
      <ModalDialog />
      <Flex
        w={{ base: '95%', md: '90%' }}
        mx='auto'
        justify='space-around'
        align='center'
        mt={{ base: '20px', md: '30px' }}
        mb='10px'
        fontWeight='500'
        fontSize={{ base: '11px', md: '16px' }}
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
      <Center fontSize={{ base: '70px', md: '110px' }}>31:07</Center>

      <Button
        variant='customize'
        fontSize={{ sm: '20px', md: '22px' }}
        textTransform='uppercase'
        w='50%'
        py={{ base: '15px', md: '22px' }}
        mt={{base: '17px', md: '15px'}}  
        borderRadius='sm'
        borderWidth='2px'
        borderBottom='7px solid #CBD5E0'
        mx='25%'
        _hover={{
          bg: 'gray.100',
          color: '#171923',
        }}
        _active={{
          borderBottom: '2px solid #fefefe',
          mt: '20px',
        }}
      >
        Start
      </Button>
    </Box>
  );
};

export default Clock;
