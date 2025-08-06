import { useEffect } from 'react';
import { signOut } from 'aws-amplify/auth';

const useClearStorageOnUnloadSafe = () => {
  useEffect(() => {
    const clearStorageSelectively = async () => {
      try {
        const currentUrl = window.location.href;
        const originalReplace = window.location.replace;
        window.location.replace = () => {}; 
        await signOut({ global: true });
        window.location.replace = originalReplace;
        window.history.replaceState(null, '', currentUrl);

        console.log('Storage cleared without redirect');
      } catch (error) {
        console.error('Error clearing storage selectively:', error);
      }
    };

    clearStorageSelectively();
  }, []);
};

export default useClearStorageOnUnloadSafe;
