import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import ReportOverview from './ReportOverview';
import ReportRanking from './ReportRanking';
import ReportTasks from './ReportTasks';

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
        fontSize={{ base: '14px', sm: '16px' }}
        h={{ base: '30px', md: '38px' }}
      >
        Report
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent>
          <ModalHeader px='1.2em' pt='1.3em'>
            <Flex
              justifyContent='space-around'
              px='1em'
              color='gray.600'
              fontSize='18px'
            >
              <Box
                border='1px'
                px='1.5em'
                borderRadius='4'
                cursor='pointer'
                bg='gray.600'
                color='gray.100'
              >
                Overview
              </Box>
              <Box border='1px' px='1.5em' borderRadius='4' cursor='pointer'>
                Finished Tasks
              </Box>
              <Box border='1px' px='1.5em' borderRadius='4' cursor='pointer'>
                Ranking
              </Box>
            </Flex>
          </ModalHeader>

          <Divider />

          <ModalCloseButton />
          <ModalBody>
            {/* <ReportTasks /> */}
            {/* <ReportRanking /> */}
            <ReportOverview />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Report;
