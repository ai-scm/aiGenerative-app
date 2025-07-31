import { useEffect, useRef } from 'react';

/**
 * Hook que limpia el localStorage y sessionStorage cuando se cierra la página
 * Solo se activa después de un período de gracia para no interferir con la autenticación OIDC
 */
const useClearStorageOnUnload = () => {
  const isAuthenticatedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const clearStorage = () => {
      try {
        // Verificar si estamos en un flujo de autenticación activo
        const searchParams = new URLSearchParams(window.location.search);
        const hasAuthParams = searchParams.has('code') || 
                             searchParams.has('state') || 
                             searchParams.has('id_token') ||
                             searchParams.has('access_token');
        
        // Si hay parámetros de autenticación, no limpiar
        if (hasAuthParams) {
          console.log('Auth parameters detected, skipping storage clear');
          return;
        }

        // Verificar si hay procesos de autenticación activos
        const hasActiveAuthFlow = localStorage.getItem('amplify-signin-with-hostedUI') ||
                                 sessionStorage.getItem('amplify-signin-with-hostedUI');

        if (hasActiveAuthFlow) {
          console.log('Active auth flow detected, skipping storage clear');
          return;
        }

        // Solo limpiar si hemos pasado el período de gracia
        if (!isAuthenticatedRef.current) {
          console.log('Grace period active, skipping storage clear');
          return;
        }

        // Limpiar storage
        localStorage.clear();
        sessionStorage.clear();
        console.log('Storage cleared on page unload');
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    };

    // Configurar un período de gracia de 5 segundos después del montaje del componente
    timeoutRef.current = setTimeout(() => {
      isAuthenticatedRef.current = true;
      console.log('Grace period ended, storage clearing enabled');
    }, 5000);

    // Event listener para cuando la página se descarga
    window.addEventListener('unload', clearStorage);

    // Event listener para cambios de visibilidad (cuando se cierra la pestaña)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearStorage();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('unload', clearStorage);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};

export default useClearStorageOnUnload;
