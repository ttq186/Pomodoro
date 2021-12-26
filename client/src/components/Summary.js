import { useSelector } from 'react-redux';
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
import Happy from '../assets/icons/happy.svg';
import Sad from '../assets/icons/sad.svg';

const Summary = () => {
  const { totalTime, totalSessions, totalFinishedTasks } = useSelector(
    (state) => state.clock.summary
  );

  return (
    <Box
      bg='gray.700'
      h={{ base: '110px', md: '120px' }}
      w='lg'
      textAlign='center'
      color='gray.400'
      my={{ base: '20px', md: '30px' }}
      borderRadius='md'
    >
      <Tag
        size='lg'
        bg='gray.800'
        px='13px'
        mt='5px'
        mb={{ base: '7px', md: '10px' }}
        borderRadius='sm'
        opacity='0.85'
      >
        <Image
          src={totalTime / 3600 >= 1 ? Happy : Sad}
          w={{ base: '20px', md: '25px' }}
          h={{ base: '20px', md: '25px' }}
          mr='5px'
          ml='-5px'
          mt='2px'
        />
        <TagLabel
          color='gray.100'
          textTransform='uppercase'
          fontWeight='600'
          fontSize={{ base: '13px', md: '16px' }}
        >
          Your's Progress
        </TagLabel>
      </Tag>

      <StatGroup>
        <Stat>
          <StatLabel
            color='gray.300'
            fontWeight='600'
            fontSize={{ base: '13px', md: '17px' }}
          >
            Total
          </StatLabel>
          <StatNumber>
            {(totalTime / 3600).toFixed(1) !== '0.0'
              ? `${(totalTime / 3600).toFixed(1)}h`
              : '0h'}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel
            color='gray.300'
            fontWeight='600'
            fontSize={{ base: '13px', md: '17px' }}
          >
            Session
          </StatLabel>
          <StatNumber>{totalSessions}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel
            color='gray.300'
            fontWeight='600'
            fontSize={{ base: '13px', md: '17px' }}
          >
            Task Done
          </StatLabel>
          <StatNumber>{totalFinishedTasks}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Summary;
