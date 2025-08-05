import React from 'react';

interface Props {
  body: React.ReactNode;
  paramName: string;
}

const InvisibleItemUrl: React.FC<Props> = ({ body, paramName = 'visible' }) => {
  sessionStorage.removeItem('url_Saved');
  const params = new URLSearchParams(window.location.search);
  const paramValue = params.get(paramName);

  const isVisible = paramValue === null || paramValue === 'true';

  if (!isVisible) return null;

  return <>{body}</>;
};

export default InvisibleItemUrl;
