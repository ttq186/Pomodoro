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
import { isToday } from '../utils/timeUtils';

const Summary = () => {
  const sessionList = useSelector((state) => state.report.sessionList);
  const taskList = useSelector((state) => state.taskList.tasks);
  const finishedSessionsToday = sessionList.filter((session) =>
    isToday(session.finishedAt)
  );
  const finishedTasksToday = taskList.filter(
    (task) => task.isFinished && isToday(task.finishedAt)
  );
  let totalTimeToday = 0;
  finishedSessionsToday.forEach(
    (session) => (totalTimeToday += session.length)
  );
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
        size='md'
        bg='gray.800'
        px='13px'
        py='3px'
        my='5px'
        borderRadius='sm'
        opacity='0.85'
      >
        <Image
          src={totalTimeToday / 3600 >= 1 ? HappyIcon : SadIcon}
          w={{ base: '20px', md: '25px', lg: '27px' }}
          h={{ base: '20px', md: '25px', lg: '27px' }}
          mr='5px'
          ml='-5px'
          mt='2px'
        />
        <TagLabel
          color='gray.100'
          textTransform='uppercase'
          fontWeight='600'
          fontSize={{ base: 'calc(6px + 2vw)', md: '14.5px', lg: '16px' }}
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
            {(totalTimeToday / 3600).toFixed(1) !== '0.0'
              ? `${(totalTimeToday / 3600).toFixed(1)}h`
              : '0h'}
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
            {finishedSessionsToday.length}
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
            {finishedTasksToday.length}
          </StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Summary;
