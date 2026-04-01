import { useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

const useClearStorageOnUnloadSafe = () => {
  useEffect(() => {
    const clearStorageSelectively = async () => {
      console.log('clearStorageSelectively');
      try {

        let isNewTab = false

        if (!sessionStorage.getItem('new_tab')) {
          isNewTab = true;
          await sessionStorage.setItem('new_tab', 'true');
        }
        console.log('isNewTab', isNewTab);

        if (isNewTab) {



          sessionStorage.setItem('tab_initialized', 'true');


          await signOut();

          console.log('Storage and cookies cleared, signed out because it is a new tab');
          await sessionStorage.setItem('new_tab', 'false');
          return;
        }

        try {
          await getCurrentUser();
          return;
        } catch {
          // No active session found, proceed to clean up storage
        }

        const currentUrl = window.location.href;
        const originalReplace = window.location.replace;
        window.location.replace = () => { };
        try {
          await signOut({ global: true });
        } catch (e) {
          // Ignore signout errors if already signed out
        }
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
