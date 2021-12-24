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
        mx={{ base: '10px', md: '20px' }}
        mr={{ base: '20px', sm: '0' }}
        variant='customize'
        bg='gray.600'
        onClick={onOpen}
        size='sm'
        px={{ base: '1em', md: '1.2em' }}
        fontSize={{ base: '14px', md: '15px' }}
        h='35px'
      >
        Report
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

export default Report;
