import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Box,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagRightIcon,
  Divider,
  Menu,
  MenuList,
  MenuButton,
  Switch,
  useBreakpointValue,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { ChevronDownIcon, LockIcon } from '@chakra-ui/icons';
import useSound from 'use-sound';

import Tweak from '../../assets/icons/tweak.svg';
import Clock from '../../assets/icons/clock.svg';
import alarm from '../../assets/sounds/alarm-sound.mp3';
import ticking from '../../assets/sounds/ticking-sound.mp3';
import { updateTimerSetting } from '../../actions/clockActions';

const ClockModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = useBreakpointValue({ base: 'sm', md: 'md' });

  const timerSettingState = useSelector((state) => state.clock.timerSetting);
  const dispatch = useDispatch();

  const [alarmSound, setAlarmSound] = useState(timerSettingState.alarmSound);
  const [tickingSpeed, setTickingSpeed] = useState(
    timerSettingState.tickingSpeed
  );

  const sessionRef = useRef(null);
  const shortBreakRef = useRef(null);
  const longBreakRef = useRef(null);
  const longBreakIntervalRef = useRef(null);

  const [playAlarmSound] = useSound(alarm, {
    sprite: {
      bell: [0, 1000],
      digital: [2600, 2000],
      doorbell: [4300, 2000],
      kitchen: [10000, 1500],
    },
    interrupt: true,
  });
  const [playTickingSpeed] = useSound(ticking, {
    sprite: {
      fast: [0, 1000],
      slow: [5000, 2000],
    },
    interrupt: true,
  });

  const handleOkayClick = () => {
    onClose();

    const updateTimerData = {
      sessionTime: Math.round(+sessionRef.current.value * 60),
      shortBreakTime: Math.round(+shortBreakRef.current.value * 60),
      longBreakTime: Math.round(+longBreakRef.current.value * 60),
      longBreakInterval: Math.floor(+longBreakIntervalRef.current.value),
      alarmSound,
      tickingSpeed,
    };

    dispatch(updateTimerSetting(updateTimerData));
  };

  const handleChooseSpeed = (value) => {
    const speedValue = value.toLowerCase().split(' ').join('');
    playTickingSpeed({ id: speedValue });
    setTickingSpeed(value);
  };

  const handleChooseSound = (value) => {
    const soundValue = value.toLowerCase().split(' ').join('');
    playAlarmSound({ id: soundValue });
    setAlarmSound(value);
  };

  const handleCloseClick = () => {
    setAlarmSound(timerSettingState.alarmSound);
    setTickingSpeed(timerSettingState.tickingSpeed);
  };

  return (
    <>
      <Image
        src={Tweak}
        w={{ base: '20px', md: '25px' }}
        pos='absolute'
        right={{ base: '4px', md: '6px' }}
        top={{ base: '3px', md: '9px' }}
        cursor='pointer'
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={size}
      >
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent bg='gray.700' color='gray.100' mt='7em'>
          <ModalHeader
            borderBottom='2px solid #f2f2f2'
            d='flex'
            py={{ base: '5px', md: '10px' }}
            mb={{ base: '0px', md: '10px' }}
          >
            <Image src={Clock} w={{ base: '20px', md: '30px' }} />
            <Text fontSize={{ base: '20px', md: '25px' }} ml='10px'>
              Timer Setting
            </Text>
          </ModalHeader>
          <ModalCloseButton onClick={handleCloseClick} />
          <ModalBody px='4%'>
            <Box>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '15px' }}
                py='3px'
                fontWeight='600'
                borderRadius='sm'
                my='8px'
              >
                Time (minutes)
              </Tag>
              <Flex
                justifyContent='space-between'
                fontWeight='600'
                color='gray.200'
                fontSize='14px'
              >
                <Box>
                  <Text>Session</Text>
                  <NumberInput
                    focusBorderColor='gray.500'
                    step={1}
                    size='sm'
                    defaultValue={timerSettingState.sessionTime / 60}
                    min={0}
                    max={60}
                    maxW={{ base: '20', md: '24' }}
                  >
                    <NumberInputField ref={sessionRef} />
                    <NumberInputStepper>
                      <NumberIncrementStepper border='none' />
                      <NumberDecrementStepper border='none' />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>

                <Box>
                  <Text>Short Break</Text>
                  <NumberInput
                    focusBorderColor='gray.500'
                    step={1}
                    size='sm'
                    defaultValue={timerSettingState.shortBreakTime / 60}
                    min={0}
                    max={20}
                    maxW={{ base: '20', md: '24' }}
                  >
                    <NumberInputField ref={shortBreakRef} />
                    <NumberInputStepper>
                      <NumberIncrementStepper border='none' />
                      <NumberDecrementStepper border='none' />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box>
                  <Text>Long Break</Text>
                  <NumberInput
                    focusBorderColor='gray.500'
                    step={1}
                    size='sm'
                    defaultValue={timerSettingState.longBreakTime / 60}
                    min={0}
                    max={40}
                    maxW={{ base: '20', md: '24' }}
                  >
                    <NumberInputField ref={longBreakRef} />
                    <NumberInputStepper>
                      <NumberIncrementStepper border='none' />
                      <NumberDecrementStepper border='none' />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </Flex>
            </Box>

            <Divider my='1em' />

            <Flex justifyContent='space-between' alignItems='center'>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '15px' }}
                py='3px'
                fontWeight='600'
                borderRadius='sm'
                my='8px'
              >
                Long Break Interval
              </Tag>
              <NumberInput
                focusBorderColor='gray.500'
                step={1}
                size='sm'
                defaultValue={timerSettingState.longBreakInterval}
                isInvalid={
                  !Number.isInteger(timerSettingState.longBreakInterval)
                }
                min={1}
                max={10}
                maxW={{ base: '20', md: '24' }}
              >
                <NumberInputField ref={longBreakIntervalRef} />
                <NumberInputStepper>
                  <NumberIncrementStepper border='none' />
                  <NumberDecrementStepper border='none' />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Divider my='1em' />

            <Flex justifyContent='space-between' alignItems='center'>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '15px' }}
                py='3px'
                fontWeight='600'
                borderRadius='sm'
                my='8px'
              >
                Alarm Sound
              </Tag>
              <Menu closeOnSelect={true} autoSelect={false}>
                <MenuButton
                  as={Button}
                  variant='customize'
                  bg='gray.600'
                  size='sm'
                  rightIcon={<ChevronDownIcon />}
                >
                  {alarmSound}
                </MenuButton>
                <MenuList
                  bg='gray.600'
                  border='none'
                  borderRadius='4px'
                  _hover={{ bg: 'gray.600' }}
                  minW='0'
                  w='150px'
                >
                  <MenuOptionGroup
                    defaultValue={alarmSound}
                    type='radio'
                    onChange={(optionValue) => handleChooseSound(optionValue)}
                  >
                    <MenuItemOption value='Bell' _hover={{ bg: 'gray.700' }}>
                      Bell
                    </MenuItemOption>
                    <MenuItemOption value='Digital' _hover={{ bg: 'gray.700' }}>
                      Digital
                    </MenuItemOption>
                    <MenuItemOption
                      value='Door Bell'
                      _hover={{ bg: 'gray.700' }}
                    >
                      Door Bell
                    </MenuItemOption>
                    <MenuItemOption value='Kitchen' _hover={{ bg: 'gray.700' }}>
                      Kitchen
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>

            <Divider my='1em' />

            <Flex justifyContent='space-between' alignItems='center'>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '15px' }}
                py='3px'
                fontWeight='600'
                borderRadius='sm'
                my='8px'
              >
                Ticking Sound
              </Tag>

              <Menu closeOnSelect={true} autoSelect={false}>
                <MenuButton
                  as={Button}
                  variant='customize'
                  bg='gray.600'
                  size='sm'
                  rightIcon={<ChevronDownIcon />}
                >
                  {tickingSpeed}
                </MenuButton>
                <MenuList
                  bg='gray.600'
                  border='none'
                  borderRadius='4px'
                  _hover={{ bg: 'gray.600' }}
                  minW='0'
                  w='150px'
                >
                  <MenuOptionGroup
                    defaultValue={tickingSpeed}
                    type='radio'
                    onChange={(optionValue) => handleChooseSpeed(optionValue)}
                  >
                    <MenuItemOption value='None' _hover={{ bg: 'gray.700' }}>
                      None
                    </MenuItemOption>
                    <MenuItemOption value='Fast' _hover={{ bg: 'gray.700' }}>
                      Fast
                    </MenuItemOption>
                    <MenuItemOption value='Slow' _hover={{ bg: 'gray.700' }}>
                      Slow
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>

            <Divider my='1em' />

            <Flex justifyContent='space-between' alignItems='center'>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '15px' }}
                py='3px'
                fontWeight='600'
                borderRadius='sm'
                my='8px'
              >
                <TagRightIcon mr='5px' ml='0' as={LockIcon} />
                Light Mode
              </Tag>
              <Switch colorScheme='gray' size='lg' mr='1em' />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              variant='customize'
              bg='gray.800'
              px={{ base: '4em', md: '5em' }}
              mx='auto'
              opacity='0.9'
              _hover={{
                bg: 'gray.100',
                color: '#171923',
              }}
              onClick={handleOkayClick}
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClockModal;