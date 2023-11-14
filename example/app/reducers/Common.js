import {
  CHANGE_DRAWER,
  CHANGE_PROFILE_DATA,
  CHANGE_LOGGEDIN_STATUS,
  CHANGE_PROFILE_PIC,
} from '../action-types';
import icons from '../config/icons';

const initialState = {
  profileData: {
    firstName: '',
    lastName: '',
    email: '',
    telNumber: '',
    address: '',
  },
  profPic: icons.profPic,
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DRAWER:
      return {...state, drawerConfig: action.payload};
    case CHANGE_PROFILE_DATA:
      return {...state, profileData: action.payload};
    case CHANGE_PROFILE_PIC:
      return {...state, profPic: action.payload};
    case CHANGE_LOGGEDIN_STATUS:
      return {...state, isLoggedIn: action.payload};
    default:
      return state;
  }
};
