import { Flex, Box, Text, Image } from '@chakra-ui/react';

const ActivityOverview = ({ icon, detail, content }) => {
  return (
    <Box
      bg='gray.500'
      w={{ base: '28vw', sm: '29%', xl: '28%' }}
      px={{ base: '0.4em', md: '1em' }}
      borderRadius={{ base: '5', md: 'md' }}
      fontWeight='bold'
    >
      <Flex d='flex' justifyContent='space-between'>
        <Image
          src={icon}
          w={{ base: '22px', sm: '28px', md: '35px', lg: '40px' }}
        />
        <Text
          fontSize={{ base: '6vw', md: '30px', lg: '32px' }}
          m='0.3em'
          color='gray.100'
        >
          {detail}
        </Text>
      </Flex>
      <Text
        color='gray.200'
        float='right'
        mt='-0.5em'
        mb='0.5em'
        fontSize={{
          base: '2.6vw',
          sm: '12px',
          md: '13px',
          lg: '14px',
          xl: '16px',
        }}
      >
        {content}
      </Text>
    </Box>
  );
};

export default ActivityOverview;
