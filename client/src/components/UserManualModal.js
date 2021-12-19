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
import { useDisclosure, useBreakpointValue } from '@chakra-ui/react';

const UserManualModal = () => {
  const size = useBreakpointValue({ base: 'xs', sm: 'sm', lg: 'md' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mx={{ base: '10px', md: '20px' }}
        variant='customize'
        bg='gray.200'
        color='gray.800'
        onClick={onOpen}
        borderRadius='3px'
        size={size}
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
