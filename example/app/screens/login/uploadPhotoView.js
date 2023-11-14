import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {connect} from 'react-redux';
import {
  checkAndRequestPermission,
  reportFirebaseNonFatalError,
  PERMISSION_CAMERA,
  PERMISSION_PHOTO,
} from '../../config/Utils';
import {CHANGE_PROFILE_PIC} from '../../action-types';
import Icons from '../../config/icons';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
    marginTop: 20,
    marginRight: '15%',
    marginLeft: '15%',
    textAlign: 'center',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: '10%',
    marginLeft: '10%',
    marginBottom: 20,
  },
  button: {
    marginTop: 40,
    borderRadius: 0,
    backgroundColor: '#DA5E42',
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
    overflow: 'hidden',
    borderWidth: 0.5,
  },
  cameraIcon: {
    width: 116,
    height: 116,
  },
});

const UploadPhotoMain = ({navigation, changeProfilePic, profileData}) => {
  const [profilePic, setProfilePic] = useState(Icons.profPic);

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

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.titleView}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.welcomeDesc}>
          You are logged in for the first time and can upload a profile photo
        </Text>
      </View>
      <View style={styles.cameraView}>
        <TouchableOpacity style={styles.cameraInnerView} onPress={selectImage}>
          <Image style={styles.cameraIcon} source={profilePic} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('personalInfo', {profilePic: profilePic});
          }}
          style={styles.button}>
          Next
        </Button>
      </View>
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
    changeProfilePic: payload => {
      dispatch({type: CHANGE_PROFILE_PIC, payload: payload});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPhotoMain);
