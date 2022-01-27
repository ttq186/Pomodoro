import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  components: {
    Button: {
      variants: {
        customize: {
          borderRadius: '3px',
          _hover: {
            boxShadow: '0 0 1px 2px #E2E8F0, 0 1px 1px #E2E8F0',
          },
        },
      },
    },
  },
  shadows: {
    outline: 'none',
  },
});

export default customTheme;
