import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Box,
  Square,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const UserManualModal = () => {
  const size = useBreakpointValue({ base: 'lg', md: '2xl', xl: '4xl' });
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
        <ModalContent top={{ base: '0', sm: '10%', md: '20%' }} w='90%'>
          <ModalHeader>
            This app applies the Pomodoro technique, which improves your
            productivity
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            aperiam possimus provident sit expedita quis sunt consequuntur
            maxime tempora adipisci eum, amet quaerat qui id soluta! Quidem,
            saepe. Earum, cupiditate. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsum aperiam possimus provident sit expedita quis
            sunt consequuntur maxime tempora adipisci eum, amet quaerat qui id
            soluta! Quidem, saepe. Earum, cupiditate. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ipsum aperiam possimus provident sit
            expedita quis sunt consequuntur maxime tempora adipisci eum, amet
            quaerat qui id soluta! Quidem, saepe. Earum, cupiditate. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Ipsum aperiam possimus
            provident sit expedita quis sunt consequuntur maxime tempora
            adipisci eum, amet quaerat qui id soluta! Quidem, saepe. Earum,
            cupiditate.
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserManualModal;
