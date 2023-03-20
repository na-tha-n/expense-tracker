import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react'

import App from './src';
import { store, persistor } from './src/store'
import { theme } from './src/common/theme';
import { injectStore } from './src/common/api';
import { name as appName } from './app.json';

// Set Authorization Header
injectStore(store);

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
