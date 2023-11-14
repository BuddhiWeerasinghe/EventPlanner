import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Root from './app/screens/Root';
import {enableScreens} from 'react-native-screens';
import configureStore from './app/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';

enableScreens();
const {store, persistor} = configureStore();
global.store = store;
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

const App = () => {
  return (
    <Provider store={global.store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <View style={styles.rootView}>
              <Root />
            </View>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
