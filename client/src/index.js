import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import store from './store';
import customTheme from './customTheme';

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();