import React, { useEffect } from 'react';
import { translations } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import '@aws-amplify/ui-react/styles.css';
import AuthAmplify from './components/AuthAmplify';
import AuthCustom from './components/AuthCustom';
import { Authenticator } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { validateSocialProvider } from './utils/SocialProviderUtils';
import AppContent from './layouts/AppContent';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback';
// Usar la versión segura temporalmente
import { useAddCustomUrl, useClearStorageOnUnloadSafe } from './custom-components/hooks';

const customProviderEnabled =
  import.meta.env.VITE_APP_CUSTOM_PROVIDER_ENABLED === 'true';
const socialProviderFromEnv = import.meta.env.VITE_APP_SOCIAL_PROVIDERS?.split(
  ','
).filter(validateSocialProvider);

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  // const [enableClearCache, setEnableClearCache] = React.useState(false);
  const { saveCurrentUrl } = useAddCustomUrl();

  useEffect(() => {
    const hasSavedUrl = sessionStorage.getItem('url_Saved');
    if (!hasSavedUrl) {
      saveCurrentUrl();
      sessionStorage.setItem('url_Saved', 'true');
    }
  }, [saveCurrentUrl]);

  

  useEffect(() => {
    // set header title
    document.title = t('app.name')
  }, [t]);

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
        loginWith: {
          oauth: {
            domain: import.meta.env.VITE_APP_COGNITO_DOMAIN,
            scopes: ['openid', 'email'],
            redirectSignIn: [import.meta.env.VITE_APP_REDIRECT_SIGNIN_URL],
            redirectSignOut: [import.meta.env.VITE_APP_REDIRECT_SIGNOUT_URL],
            responseType: 'code',
          },
        },
      },
    },
  });

    useClearStorageOnUnloadSafe();

  I18n.putVocabularies(translations);
  I18n.setLanguage(i18n.language);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {customProviderEnabled ? (
        <AuthCustom>
          <AppContent />
        </AuthCustom>
      ) : (
        <Authenticator.Provider>
          <AuthAmplify socialProviders={socialProviderFromEnv}>
            <AppContent />
          </AuthAmplify>
        </Authenticator.Provider>
      )}
    </ErrorBoundary>
  );
};

export default App;
