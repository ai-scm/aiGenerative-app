import { useEffect } from 'react';

/**
 * Hook alternativo que limpia el storage de forma más selectiva
 * Preserva datos críticos de autenticación pero limpia datos de sesión temporales
 */
const useClearStorageOnUnloadSafe = () => {
  useEffect(() => {
    const clearStorageSelectively = () => {
      try {
        // Verificar si estamos en un flujo de autenticación
        const searchParams = new URLSearchParams(window.location.search);
        const hasAuthParams = searchParams.has('code') || 
                             searchParams.has('state') || 
                             searchParams.has('id_token') ||
                             searchParams.has('access_token');
        
        if (hasAuthParams) {
          console.log('Auth flow detected, skipping storage clear');
          return;
        }

        // En lugar de limpiar todo, solo limpiar datos específicos que no sean críticos para auth
        const keysToPreserve = [
          'amplify-authenticator-state',
          'amplify-signin-with-hostedUI',
          // Preservar claves de Cognito
        ];

        // Obtener todas las claves de Cognito para preservarlas
        const cognitoKeys = Object.keys(localStorage).filter(key => 
          key.startsWith('CognitoIdentityServiceProvider')
        );

        const allKeysToPreserve = [...keysToPreserve, ...cognitoKeys];

        // Limpiar localStorage selectivamente
        Object.keys(localStorage).forEach(key => {
          if (!allKeysToPreserve.some(preserveKey => key.includes(preserveKey))) {
            localStorage.removeItem(key);
          }
        });

        // Limpiar sessionStorage selectivamente
        Object.keys(sessionStorage).forEach(key => {
          if (!allKeysToPreserve.some(preserveKey => key.includes(preserveKey))) {
            sessionStorage.removeItem(key);
          }
        });

        console.log('Storage cleared selectively on page unload');
      } catch (error) {
        console.error('Error clearing storage selectively:', error);
      }
    };

    // Solo usar 'unload' para evitar interferir con navegación
    window.addEventListener('unload', clearStorageSelectively);

    return () => {
      window.removeEventListener('unload', clearStorageSelectively);
    };
  }, []);
};

export default useClearStorageOnUnloadSafe;
