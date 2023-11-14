import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, users => {
      if (users) {
        setUser(users);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}
