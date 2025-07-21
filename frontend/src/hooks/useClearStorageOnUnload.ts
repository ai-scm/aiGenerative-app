import { useEffect } from 'react';

/**
 * Hook que limpia el localStorage y sessionStorage cuando se cierra la página
 * Se ejecuta en los eventos beforeunload y unload
 */
const useClearStorageOnUnload = () => {
  useEffect(() => {
    const clearStorage = () => {
      try {
        // Limpiar localStorage
        localStorage.clear();
        // Limpiar sessionStorage
        sessionStorage.clear();
        console.log('Storage cleared on page unload');
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    };

    // Añadir event listeners para cuando se cierre la página
    window.addEventListener('beforeunload', clearStorage);
    window.addEventListener('unload', clearStorage);

    // Cleanup: remover event listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('beforeunload', clearStorage);
      window.removeEventListener('unload', clearStorage);
    };
  }, []);
};

export default useClearStorageOnUnload;
