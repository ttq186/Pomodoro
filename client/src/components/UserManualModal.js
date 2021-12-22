import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from '@chakra-ui/react';
import { useDisclosure} from '@chakra-ui/react';

const UserManualModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mx={{ base: '0', md: '20px' }}
        variant='customize'
        bg='gray.200'
        color='gray.800'
        onClick={onOpen}
        borderRadius='3px'
        size='sm'
        px={{ base: '1em', md: '1.2em' }}
        fontSize={{ base: '14px', md: '15px' }}
      >
        How To Use
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent bg='gray.100'>
          <ModalHeader>How to use this app?</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
            nemo.
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserManualModal;
