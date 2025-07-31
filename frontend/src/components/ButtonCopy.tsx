import React, { useCallback, useState } from 'react';
import ButtonIcon from './ButtonIcon';
import { BaseProps } from '../@types/common';
import { PiCheck, PiClipboard } from 'react-icons/pi';
import copy from 'copy-to-clipboard';
import Tooltip from './Tooltip';
import { t } from 'i18next';

type Props = BaseProps & {
  text: string;
};

const ButtonCopy: React.FC<Props> = (props) => {
  const [showsCheck, setshowsCheck] = useState(false);

  const copyMessage = useCallback((message: string) => {
    // Strip out [^...] citation tags before copying
    const cleanedText = message.replace(/\[\^[^\]]*\]/g, '');
    copy(cleanedText);
    setshowsCheck(true);

    setTimeout(() => {
      setshowsCheck(false);
    }, 3000);
  }, []);

  return (
    <ButtonIcon
      className={props.className}
      onClick={() => {
        copyMessage(props.text);
      }}>
      <Tooltip
        message={t('tooltips.copyResponse')}
        direction="right"
        className="cursor-pointer">
        {showsCheck ? <PiCheck /> : <PiClipboard />}
      </Tooltip>
    </ButtonIcon>
  );
};

export default ButtonCopy;
