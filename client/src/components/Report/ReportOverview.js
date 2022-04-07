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

import Clock from '../../assets/icons/clock2.svg';
import Session from '../../assets/icons/session.svg';
import Task from '../../assets/icons/task.svg';
import ReportChart from './ReportChart';

const handleChooseOption = () => {};

const ReportOverview = () => {
  const { totalTime, totalSessions, totalFinishedTasks } = useSelector(
    (state) => state.summary
  );
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
                {(totalTime / 3600).toFixed(1) !== '0.0'
                  ? `${(totalTime / 3600).toFixed(1)}h`
                  : '0'}
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
                {totalSessions}
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
              >
                Day
              </MenuButton>
              <MenuList
                bg='gray.300'
                color='gray.600'
                border='none'
                borderRadius='4px'
                minW='0'
                w='150px'
              >
                <MenuOptionGroup
                  defaultValue='Day'
                  type='radio'
                  onChange={(optionValue) => handleChooseOption(optionValue)}
                >
                  <MenuItemOption value='Day' _hover={{ bg: 'gray.400' }}>
                    Day
                  </MenuItemOption>
                  <MenuItemOption value='Week' _hover={{ bg: 'gray.400' }}>
                    Week
                  </MenuItemOption>
                  <MenuItemOption value='Year' _hover={{ bg: 'gray.400' }}>
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
                ></Button>
                <Box
                  px='20px'
                  fontSize='16px'
                  fontWeight='bold'
                  color='gray.600'
                >
                  Today
                </Box>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  pl='6px'
                  h='2em'
                  variant='outline'
                  size='sm'
                ></Button>
              </Flex>
            </Menu>
          </Flex>
        </Flex>
        <Box h='380px' my='1em'>
          <ReportChart />
        </Box>
      </Box>
    </>
  );
};

export default ReportOverview;
