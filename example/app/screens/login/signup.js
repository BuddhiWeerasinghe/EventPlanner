import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icons from '../../config/icons';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../../config/Firebase';
import {createUserWithEmailAndPassword} from '@firebase/auth';
import {setDoc, doc} from '@firebase/firestore';

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
    marginTop: 60,
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
  },
});

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [secureEntryConf, setSecureEntryConf] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const auth = FIREBASE_AUTH;

  const signupToApp = async () => {
    if (password === passwordConf) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        ).then(() => navigation.navigate('uploadPhoto'));
        // navigation.navigate('login');
      } catch (error) {
        setShowError(true);
        switch (error.code) {
          case 'auth/missing-password':
            setErrorMsg('Please enter a password');
            break;
          case 'auth/missing-email':
          case 'auth/invalid-email':
            setErrorMsg('Please enter a valid email');
            break;
          case 'auth/weak-password':
            setErrorMsg('Please enter a strong password');
            break;
          default:
            setErrorMsg('Invalid email');
        }
      }
    } else {
      setShowError(true);
      setErrorMsg('Passwords are mismatched');
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.titleView}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeDesc}>Welcome to your Portal</Text>
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.textInputTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="Enter email"
            onChangeText={text => setEmail(text)}
            left={<TextInput.Icon icon={Icons.email} />}
            onFocus={() => setShowError(false)}
          />
          <Text style={styles.textInputTitle}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Password"
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
          <Text style={styles.textInputTitle}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Password"
            value={passwordConf}
            onChangeText={value => setPasswordConf(value)}
            secureTextEntry={secureEntryConf}
            left={<TextInput.Icon icon={Icons.lock} />}
            right={
              <TextInput.Icon
                icon={secureEntryConf ? Icons.closedEye : Icons.openEye}
                onPress={() => setSecureEntryConf(!secureEntryConf)}
                forceTextInputFocus={false}
              />
            }
          />
          {showError ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        </View>
        <View style={styles.buttonView}>
          <Button
            mode="contained"
            onPress={() => {
              signupToApp();
            }}
            style={styles.button}>
            Sign Up
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('login');
            }}
            style={styles.button}>
            Login
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.common.isLoggedIn,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
