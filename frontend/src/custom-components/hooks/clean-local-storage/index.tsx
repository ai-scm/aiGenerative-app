import { useEffect } from 'react';

/**
 * Hook alternativo que limpia el storage de forma más selectiva
 * Preserva datos críticos de autenticación pero limpia datos de sesión temporales
 */
const useClearStorageOnUnloadSafe = () => {
   useEffect(() => {
    const clearStorageSelectively = () => {
      try {
        // Si realmente quieres saltarte la limpieza en caso de flujo de autenticación, déjalo comentado
        // const searchParams = new URLSearchParams(window.location.search);
        // const hasAuthParams =
        //   searchParams.has('code') ||
        //   searchParams.has('state') ||
        //   searchParams.has('id_token') ||
        //   searchParams.has('access_token');

        // if (hasAuthParams) {
        //   console.log('Auth flow detected, skipping storage clear');
        //   return;
        // }

        const keysToPreserve = [
          'amplify-authenticator-state',
          'amplify-signin-with-hostedUI',
          'url_redireccion',
        ];

        // const cognitoKeys = Object.keys(localStorage).filter((key) =>
        //   key.startsWith('CognitoIdentityServiceProvider')
        // );

        const allKeysToPreserve = [...keysToPreserve];

        Object.keys(localStorage).forEach((key) => {
          if (!allKeysToPreserve.some((preserveKey) => key.includes(preserveKey))) {
            localStorage.removeItem(key);
          }
        });

        Object.keys(sessionStorage).forEach((key) => {
          if (!allKeysToPreserve.some((preserveKey) => key.includes(preserveKey))) {
            sessionStorage.removeItem(key);
          }
        });

        console.log('Storage cleared selectively on page load');
      } catch (error) {
        console.error('Error clearing storage selectively:', error);
      }
    };

    clearStorageSelectively();
  }, []);
};

export default useClearStorageOnUnloadSafe;