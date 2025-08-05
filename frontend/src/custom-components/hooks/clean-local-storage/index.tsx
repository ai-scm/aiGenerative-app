import { signOut } from 'aws-amplify/auth';
import { useEffect } from 'react';

const useClearStorageOnUnloadSafe = () => {
  useEffect(() => {
    const clearStorageSelectively = () => {
      try {
        signOut({ global: true });

        console.log('Storage cleared selectively on page load');
      } catch (error) {
        console.error('Error clearing storage selectively:', error);
      }
    };

    clearStorageSelectively();
  }, []);
};

export default useClearStorageOnUnloadSafe;
