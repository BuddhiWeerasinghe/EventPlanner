/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {collection, getDocs} from 'firebase/firestore';
import {connect} from 'react-redux';
import {
  checkAndRequestPermission,
  reportFirebaseNonFatalError,
  PERMISSION_CAMERA,
  PERMISSION_PHOTO,
} from '../../config/Utils';
import Icons from '../../config/icons';
import {CHANGE_PROFILE_DATA, CHANGE_PROFILE_PIC} from '../../action-types';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../../config/Firebase';

import {setDoc, doc} from '@firebase/firestore';

import {onAuthStateChanged} from '@firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E2E4',
    padding: 20,
  },
  chatIcon: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
  },
  infoTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 19,
    fontWeight: '600',
  },
  infoDesc: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  textInputView: {
    marginTop: 20,
    marginRight: '5%',
    marginLeft: '5%',
  },
  textInputTitle: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  textInput: {
    backgroundColor: '#FCF3F0',
  },
  iconImageStyle: {
    width: 20,
    height: 20,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: 20,
    borderRadius: 0,
  },
  welcomeTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    fontWeight: '600',
  },
  welcomeDesc: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 20,
    marginRight: '15%',
    marginLeft: '15%',
    textAlign: 'center',
  },
  cameraView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  cameraInnerView: {
    borderRadius: 60,
    width: 116,
    height: 116,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    resizeMode: 'stretch',
    borderWidth: 0.5,
  },
  profileIcon: {
    width: 116,
    height: 116,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    zIndex: 1000,
    position: 'absolute',
  },
});

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);

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
        setFirstName(item.firstName);
        setLastName(item.lastName);
        setEmail(item.email);
        setNumber(item.number);
        setAddress(item.address);
        setProfilePic(item.profilePic);
      }
    });
  };

  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.3,
      includeBase64: true,
    };

    const handleImageResponse = response => {
      if (response && response.assets[0].uri) {
        setProfilePic({
          uri: response.assets[0].uri,
        });
      }
    };
    Alert.alert('Select a Profile picture', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Take Photo...',
        onPress: () => {
          checkAndRequestPermission(PERMISSION_CAMERA, 'cameraGeneral').then(
            response => {
              if (response) {
                try {
                  launchCamera(options, handleImageResponse);
                } catch (err) {
                  reportFirebaseNonFatalError(
                    'verificationFailedTakePhoto',
                    err,
                  );
                }
              }
            },
          );
        },
      },
      {
        text: 'Choose from Library',
        onPress: () => {
          checkAndRequestPermission(PERMISSION_PHOTO, 'galleryGeneral').then(
            response => {
              if (response) {
                try {
                  launchImageLibrary(options, handleImageResponse);
                } catch (err) {
                  reportFirebaseNonFatalError(
                    'verificationFailedSelectPhoto',
                    err,
                  );
                }
              }
            },
          );
        },
      },
    ]);
  };

  const saveDetails = async () => {
    await setDoc(doc(FIRESTORE_DB, 'users', user && user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      number: number,
      address: address,
      userId: user && user.uid,
      profilePic: profilePic.uri,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.cameraView}>
        <TouchableOpacity
          style={styles.cameraInnerView}
          onPress={selectImage}
          disabled={!editing}>
          <Image style={styles.profileIcon} source={{uri: profilePic}} />
          {editing ? (
            <Image style={styles.cameraIcon} source={Icons.cameraBlank} />
          ) : null}
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.textInputView}>
          <Text style={styles.textInputTitle}>First name</Text>
          <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            editable={editing}
            disabled={!editing}
          />
          <Text style={styles.textInputTitle}>Last name</Text>
          <TextInput
            style={styles.textInput}
            value={lastName}
            onChangeText={text => setLastName(text)}
            editable={editing}
          />
          <Text style={styles.textInputTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
            editable={editing}
          />
          <Text style={styles.textInputTitle}>Phone number</Text>
          <TextInput
            style={styles.textInput}
            value={number}
            onChangeText={text => setNumber(text)}
            editable={editing}
          />
          <Text style={styles.textInputTitle}>Mailing address</Text>
          <TextInput
            style={styles.textInput}
            value={address}
            numberOfLines={4}
            onChangeText={text => setAddress(text)}
            editable={editing}
          />
        </View>
        <View style={styles.buttonView}>
          {editing ? (
            <Button
              mode="contained"
              onPress={() => {
                setEditing(false);
                saveDetails();
              }}
              buttonColor={'#DA5E42'}
              style={styles.button}>
              Save
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={() => {
                setEditing(true);
              }}
              buttonColor={'#DA5E42'}
              style={styles.button}>
              Edit
            </Button>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    profileData: state.common.profileData,
    profPic: state.common.profPic,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeProfileData: payload => {
      dispatch({type: CHANGE_PROFILE_DATA, payload: payload});
    },
    changeProfPic: payload => {
      dispatch({type: CHANGE_PROFILE_PIC, payload: payload});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
