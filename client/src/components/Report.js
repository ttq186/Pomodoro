import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const Report = () => {
  const size = useBreakpointValue({ base: 'lg', md: '2xl', xl: '4xl' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mr={{ base: '0.8em', sm: '1em' }}
        variant='customize'
        bg='gray.600'
        onClick={onOpen}
        size='sm'
        px={{ base: '0.5em', md: '1.2em' }}
        fontSize={{ base: '14px', sm: '15px' }}
        h='35px'
      >
        Report
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent top={{ base: '0', sm: '10%', md: '20%' }} w='90%'>
          <ModalHeader>Coming soon...</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody py='100px'></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Report;
