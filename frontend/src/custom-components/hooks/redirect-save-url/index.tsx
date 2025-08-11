import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectToSavedUrl = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    const savedUrl = localStorage.getItem('url_redireccion');

    if (savedUrl) {
      try {
        const url = new URL(savedUrl);
        const savedPathWithQuery = url.pathname + url.search;

        const currentPathWithQuery = window.location.pathname + window.location.search;

        if (currentPathWithQuery !== savedPathWithQuery) {
          navigate(savedPathWithQuery, { replace: true });
        }
        // sessionStorage.removeItem('url_Saved');
        // localStorage.removeItem('url_redireccion');
        // localStorage.removeItem('url_Saved');
      } catch (error) {
        console.error('Invalid saved URL in localStorage:', error);
      }
    }
  }, [navigate]);
};

export default useRedirectToSavedUrl;
