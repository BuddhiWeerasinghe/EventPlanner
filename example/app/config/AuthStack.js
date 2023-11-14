import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LoginMain from '../screens/login/loginMain';
import Signup from '../screens/login/signup';

export const signedInScreens = {
  login: {screen: LoginMain},
  signup: {screen: Signup},
};

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
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
      initialRouteName={'login'}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {screens}
    </Stack.Navigator>
  );
};
export default AuthNavigation;
