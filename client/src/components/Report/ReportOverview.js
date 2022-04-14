import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Tag,
  Flex,
  Image,
  Text,
  Divider,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import { DateTime } from 'luxon';

import Clock from '../../assets/icons/clock2.svg';
import Session from '../../assets/icons/session.svg';
import Task from '../../assets/icons/task.svg';
import ReportChart from './ReportChart';
import { isInNWeekAgo, formatDate } from '../../utils/timeUtils';

const handleChooseOption = () => {};

const ReportOverview = () => {
  const sessionList = useSelector((state) => state.report.sessionList);
  const taskList = useSelector((state) => state.taskList.tasks);
  const totalFinishedTasks = taskList.filter((task) => task.isFinished).length;
  let totalTime = 0;
  sessionList.forEach((session) => (totalTime += session.length));

  const [nWeekAgo, setNWeekAgo] = useState(0);
  const sessionsInNWeekAgo = sessionList.filter((session) =>
    isInNWeekAgo(session.finishedAt, nWeekAgo)
  );
  let sessionsByDayInNWeekAgo = Array(7)
    .fill()
    .map(() => ({
      date: null,
      totalTime: 0,
    }));
  const firstDayInNWeekAgo = DateTime.local()
    .startOf('week')
    .minus({ days: nWeekAgo * 7 });

  sessionsInNWeekAgo.forEach((session) => {
    const finishedDate = new Date(session.finishedAt);
    sessionsByDayInNWeekAgo[finishedDate.getDay()].totalTime += session.length;
  });

  sessionsByDayInNWeekAgo.forEach((sessionsByDate, index) => {
    if (index === 0) {
      sessionsByDate.date = formatDate(
        firstDayInNWeekAgo.plus({ days: index + 6 }).toString()
      );
    } else {
      sessionsByDate.date = formatDate(
        firstDayInNWeekAgo.plus({ days: index - 1 }).toString()
      );
    }
    sessionsByDate.totalTime =
      Math.round((sessionsByDate.totalTime / 60) * 10) / 10;
  });

  const handlePrevBtnClick = () => {
    setNWeekAgo(nWeekAgo + 1);
  };
  const handleNextBtnClick = () => {
    if (nWeekAgo <= 0) return;
    setNWeekAgo(nWeekAgo - 1);
  };
  return (
    <>
      <Box>
        <Tag
          bg='gray.400'
          fontSize={{ base: '14px', md: '16px' }}
          py='4px'
          fontWeight='600'
          borderRadius='sm'
          my='8px'
        >
          Activity Overview
        </Tag>

        <Flex my='0.8em' justifyContent='space-around'>
          <Box
            bg='gray.500'
            w='28%'
            px='1em'
            borderRadius='md'
            fontWeight='bold'
          >
            <Box d='flex' justifyContent='space-between'>
              <Image src={Clock} w='40px' />
              <Text fontSize='32px' m='0.3em' color='gray.100'>
                {(totalTime / 3600).toFixed(1)}
              </Text>
            </Box>
            <Text color='gray.200' float='right' mt='-0.5em' mb='0.5em'>
              focused hours
            </Text>
          </Box>
          <Box
            bg='gray.500'
            w='28%'
            px='1em'
            borderRadius='md'
            fontWeight='bold'
          >
            <Box d='flex' justifyContent='space-between'>
              <Image src={Session} w='40px' />
              <Text fontSize='32px' m='0.3em' color='gray.100'>
                {sessionList.length}
              </Text>
            </Box>
            <Text color='gray.200' float='right' mt='-0.5em' mb='0.5em'>
              finished sessions
            </Text>
          </Box>
          <Box
            bg='gray.500'
            w='28%'
            px='1em'
            borderRadius='md'
            fontWeight='bold'
          >
            <Box d='flex' justifyContent='space-between'>
              <Image src={Task} w='40px' />
              <Text fontSize='32px' m='0.3em' color='gray.100'>
                {totalFinishedTasks}
              </Text>
            </Box>
            <Text color='gray.200' float='right' mt='-0.5em' mb='0.5em'>
              finished tasks
            </Text>
          </Box>
        </Flex>
      </Box>

      <Divider my='0.5em' />

      <Box>
        <Flex justifyContent='space-between' alignItems='center' pr='1em'>
          <Tag
            bg='gray.400'
            fontSize={{ base: '14px', md: '16px' }}
            py='4px'
            fontWeight='600'
            borderRadius='sm'
            my='8px'
          >
            Focus Hours
          </Tag>

          <Flex alignItems='center'>
            <Menu closeOnSelect={true} autoSelect={false}>
              <MenuButton
                as={Button}
                variant='customize'
                bg='gray.300'
                color='gray.600'
                size='sm'
                mr='1em'
                rightIcon={<ChevronDownIcon />}
                defaultValue='Week'
              >
                Week
              </MenuButton>
              <MenuList
                bg='gray.200'
                color='gray.600'
                border='none'
                borderRadius='4px'
                minW='0'
                w='120px'
                fontSize='14px'
              >
                <MenuOptionGroup
                  type='radio'
                  defaultValue='Week'
                  onChange={(optionValue) => handleChooseOption(optionValue)}
                >
                  <MenuItemOption
                    value='Week'
                    fontWeight='bold'
                    _hover={{ bg: 'gray.300' }}
                  >
                    Week
                  </MenuItemOption>
                  <MenuItemOption
                    value='Year'
                    fontWeight='bold'
                    _hover={{ bg: 'gray.300' }}
                  >
                    Year
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
              <Flex justifyContent='center' alignItems='center'>
                <Button
                  rightIcon={<ArrowBackIcon />}
                  pl='6px'
                  h='2em'
                  variant='outline'
                  size='sm'
                  onClick={handlePrevBtnClick}
                />
                <Box
                  px='10px'
                  fontSize='16px'
                  fontWeight='bold'
                  color='gray.600'
                >
                  {nWeekAgo === 0
                    ? 'This Week'
                    : `~ ${formatDate(firstDayInNWeekAgo.toString())}-${
                        firstDayInNWeekAgo.c.year
                      }`}
                </Box>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  pl='6px'
                  h='2em'
                  variant='outline'
                  size='sm'
                  onClick={handleNextBtnClick}
                />
              </Flex>
            </Menu>
          </Flex>
        </Flex>
        <Box h='380px' my='1em'>
          <ReportChart
            data={[
              ...sessionsByDayInNWeekAgo.slice(1),
              sessionsByDayInNWeekAgo[0],
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default ReportOverview;
