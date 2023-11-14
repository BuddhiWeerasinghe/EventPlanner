// configureStore.js
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encryptTransform} from 'redux-persist-transform-encrypt';

import RootReducer from './reducers';
import {appliedMiddleware, sagaMiddleware} from './middlewares';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: null,
  whitelist: [
    'dashboardInfo',
    'profile',
    'localize',
    'appSettings',
    'userAuth',
  ],
  transforms: [
    encryptTransform({
      secretKey: '375i4lg58uxk37',
      onError: function (error) {
        console.log(
          'REDUX STORE :: error while setting encryption transformer',
          error,
        );
      },
    }),
  ],
};

export default function configureStore() {
  const persistedReducer = persistReducer(persistConfig, RootReducer);
  const store = createStore(
    persistedReducer,
    composeWithDevTools(appliedMiddleware),
  );
  const persistor = persistStore(store);
  return {store, persistor};
}
