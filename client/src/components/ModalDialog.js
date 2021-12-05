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
  MenuItem,
  MenuList,
  MenuButton,
  Switch,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, LockIcon } from '@chakra-ui/icons';
import Tweak from '../assets/tweak.svg';
import Clock from '../assets/clock.svg';

const ModalDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = useBreakpointValue({ base: 'sm', md: 'md' });

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
          <ModalCloseButton />
          <ModalBody px='4%'>
            <Box>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '17px' }}
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
                    defaultValue={25}
                    min={0}
                    max={60}
                    maxW={{base: '20', md: '24'}}
                  >
                    <NumberInputField />
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
                    defaultValue={5}
                    min={0}
                    max={20}
                    maxW={{base: '20', md: '24'}}
                  >
                    <NumberInputField />
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
                    defaultValue={15}
                    min={0}
                    max={40}
                    maxW={{base: '20', md: '24'}}
                  >
                    <NumberInputField />
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
                fontSize={{ base: '14px', md: '17px' }}
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
                defaultValue={4}
                min={1}
                max={10}
                maxW={{base: '20', md: '24'}}
              >
                <NumberInputField />
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
                fontSize={{ base: '14px', md: '17px' }}
                fontWeight='600'
                borderRadius='sm'
                my='8px'
              >
                Alarm Sound
              </Tag>
              <Menu isLazy autoSelect={false} size='md'>
                <MenuButton
                  as={Button}
                  variant='customize'
                  bg='gray.600'
                  size={size}
                  rightIcon={<ChevronDownIcon />}
                >
                  Digital
                </MenuButton>
                <MenuList
                  bg='gray.600'
                  border='none'
                  borderRadius='4px'
                  _hover={{ bg: 'gray.600' }}
                  minW='0'
                  w='150px'
                >
                  <MenuItem _hover={{ bg: 'gray.700' }}>Kitchen</MenuItem>
                  <MenuItem _hover={{ bg: 'gray.700' }}>Chicken</MenuItem>
                  <MenuItem _hover={{ bg: 'gray.700' }}>Digital</MenuItem>
                  <MenuItem _hover={{ bg: 'gray.700' }}>Meow Meow</MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Divider my='1em' />

            <Flex justifyContent='space-between' alignItems='center'>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '17px' }}
                fontWeight='600'
                borderRadius='sm'
                my='8px'
              >
                Ticking Sound
              </Tag>
              <Menu isLazy autoSelect={false} size='md'>
                <MenuButton
                  as={Button}
                  variant='customize'
                  bg='gray.600'
                  px='10px'
                  py='5px'
                  size={size}
                  rightIcon={<ChevronDownIcon />}
                >
                  None
                </MenuButton>
                <MenuList
                  bg='gray.600'
                  border='none'
                  borderRadius='4px'
                  _hover={{ bg: 'gray.600' }}
                  minW='0'
                  w='120px'
                >
                  <MenuItem _hover={{ bg: 'gray.700' }}>None</MenuItem>
                  <MenuItem _hover={{ bg: 'gray.700' }}>Fast</MenuItem>
                  <MenuItem _hover={{ bg: 'gray.700' }}>Slow</MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Divider my='1em' />

            <Flex justifyContent='space-between' alignItems='center'>
              <Tag
                bg='gray.200'
                fontSize={{ base: '14px', md: '17px' }}
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
              px={{base: '4em', md: '5em'}}
              mx='auto'
              opacity='0.9'
              _hover={{
                bg: 'gray.100',
                color: '#171923',
              }}
              onClick={onClose}
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDialog;
