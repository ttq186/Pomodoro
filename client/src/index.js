import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

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
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
);
