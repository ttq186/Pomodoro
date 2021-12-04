import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        customize: {
          borderRadius: '4px',
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

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
