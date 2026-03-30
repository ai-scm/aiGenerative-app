import { useEffect } from 'react';
import { signOut } from 'aws-amplify/auth';

const isNewTab = !sessionStorage.getItem('tab_session_initialized');

if (isNewTab) {
  sessionStorage.setItem('tab_session_initialized', 'true');
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('CognitoIdentityServiceProvider')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));

  // Limpiar cookies por si la sesión de Amplify o el proveedor se está guardando ahí
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
}

const useClearStorageOnUnloadSafe = () => {
  useEffect(() => {
    if (isNewTab) {
      const clearStorageSelectively = async () => {
        try {
          console.log('Forcing full signOut due to new tab...');
          // Permite que Amplify haga la redirección a Cognito para destruir la cookie de SSO globalmente
          await signOut({ global: true });
        } catch (error) {
          console.error('Error clearing storage selectively:', error);
        }
      };

      clearStorageSelectively();
    }
  }, []);
};

export default useClearStorageOnUnloadSafe;
