import {combineReducers} from 'redux';
import Common from './Common';

const combinedReducer = combineReducers({
  common: Common,
});

const rootReducer = (state, action) => {
  // if (action.type === LOG_OUT_REQUEST_OK) {
  //   delete state.common;
  // };
  return combinedReducer(state, action);
};

export default rootReducer;
