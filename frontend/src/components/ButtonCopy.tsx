import React, { useCallback, useState } from 'react';
import ButtonIcon from './ButtonIcon';
import { BaseProps } from '../@types/common';
import { PiCheck, PiClipboard } from 'react-icons/pi';
import copy from 'copy-to-clipboard';
import Tooltip from './Tooltip';
import { useTranslation } from 'react-i18next';

type Props = BaseProps & {
  text: string;
};

const ButtonCopy: React.FC<Props> = (props) => {
  const [showsCheck, setshowsCheck] = useState(false);
  const { t } = useTranslation();

  const copyMessage = useCallback((message: string) => {
    copy(message);
    setshowsCheck(true);

    setTimeout(() => {
      setshowsCheck(false);
    }, 3000);
  }, []);

  return (
    <Tooltip
      message={t('tooltips.copyResponse')}
      direction="right"
      className="cursor-pointer">
      <ButtonIcon
        className={props.className}
        onClick={() => {
          copyMessage(props.text);
        }}>
        {showsCheck ? <PiCheck /> : <PiClipboard />}
      </ButtonIcon>
    </Tooltip>
  );
};

export default ButtonCopy;
