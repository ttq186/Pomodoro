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
      h='120px'
      w='54%'
      textAlign='center'
      color='gray.400'
      mt='3em'
      borderRadius='md'
    >
      <Tag
        size='lg'
        bg='gray.800'
        px='13px'
        mt='5px'
        mb='10px'
        borderRadius='sm'
        opacity='0.85'
      >
        <Image
          // src={Happy}
          src={Sad}
          w='25px'
          h='25px'
          mr='5px'
          ml='-5px'
          mt='2px'
        />
        <TagLabel color='gray.100' textTransform='uppercase' fontWeight='600'>
          Today's Progress
        </TagLabel>
      </Tag>

      <StatGroup>
        <Stat>
          <StatLabel color='gray.300' fontWeight='600'>
            Total
          </StatLabel>
          <StatNumber>3h</StatNumber>
        </Stat>

        <Stat>
          <StatLabel color='gray.300' fontWeight='600'>
            Session
          </StatLabel>
          <StatNumber>5</StatNumber>
        </Stat>

        <Stat>
          <StatLabel color='gray.300' fontWeight='600'>
            Task Done
          </StatLabel>
          <StatNumber>1</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Summary;
