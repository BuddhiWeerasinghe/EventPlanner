/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
import RootNavigation from '../config/rootNavigation';

const Root = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <RootNavigation />
    </View>
  );
};
export default Root;
