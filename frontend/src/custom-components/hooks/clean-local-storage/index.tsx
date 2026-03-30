import { useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

const useClearStorageOnUnloadSafe = () => {
  useEffect(() => {
    const clearStorageSelectively = async () => {
      try {
        try {
          await getCurrentUser();
          return;
        } catch {
          // No active session found, proceed to clean up storage
        }

        const currentUrl = window.location.href;
        const originalReplace = window.location.replace;
        window.location.replace = () => { };
        await signOut({ global: true });
        window.location.replace = originalReplace;
        window.history.replaceState(null, '', currentUrl);

        console.log('Storage cleared because no active session was found');
      } catch (error) {
        console.error('Error clearing storage selectively:', error);
      }
    };

    clearStorageSelectively();
  }, []);
};

export default useClearStorageOnUnloadSafe;
