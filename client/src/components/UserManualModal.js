import {
  Alert,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  useBreakpointValue,
  Text,
  Box,
  OrderedList,
  ListItem,
  Tag,
} from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const UserManualModal = () => {
  const size = useBreakpointValue({ base: 'md', md: '2xl', xl: '4xl' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mr={{ base: '10px', md: '20px' }}
        variant='customize'
        bg='gray.100'
        color='gray.800'
        onClick={onOpen}
        size='sm'
        px={{ base: '0.5em', md: '1em' }}
        fontSize={{ base: '14px', sm: '16px' }}
        h={{ base: '30px', md: '38px' }}
      >
        How to use
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent w='95%' mt={{ base: '10vh', md: '15vh' }}>
          <ModalHeader py={{ base: '1em', md: '1.2em' }}></ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody
            fontWeight='bold'
            pb='1.5em'
            fontSize={{ base: '14px', md: '15px', xl: '16px' }}
            px={{ base: '0.6em', md: '1em' }}
          >
            <Box>
              <Tag
                bg='gray.400'
                fontSize={{ base: '14px', md: '15px', xl: '16.5px' }}
                py='5px'
                fontWeight='bold'
                borderRadius='sm'
                mb='0.5em'
              >
                About Pomodoro
              </Tag>
              <Text color='gray.600' pl='1em'>
                This web app applies the Pomodoro technique. It is a famous time
                management technique developed by Francesco Cirillo in the late
                1980s that can help us increase our productivity. It uses a
                timer to break work into sessions{' '}
                <Text as='i'>(typically 25mins)</Text> separated by short breaks{' '}
                <Text as='i'>(typically 5mins)</Text>. After 4 consecutive
                sessions, we will take a long break{' '}
                <Text as='i'>(typically 20mins)</Text> and start over until our
                target task is finished.
              </Text>
            </Box>

            <Divider my='0.8em' />

            <Box>
              <Tag
                bg='gray.400'
                fontSize={{ base: '14px', md: '15px', xl: '16.5px' }}
                py='5px'
                fontWeight='bold'
                borderRadius='sm'
                mb='0.5em'
              >
                How to use Pomodoro Timer
              </Tag>
              <OrderedList pl='1em' color='gray.600'>
                <ListItem>Decide on the task to be done</ListItem>
                <ListItem>
                  Set total sessions needed to be finished for the task above
                </ListItem>
                <ListItem>Work on the task</ListItem>
                <ListItem>
                  When a session is finished, take a short break
                </ListItem>
                <ListItem>
                  If you have finished 4 consecutive sessions, take a long break
                </ListItem>
                <ListItem>
                  Once the long break is finished, return to step 3 until the
                  task is finished
                </ListItem>
              </OrderedList>
              <Alert
                status='info'
                mt='0.5em'
                mb='1.5em'
                ml='1em'
                w='95%'
                py={{ base: '0.5em', md: '0.6em' }}
                borderRadius='md'
                bg='gray.200'
                color='gray.600'
                fontSize={{ base: '12px', md: '15px' }}
              >
                <AlertIcon color='gray.600' />
                Tips: You can customize the timer to adapt to your needs
              </Alert>
            </Box>

            <Divider my='0.8em' />

            <Box>
              <Tag
                bg='gray.400'
                fontSize={{ base: '14px', md: '15px', xl: '16.5px' }}
                py='5px'
                fontWeight='bold'
                borderRadius='sm'
                mb='0.5em'
              >
                Contact
              </Tag>
              <Text color='gray.600' pl='1em'>
                If you have any feedback or suggestions for new features, feel
                free to contact:{' '}
                <Text as='b' color='gray.700'>
                  tt.quang.186@gmail.com
                </Text>
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserManualModal;
