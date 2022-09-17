import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tag,
  Flex,
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
import {
  formatDate,
  getFirstAndLastDateInNWeekAgo,
  getFirstAndLastDateInNYearAgo,
} from '../../utils/timeUtils';
import {
  classifySessionsByDayInNWeekAgo,
  classifySessionsByMonthInNYearAgo,
} from '../../utils/sessionUtils';
import ActivityOverview from '../ActivityOverview';
import { getSessionsInPeriod } from '../../actions/reportActions';

const ReportOverview = () => {
  const dispatch = useDispatch();
  const buttonSize = useBreakpointValue({ base: 'xs', lg: 'sm' });
  const chartMargin = useBreakpointValue({ base: -30, md: -20, lg: -17 });
  const sessionsInPeriod = useSelector(
    (state) => state.report.sessionsInPeriod
  );
  const userInfo = useSelector((state) => state.user.userInfo);
  const taskList = useSelector((state) => state.taskList.tasks);
  const totalFinishedTasks = taskList.filter((task) => task.isFinished).length;

  const [nWeekAgo, setNWeekAgo] = useState(0);
  const [nYearAgo, setNYearAgo] = useState(0);
  const [isReportByWeek, setReportByWeek] = useState(true);
  const firstDayInNWeekAgo = DateTime.local()
    .startOf('week')
    .minus({ days: nWeekAgo * 7 });
  const currentYear = new Date().getFullYear();
  const sessionsByDayInNWeekAgo = classifySessionsByDayInNWeekAgo(
    sessionsInPeriod,
    nWeekAgo
  );
  const sessionsByMonthInNYearAgo = classifySessionsByMonthInNYearAgo(
    sessionsInPeriod,
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
    setReportByWeek(optionValue === 'Week');
  };

  useEffect(() => {
    const [fromDate, toDate] = isReportByWeek
      ? getFirstAndLastDateInNWeekAgo(nWeekAgo)
      : getFirstAndLastDateInNYearAgo(nYearAgo);
    dispatch(getSessionsInPeriod(fromDate, toDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReportByWeek, nWeekAgo, nYearAgo]);

  return (
    <>
      <Box>
        <Tag
          bg='gray.400'
          fontSize={{
            base: '11px',
            sm: '13px',
            md: '14px',
            lg: '15px',
            xl: '16px',
          }}
          py='4px'
          fontWeight='600'
          borderRadius='sm'
          mb={{ base: '0', md: '0.8em' }}
          mt={{ base: '0.8em' }}
        >
          Activity Overview
        </Tag>

        <Flex my='0.8em' justifyContent='space-around'>
          <ActivityOverview
            icon={Clock}
            detail={
              (userInfo.totalTime / 3600).toFixed(1) !== '0.0'
                ? (userInfo.totalTime / 3600).toFixed(1)
                : '0'
            }
            content='focused hours'
          />
          <ActivityOverview
            icon={Session}
            detail={userInfo.totalSessions}
            content='finished sessions'
          />
          <ActivityOverview
            icon={Task}
            detail={totalFinishedTasks}
            content='finished tasks'
          />
        </Flex>
      </Box>

      <Divider mt='0.5em' />

      <Box>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          pr='0.5em'
          flexDir={{ base: 'column', md: 'row' }}
        >
          <Tag
            bg='gray.400'
            fontSize={{
              base: '11px',
              sm: '13px',
              md: '14px',
              lg: '15px',
              xl: '16px',
            }}
            py='4px'
            fontWeight='600'
            borderRadius='sm'
            mb='0.8em'
            mt={{ base: '0.8em' }}
            alignSelf={{ base: 'flex-start', md: 'auto' }}
          >
            Focus Hours
          </Tag>

          <Flex
            alignItems='center'
            justifyContent='space-between'
            alignSelf={{ base: 'flex-end', md: 'auto' }}
          >
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
            </Menu>
            <Flex alignItems='center'>
              <PaginationButton
                icon={<ArrowBackIcon />}
                size={buttonSize}
                onClickHandler={handlePrevBtnClick}
              />
              <Box
                px='10px'
                fontSize={{ base: '3.2vw', md: '14px', lg: '16px' }}
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
          </Flex>
        </Flex>
        <Box h={{ base: '300px', md: '330px', lg: '340px' }} my='1em'>
          <ReportChart
            data={
              isReportByWeek
                ? sessionsByDayInNWeekAgo
                : sessionsByMonthInNYearAgo
            }
            isReportByWeek={isReportByWeek}
            chartMargin={chartMargin}
          />
        </Box>
      </Box>
    </>
  );
};

export default ReportOverview;
