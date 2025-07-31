import React from 'react';
import { PiPaperPlaneRightFill, PiSpinnerGap } from 'react-icons/pi';
import { BaseProps } from '../@types/common';
import { twMerge } from 'tailwind-merge';
import Tooltip from './Tooltip';
import { t } from 'i18next';

type Props = BaseProps & {
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

const ButtonSend: React.FC<Props> = (props) => {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center rounded-xl p-2 text-xl',
        'bg-aws-sea-blue-light text-white hover:bg-aws-sea-blue-hover-light',
        'dark:bg-aws-sea-blue-dark dark:hover:bg-aws-sea-blue-hover-dark',
        props.disabled ? 'opacity-30' : '',
        props.className
      )}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}>
      <Tooltip
        message={t('tooltips.sendMessage')}
        direction="right"
        className="cursor-pointer">
        {props.loading ? (
          <PiSpinnerGap className="animate-spin" />
        ) : (
          <PiPaperPlaneRightFill />
        )}
      </Tooltip>
    </button>
  );
};

export default ButtonSend;
