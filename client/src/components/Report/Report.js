import { useRef } from 'react';
import { useSelector } from 'react-redux';
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
  Flex,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import ReportOverview from './ReportOverview';
import ReportRanking from './ReportRanking';
import ReportTasks from './ReportTasks';
import ReportMode from './ReportMode';

const Report = () => {
  const reportMode = useSelector((state) => state.report.reportMode);
  const size = useBreakpointValue({ base: 'lg', md: '2xl', xl: '4xl' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const overviewRef = useRef(null);
  const finishedTasksRef = useRef(null);
  const rankingRef = useRef(null);

  const mode = {
    isOverview: reportMode === 'OVERVIEW' ? true : false,
    isFinishedTasks: reportMode === 'FINISHED_TASKS' ? true : false,
    isRanking: reportMode === 'RANKING' ? true : false,
  };

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

      <Modal isOpen={isOpen} onClose={onClose} size={mode.isFinishedTasks ? '3xl' : '2xl'}>
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent>
          <ModalHeader px='1.2em' pt='1.3em'>
            <Flex
              justifyContent='space-around'
              px='1em'
              color='gray.600'
              fontSize='18px'
            >
              <ReportMode
                isActive={mode.isOverview}
                content='Overview'
                ref={overviewRef}
              />
              <ReportMode
                isActive={mode.isFinishedTasks}
                content='Finished Tasks'
                ref={finishedTasksRef}
              />
              <ReportMode
                isActive={mode.isRanking}
                content='Ranking'
                ref={rankingRef}
              />
            </Flex>
          </ModalHeader>

          <Divider />

          <ModalCloseButton />
          <ModalBody>
            {mode.isOverview ? (
              <ReportOverview />
            ) : mode.isFinishedTasks ? (
              <ReportTasks />
            ) : (
              <ReportRanking />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Report;
