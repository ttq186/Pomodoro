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
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import { DateTime } from 'luxon';

import PaginationButton from '../PaginationButton';
import Clock from '../../assets/icons/clock2.svg';
import Session from '../../assets/icons/session.svg';
import Task from '../../assets/icons/task.svg';
import ReportChart from './ReportChart';
import { formatDate } from '../../utils/timeUtils';
import {
  classifySessionsByDayInNWeekAgo,
  classifySessionsByMonthInNYearAgo,
} from '../../utils/sessionUtils';

const ReportOverview = () => {
  const buttonSize = useBreakpointValue({ base: 'xs', lg: 'sm' });
  const sessionList = useSelector((state) => state.report.sessionList);
  const taskList = useSelector((state) => state.taskList.tasks);
  const totalFinishedTasks = taskList.filter((task) => task.isFinished).length;
  let totalTime = 0;
  sessionList.forEach((session) => (totalTime += session.length));

  const [nWeekAgo, setNWeekAgo] = useState(0);
  const [nYearAgo, setNYearAgo] = useState(0);
  const [isReportByWeek, setReportByWeek] = useState(true);
  const firstDayInNWeekAgo = DateTime.local()
    .startOf('week')
    .minus({ days: nWeekAgo * 7 });
  const currentYear = new Date().getFullYear();
  const sessionsByDayInNWeekAgo = classifySessionsByDayInNWeekAgo(
    sessionList,
    nWeekAgo
  );
  const sessionsByMonthInNYearAgo = classifySessionsByMonthInNYearAgo(
    sessionList,
    nYearAgo
  );

  const handlePrevBtnClick = () => {
    if (isReportByWeek) {
      setNWeekAgo(nWeekAgo + 1);
    } else {
      setNYearAgo(nYearAgo + 1);
    }
  };
  const handleNextBtnClick = () => {
    if (isReportByWeek) {
      if (nWeekAgo <= 0) return;
      setNWeekAgo(nWeekAgo - 1);
    } else {
      if (nYearAgo <= 0) return;
      setNYearAgo(nYearAgo - 1);
    }
  };

  const handleChooseOption = (optionValue) => {
    if (optionValue === 'Week') {
      setReportByWeek(true);
    } else {
      setReportByWeek(false);
    }
  };

  return (
    <>
      <Box>
        <Tag
          bg='gray.400'
          fontSize={{ base: '13px', md: '14px', lg: '15px', xl: '16px' }}
          py='4px'
          fontWeight='600'
          borderRadius='sm'
          my='8px'
        >
          Activity Overview
        </Tag>

        <Flex
          my='0.8em'
          justifyContent='space-around'
          fontSize={{ base: '11px', md: '14px', xl: '16px' }}
        >
          <Box
            bg='gray.500'
            w={{ base: '30%', lg: '29%', xl: '28%' }}
            px='1em'
            borderRadius='md'
            fontWeight='bold'
          >
            <Box d='flex' justifyContent='space-between'>
              <Image src={Clock} w={{ base: '30px', md: '35', lg: '40px' }} />
              <Text
                fontSize={{ base: '28px', md: '30px', lg: '32px' }}
                m='0.3em'
                color='gray.100'
              >
                {(totalTime / 3600).toFixed(1)}
              </Text>
            </Box>
            <Text color='gray.200' float='right' mt='-0.5em' mb='0.5em'>
              focused hours
            </Text>
          </Box>
          <Box
            bg='gray.500'
            w={{ base: '30%', lg: '29%', xl: '28%' }}
            px='1em'
            borderRadius='md'
            fontWeight='bold'
          >
            <Box d='flex' justifyContent='space-between'>
              <Image src={Session} w={{ base: '30px', md: '35', lg: '40px' }} />
              <Text
                fontSize={{ base: '28px', md: '30px', lg: '32px' }}
                m='0.3em'
                color='gray.100'
              >
                {sessionList.length}
              </Text>
            </Box>
            <Text color='gray.200' float='right' mt='-0.5em' mb='0.5em'>
              finished sessions
            </Text>
          </Box>
          <Box
            bg='gray.500'
            w={{ base: '30%', lg: '29%', xl: '28%' }}
            px='1em'
            borderRadius='md'
            fontWeight='bold'
          >
            <Box d='flex' justifyContent='space-between'>
              <Image src={Task} w={{ base: '30px', md: '35', lg: '40px' }} />
              <Text
                fontSize={{ base: '28px', md: '30px', lg: '32px' }}
                m='0.3em'
                color='gray.100'
              >
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
            fontSize={{ base: '13px', md: '14px', lg: '15px', xl: '16px' }}
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
                size={buttonSize}
                mr='1em'
                rightIcon={<ChevronDownIcon />}
              >
                {isReportByWeek ? 'Week' : 'Year'}
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
                <PaginationButton
                  icon={<ArrowBackIcon />}
                  size={buttonSize}
                  onClickHandler={handlePrevBtnClick}
                />
                <Box
                  px='10px'
                  fontSize={{ base: '13px', md: '14px', lg: '16px' }}
                  fontWeight='bold'
                  color='gray.600'
                >
                  {isReportByWeek
                    ? nWeekAgo === 0
                      ? 'This Week'
                      : `~ ${formatDate(firstDayInNWeekAgo.toString())}-${
                          firstDayInNWeekAgo.c.year
                        }`
                    : currentYear - nYearAgo}
                </Box>
                <PaginationButton
                  icon={<ArrowForwardIcon />}
                  size={buttonSize}
                  onClickHandler={handleNextBtnClick}
                />
              </Flex>
            </Menu>
          </Flex>
        </Flex>
        <Box h={{ base: '300px', md: '330px', lg: '340px' }} my='1em'>
          <ReportChart
            data={
              isReportByWeek
                ? [
                    ...sessionsByDayInNWeekAgo.slice(1),
                    sessionsByDayInNWeekAgo[0],
                  ]
                : sessionsByMonthInNYearAgo
            }
            isReportByWeek={isReportByWeek}
          />
        </Box>
      </Box>
    </>
  );
};

export default ReportOverview;
