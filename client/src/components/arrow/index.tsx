import React, { MouseEventHandler } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface PropTypes {
  direction: 'left' | 'right';
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function Arrow({ direction, onClick}: PropTypes) {
  const ArrowIcon = direction === 'left' ? IoIosArrowBack : IoIosArrowForward;

  return (
    <div data-testid='arrow-component' onClick={onClick}>
      <ArrowIcon size={40} />
    </div>
  );
}
