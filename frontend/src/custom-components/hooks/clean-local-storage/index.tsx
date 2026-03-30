import { useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

const useClearStorageOnUnloadSafe = () => {
  useEffect(() => {
    const clearStorageSelectively = async () => {
      try {
        const isNewTab = !sessionStorage.getItem('tab_initialized');

        if (isNewTab) {
          localStorage.clear();
          sessionStorage.clear();

          sessionStorage.setItem('tab_initialized', 'true');

          document.cookie.split(';').forEach((c) => {
            document.cookie = c
              .replace(/^ +/, '')
              .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
          });

          try {
            await signOut({ global: true });
          } catch (e) {
            // Ignore signout errors if already signed out
          }

          console.log('Storage and cookies cleared, signed out because it is a new tab');
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
