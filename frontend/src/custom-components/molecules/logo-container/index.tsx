import React from 'react';

interface props {
  body: React.ReactNode;
}

const LogoContainer = (props: props) => {
  return (
    <div className="flex items-center w-full justify-between px-2">
      {props.body}
      <img
        src="/images/logo-houndoc.webp"
        alt="Logo"
        className="pointer-events-none ml-2 h-6 object-contain transition-opacity duration-300"
      />
    </div>
  );
};

export default LogoContainer;
