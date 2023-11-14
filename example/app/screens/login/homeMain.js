import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
const {width} = Dimensions.get('window');
import {connect} from 'react-redux';
import Icons from '../../config/icons';
import MyDrawer from '../../components/MyDrawer';
import {CHANGE_DRAWER} from '../../action-types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import events from './events';
import profile from './profile';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bannerView: {
    flexDirection: 'row',
    height: 200,
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bannerCountView: {
    position: 'absolute',
    top: 150,
    left: width - 60,
    backgroundColor: 'white',
  },
  bannerCountText: {
    padding: 5,
  },
  selfActTileImgIco: {
    // overflow: 'hidden',
    width: width,
    height: 200,
  },
  titleView: {
    marginLeft: '5%',
    marginTop: '10%',
  },
  infoTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
  },
  infoDesc: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  organizersView: {
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: 20,
  },
  organizersTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  orgOuterView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 15,
    borderBottomWidth: 0.5,
  },
  orgDetailView: {
    flex: 1,
    flexDirection: 'row',
  },
  orgImageView: {
    marginRight: 20,
  },
  orgName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  orgEmail: {
    fontSize: 14,
  },
  profPicIcon: {
    width: 44,
    height: 44,
  },
  chatIcon: {
    width: 36,
    height: 36,
  },
  photosView: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    borderBottomWidth: 0.5,
  },
  photoOuterView: {
    width: 244,
  },
  photoView: {
    marginTop: 10,
    borderWidth: 0.5,
  },
  photosTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photosTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },
  photoImage: {
    width: 244,
    height: 130,
  },
  photoTextView: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 170,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  photoDesc: {
    fontSize: 14,
    marginTop: 10,
  },
  postsView: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    borderWidth: 0.3,
  },
  postCount: {
    fontSize: 19,
    color: '#DA5E42',
    fontWeight: '600',
  },
  postDesc: {
    alignSelf: 'center',
  },
});

const HomeMain = props => {
  const {navigation, showDrawer} = props;

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.root}>
      <Tab.Navigator>
        <Tab.Screen name="Events" component={events} />
        <Tab.Screen name="Profile" component={profile} />
        <Tab.Screen
          name="MyDrawer"
          component={MyDrawer}
          listeners={({navigation1}) => ({
            tabPress: e => {
              e.preventDefault();
              showDrawer();
            },
          })}
        />
      </Tab.Navigator>
      <MyDrawer navigation={navigation} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    imageList: state.common.imageList,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    showDrawer: () => {
      dispatch({type: CHANGE_DRAWER, payload: {visible: true}});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMain);
