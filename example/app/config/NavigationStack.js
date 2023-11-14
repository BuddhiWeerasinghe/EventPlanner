import React, { useEffect } from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import UploadPhoto from '../screens/login/uploadPhotoView';

import home from '../screens/login/homeMain';
import PersonalInfo from '../screens/login/personalInfo';
import Comments from '../screens/login/comments';
import Posts from '../screens/login/posts';
import Photos from '../screens/login/photos';
import Profile from '../screens/login/profile';
import Events from '../screens/login/events';

export const signedInScreens = {
  home: {screen: home},
  events: {screen: Events},
  personalInfo: {screen: PersonalInfo},
  uploadPhoto: {screen: UploadPhoto},
  comments: {screen: Comments},
  posts: {screen: Posts},
  photos: {screen: Photos},
  profile: {screen: Profile},
};

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  let screens = [];
  for (let key in signedInScreens) {
    if (signedInScreens.hasOwnProperty(key)) {
      screens.push(
        <Stack.Screen
          key={key}
          name={key}
          component={signedInScreens[key].screen}
        />,
      );
    }
  }

  return (
    <Stack.Navigator
      initialRouteName={'uploadPhoto'}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {screens}
    </Stack.Navigator>
  );
};
export default MainNavigation;
