import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icons from '../../config/icons';
import {connect} from 'react-redux';
import {CHANGE_LOGGEDIN_STATUS} from '../../action-types';

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@firebase/auth';
import {FIREBASE_AUTH} from '../../config/Firebase';

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40%',
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
    lineHeight: 20,
  },
  textInputView: {
    marginTop: 50,
    marginRight: '10%',
    marginLeft: '10%',
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
    marginTop: 100,
    marginRight: '10%',
    marginLeft: '10%',
  },
  button: {
    marginTop: 20,
    borderRadius: 0,
    backgroundColor: '#DA5E42',
  },
  forgetBtnView: {
    alignItems: 'flex-end',
    marginRight: '10%',
    marginTop: 10,
  },
  forgetButton: {
    color: '#DA5E42',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    marginLeft: '10%',
  },
});

const LoginMain = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const auth = FIREBASE_AUTH;

  const login = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      ).then(() => navigation.navigate('home'));
    } catch (error) {
      setShowError(true);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMsg('Email already in use !');
          break;
        case 'auth/invalid-login-credentials':
          setErrorMsg('Invalid login credentials');
          break;
        default:
          setErrorMsg('Invalid login credentials');
      }
    }
  };

  const forgotPassword = async () => {
    try {
      const response = await sendPasswordResetEmail(auth, email);
      setShowError(true);
      setErrorMsg('Password reset link sent');
    } catch (error) {
      setShowError(true);
      switch (error.code) {
        case 'auth/missing-email':
          setErrorMsg('Please enter an email address');
          break;
        case 'auth/invalid-email':
          setErrorMsg('Please enter a valid address');
          break;
        default:
          setErrorMsg('Invalid email');
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.titleView}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.welcomeDesc}>Welcome to your Portal</Text>
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.textInputTitle}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={text => setEmail(text)}
          left={<TextInput.Icon icon={Icons.email} />}
          onFocus={() => setShowError(false)}
        />
        <Text style={styles.textInputTitle}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={secureEntry}
          left={<TextInput.Icon icon={Icons.lock} />}
          right={
            <TextInput.Icon
              icon={secureEntry ? Icons.closedEye : Icons.openEye}
              onPress={() => setSecureEntry(!secureEntry)}
              forceTextInputFocus={false}
            />
          }
          onFocus={() => setShowError(false)}
        />
      </View>
      {showError ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      <View style={styles.forgetBtnView}>
        <Button
          onPress={() => forgotPassword()}
          style={styles.forgetButton}
          textColor={'#DA5E42'}>
          Forgot password
        </Button>
      </View>
      <View style={styles.buttonView}>
        <Button mode="contained" onPress={() => login()} style={styles.button}>
          Login
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('signup');
          }}
          style={styles.button}>
          Sign Up
        </Button>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.common.isLoggedIn,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeProfileData: payload => {
      dispatch({type: CHANGE_LOGGEDIN_STATUS, payload: payload});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMain);
