/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import Icons from '../config/icons';
import Modal from 'react-native-modal';
import {CHANGE_DRAWER} from '../action-types';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../config/Firebase';
import {onAuthStateChanged} from '@firebase/auth';
import {collection, getDocs} from '@firebase/firestore';

const headerBoxHeight = 120;
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  header: {
    height: headerBoxHeight,
    paddingTop: 20,
    backgroundColor: '#FCF3F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 70,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerDetail: {flex: 1},
  headerClose: {
    marginTop: -40,
    width: 50,
  },
  rightNav: {
    flexDirection: 'row',
  },
  navItem: {
    marginLeft: 25,
  },
  body: {
    height: height - (headerBoxHeight + 75),
    backgroundColor: '#FFFFFF',
  },
  footer: {
    backgroundColor: '#FCF3F0',
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  menuItem: {
    marginTop: 5,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatview: {
    alignItems: 'center',
  },
  flatlistItem: {
    marginHorizontal: 10,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    marginLeft: 10,
    width: 24,
    height: 24,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#880066',
  },
  closeButton: {
    width: 30,
    height: 30,
  },
  appVersionTxt: {
    marginLeft: 20,
    fontSize: 12,
  },
  deviceIdTxt: {
    marginLeft: 20,
    fontSize: 12,
  },
  userTxt: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000000',
  },
  userNumberTxt: {
    fontWeight: 'bold',
    color: '#000000',
  },
  userProfileTxt: {
    marginTop: 5,
  },
  listItemTxt: {
    color: '#000000',
    fontSize: 15,
  },
  modalContainer: {
    margin: 0,
    width: '60%',
    height: '100%',
    alignItems: undefined,
    justifyContent: undefined,
  },
});

const MyDrawer = props => {
  const {hideDrawer, drawer} = props;
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, users => {
      setUser(users);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    const users = collection(FIRESTORE_DB, 'users');
    const usersSnapshot = await getDocs(users);
    const usersList = usersSnapshot.docs.map(doc => doc.data());

    usersList.map(item => {
      if (item.userId === user.uid) {
        setName(item.firstName + ' ' + item.lastName);
        setEmail(item.email);
        setProfilePic(item.profilePic);
      }
    });
  };

  useEffect(() => {
    if (drawer) {
      setVisible(drawer.visible);
    }
  }, [drawer]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const logout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out from Event Planner?',
      [
        {
          text: 'OK',
          onPress: () => FIREBASE_AUTH.signOut(),
          style: 'cancel',
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  };

  const menuList = [
    {
      iconUrl: Icons.camera,
      title: 'Logout',
      action: logout,
    },
  ];

  return visible ? (
    <Modal
      useNativeDriver={true}
      animationType={'slide'}
      isVisible={visible}
      style={styles.modalContainer}
      onBackButtonPress={() => hideDrawer()}
      onBackdropPress={() => hideDrawer()}
      onSwipeComplete={() => hideDrawer()}
      swipeDirection="left">
      <View>
        <TouchableOpacity>
          <View style={styles.header}>
            <View style={styles.headerImage}>
              <Image style={styles.profileImage} source={{uri: profilePic}} />
            </View>
            <View style={styles.headerDetail}>
              <Text style={styles.userTxt} fontWeight="medium">
                {name}
              </Text>
              <Text style={styles.userNumberTxt}>{email}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <FlatList
          style={styles.body}
          data={menuList}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              //accessibilityLabel={`btn-hamburger-${index}`}
              key={`${index}`}
              style={styles.flatlistItem}>
              <Image style={styles.tinyLogo} source={item.iconUrl} />
              <TouchableOpacity style={styles.menuItem} onPress={item.action}>
                <Text style={styles.listItemTxt}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          initialNumToRender={menuList.length}
        />
        <View style={styles.footer}>
          <Text style={styles.appVersionTxt}>{'Version 0.0.1'}</Text>
        </View>
      </View>
    </Modal>
  ) : null;
};

const mapStateToProps = state => {
  return {
    drawer: state.common.drawerConfig,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    hideDrawer: () => {
      dispatch({type: CHANGE_DRAWER, payload: {visible: false}});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDrawer);
