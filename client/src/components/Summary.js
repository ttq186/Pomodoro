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

import HappyIcon from '../assets/icons/happy.svg';
import SadIcon from '../assets/icons/sad.svg';

const Summary = () => {
  // const { totalTime, totalSessions, totalFinishedTasks } = useSelector(
  //   (state) => state.summary
  // );

  return (
    <Box
      bg='gray.700'
      h={{ base: '110px', md: '130px' }}
      w='xl'
      textAlign='center'
      color='gray.400'
      my={{ base: '20px', md: '30px' }}
      pt='5px'
      borderRadius='md'
    >
      <Tag
        size='lg'
        bg='gray.800'
        px='13px'
        my='5px'
        borderRadius='sm'
        opacity='0.85'
      >
        <Image
          src={4000 / 3600 >= 1 ? HappyIcon : SadIcon}
          w={{ base: '20px', md: '27px' }}
          h={{ base: '20px', md: '27px' }}
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
          Today Progress
        </TagLabel>
      </Tag>

      <StatGroup>
        <Stat>
          <StatLabel
            color='gray.300'
            fontWeight='600'
            fontSize={{ base: '15px', md: '20px' }}
          >
            Total
          </StatLabel>
          <StatNumber fontSize={{ base: '24px', md: '28px' }}>
            {/* {(totalTime / 3600).toFixed(1) !== '0.0'
              ? `${(totalTime / 3600).toFixed(1)}h`
              : '0h'} */}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel
            color='gray.300'
            fontWeight='600'
            fontSize={{ base: '15px', md: '20px' }}
          >
            Session
          </StatLabel>
          <StatNumber fontSize={{ base: '24px', md: '28px' }}>
            {/* {totalSessions} */}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel
            color='gray.300'
            fontWeight='600'
            fontSize={{ base: '15px', md: '20px' }}
          >
            Task Done
          </StatLabel>
          <StatNumber fontSize={{ base: '24px', md: '28px' }}>
            {/* {totalFinishedTasks} */}
          </StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Summary;
