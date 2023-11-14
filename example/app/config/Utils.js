import React from 'react';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings';
import {Alert, PermissionsAndroid, Platform, Linking} from 'react-native';

export const PERMISSION_CAMERA = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
});
export const PERMISSION_CONTACT = Platform.select({
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
  ios: PERMISSIONS.IOS.CONTACTS,
});
export const PERMISSION_LOCATION = Platform.select({
  android: [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  ],
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
});
export const PERMISSION_PHOTO = Platform.select({
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
});
export const PERMISSION_CAMERA_AND_PHOTO = ['camera', 'photo'];

export const checkAndRequestPermission = async (
  permission,
  feature,
  onPermissionResolutionCancel = () => {},
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const _getPermissionLocalization = (feature, type) => {
        return {
          title:
            type === 'explanation'
              ? 'permission.' + feature + 'ExplanationTitle'
              : 'permission.' + feature + 'ResolutionTitle',
          body:
            type === 'explanation'
              ? 'permission.' + feature + 'ExplanationBody'
              : 'permission.' + feature + 'ResolutionBody',
        };
      };

      const showPermissionResolution = msg => {
        Alert.alert('Permission', 'Please grant permission', [
          {
            text: 'Cancel',
            onPress: () => onPermissionResolutionCancel,
            style: 'cancel',
          },
          {text: 'OK', onPress: () => openDeviceSetting('APP_SETTING')},
        ]);
      };

      const showPermissionExplanation = (msg, permission) => {
        const doNothing = () => {};
        Alert.alert('Permission', 'Please grant permission', [
          {
            text: 'Cancel',
            onPress: doNothing,
            style: 'cancel',
          },
          {text: 'OK', onPress: () => requestPermission(permission)},
        ]);
      };

      const requestPermission = async permission => {
        let permissionResponse = false;
        if (Array.isArray(permission) && permission.length > 1) {
          let allPermissions = [];
          for (const perm of permission) {
            let result = 'false';

            const granted = await PermissionsAndroid.request(perm);

            if (granted === PermissionsAndroid.RESULTS.GRANTED || granted) {
              result = 'true';
            }

            allPermissions.push(result);
          }
          permissionResponse = allPermissions.every(
            (el, index, arr) => el === 'true',
          );
        } else if (permission === PERMISSION_CAMERA_AND_PHOTO) {
          let itemPermission = [];
          const resultCamera = await request(PERMISSION_CAMERA);
          itemPermission.push(resultCamera === RESULTS.GRANTED);

          const resultPhoto = await request(PERMISSION_PHOTO);
          itemPermission.push(resultPhoto === RESULTS.GRANTED);

          permissionResponse = itemPermission.every(Boolean);
        } else {
          await request(permission)
            .then(response => {
              permissionResponse = response === RESULTS.GRANTED;
            })
            .catch(err => {
              throw err;
            });
        }

        if (permissionResponse) {
          resolve(true);
        } else {
          let msg = _getPermissionLocalization(feature, 'resolution');
          showPermissionResolution(msg);
        }
      };

      let hasPermission = false;
      if (
        !Array.isArray(permission) &&
        typeof permission === 'object' &&
        permission.length &&
        permission.length > 1
      ) {
        let itemPermission = [];
        Promise.all([check(PERMISSION_CAMERA), check(PERMISSION_PHOTO)]).then(
          ([resultCamera, resultPhoto]) => {
            itemPermission.push(resultCamera === RESULTS.GRANTED);
            itemPermission.push(resultPhoto === RESULTS.GRANTED);
          },
        );
        hasPermission = itemPermission.every(Boolean);
      } else if (Array.isArray(permission) && permission.length > 0) {
        let itemPermissions = [];
        for (const perm of permission) {
          const granted = await PermissionsAndroid.check(perm);
          let result = 'false';

          if (granted === PermissionsAndroid.RESULTS.GRANTED || granted) {
            result = 'true';
          }
          itemPermissions.push(result);
        }

        hasPermission = itemPermissions.every(
          (el, index, arr) => el === 'true',
        );
      } else {
        await check(permission)
          .then(result => {
            hasPermission = result === RESULTS.GRANTED;
          })
          .catch(err => {
            throw err;
          });
      }

      if (hasPermission) {
        resolve(true);
      } else {
        let msg = _getPermissionLocalization(feature, 'explanation');
        showPermissionExplanation(msg, permission);
      }
    } catch (error) {
      console.log(
        'PERMISSION REQUEST :: error while requesting ' + permission,
        error,
      );
      resolve(false);
    }
  });
};

/**
 * This will open the relevant device setting if it is possible.
 * `settingName` the setting name need to be opened (Must be declared in settings.js and use the imports)
 *
 * @param {string} settingName
 */
export const openDeviceSetting = async settingName => {
  try {
    if (Platform.OS === 'android') {
      if (settingName === 'APP_SETTING') {
        AndroidOpenSettings.appDetailsSettings();
      } else if (settingName === 'APP_SECURITY_SETTING') {
        AndroidOpenSettings.securitySettings();
      }
    } else if (Platform.OS == 'ios') {
      // For the moment iOS only support to open the general settings screen only
      Linking.openURL('app-settings:');
    }
  } catch (error) {
    console.log(
      'OPEN SETTING :: Error while opening setting : ' +
        settingName +
        ' - ' +
        error,
    );
  }
};
