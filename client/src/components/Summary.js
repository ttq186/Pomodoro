import {
  Box,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  Image,
} from '@chakra-ui/react';
import Happy from '../assets/happy.svg';
import Sad from '../assets/sad.svg';

const Summary = () => {
  return (
    <Box
      bg='gray.700'
      h={{ base: '110px', md: '120px' }}
      w='lg'
      textAlign='center'
      color='gray.400'
      my={{base: '20px', md: '30px'}}
      borderRadius='md'
    >
      <Tag
        size='lg'
        bg='gray.800'
        px='13px'
        mt='5px'
        mb={{base: '7px', md: '10px'}}
        borderRadius='sm'
        opacity='0.85'
      >
        <Image
          src={Happy}
          // src={Sad}
          w={{ base: '20px', md: '25px' }}
          h={{ base: '20px', md: '25px' }}
          mr='5px'
          ml='-5px'
          mt='2px'
        />
        <TagLabel color='gray.100' textTransform='uppercase' fontWeight='600' fontSize={{ base: '13px', md: '16px' }}>
          Today's Progress
        </TagLabel>
      </Tag>

      <StatGroup>
        <Stat>
          <StatLabel color='gray.300' fontWeight='600' fontSize={{base: '13px', md: '17px'}}>
            Total
          </StatLabel>
          <StatNumber>3h</StatNumber>
        </Stat>

        <Stat>
          <StatLabel color='gray.300' fontWeight='600' fontSize={{base: '13px', md: '17px'}}>
            Session
          </StatLabel>
          <StatNumber>5</StatNumber>
        </Stat>

        <Stat>
          <StatLabel color='gray.300' fontWeight='600' fontSize={{base: '13px', md: '17px'}}>
            Task Done
          </StatLabel>
          <StatNumber>1</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Summary;
