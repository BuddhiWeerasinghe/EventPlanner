import {applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {createLogger} from 'redux-logger';

export const sagaMiddleware = createSagaMiddleware({
  onError: err => {
    console.log('saga middleware error ', err);
  },
});

const Logger = createLogger({
  collapsed: true,
  diff: true,
});

let middlewares = [Thunk, sagaMiddleware, reduxImmutableStateInvariant()];

if (__DEV__) {
  middlewares = [...middlewares, Logger];
}

export const appliedMiddleware = applyMiddleware(...middlewares);
