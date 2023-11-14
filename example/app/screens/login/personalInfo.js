import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {CHANGE_LOGGEDIN_STATUS, CHANGE_PROFILE_DATA} from '../../action-types';
import {connect} from 'react-redux';
import {setDoc, doc} from '@firebase/firestore';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../../config/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {onAuthStateChanged} from '@firebase/auth';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  titleView: {
    marginLeft: '5%',
    marginTop: '10%',
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
    width: '48%',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: 20,
    borderRadius: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    // marginLeft: '10%',
  },
});

const PersonalInfo = ({
  navigation,
  route,
  changeProfileData,
  changeLoggedInStatus,
}) => {
  const {profilePic} = route.params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showNumberError, setShowNumberError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, users => {
      setUser(users);
    });
  }, []);

  const validateEmail = () => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (regEmail.test(email) === false) {
      setShowEmailError(true);
    }
  };

  const validateNumber = () => {
    let regNumber = /^[0]?[789]\d{8}$/;
    if (regNumber.test(number) === false) {
      setShowNumberError(true);
    }
  };

  const saveDetails = async () => {
    await setDoc(doc(FIRESTORE_DB, 'users', user && user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      number: number,
      address: address,
      profilePic: profilePic.uri,
      userId: user && user.uid,
    });
    AsyncStorage.setItem('LOGGEDIN', true);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.titleView}>
        <Text style={styles.infoTitle}>Personal info</Text>
        <Text style={styles.infoDesc}>
          You can add your personal data now or do it later
        </Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.textInputView}>
          <Text style={styles.textInputTitle}>First name</Text>
          <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <Text style={styles.textInputTitle}>Last name</Text>
          <TextInput
            style={styles.textInput}
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <Text style={styles.textInputTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => setShowEmailError(false)}
            onBlur={() => validateEmail()}
          />
          {showEmailError ? (
            <Text style={styles.errorText}>{'Enter a valid email'}</Text>
          ) : null}
          <Text style={styles.textInputTitle}>Phone number</Text>
          <TextInput
            style={styles.textInput}
            value={number}
            onChangeText={text => setNumber(text)}
            onFocus={() => setShowNumberError(false)}
            onBlur={() => validateNumber()}
          />
          {showNumberError ? (
            <Text style={styles.errorText}>
              {'Enter a valid telephone number'}
            </Text>
          ) : null}
          <Text style={styles.textInputTitle}>Mailing address</Text>
          <TextInput
            style={styles.textInput}
            value={address}
            numberOfLines={4}
            onChangeText={text => setAddress(text)}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.goBack();
            }}
            textColor={'black'}
            buttonColor={'#FCF3F0'}
            style={styles.button}>
            Back
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              saveDetails();
              navigation.navigate('home');
            }}
            buttonColor={'#DA5E42'}
            disabled={
              firstName === '' ||
              lastName === '' ||
              email === '' ||
              number === '' ||
              address === '' ||
              showEmailError ||
              showNumberError
            }
            style={styles.button}>
            Next
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profileData: state.common.profileData,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeProfileData: payload => {
      dispatch({type: CHANGE_PROFILE_DATA, payload: payload});
    },
    changeLoggedInStatus: payload => {
      dispatch({type: CHANGE_LOGGEDIN_STATUS, payload: payload});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
