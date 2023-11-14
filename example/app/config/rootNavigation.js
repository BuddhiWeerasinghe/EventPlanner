import React, {useEffect, useState} from 'react';
import MainNavigation from './NavigationStack';
import AuthNavigation from './AuthStack';
import {onAuthStateChanged} from '@firebase/auth';
import {FIREBASE_AUTH} from './Firebase';

const RootNavigation = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, users => {
      setUser(users);
    });
  }, []);

  if (user) {
    return <MainNavigation />;
  } else {
    return <AuthNavigation />;
  }
};
export default RootNavigation;
