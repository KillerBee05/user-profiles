import React from 'react';
import { Profile } from '../../types';
import Arrow from '../arrow';
import ColorSelector from '../color-selector';
import ProfileCard from '../profile-card';
import './styles.css';

interface PropTypes {
  profiles: Profile[];
  handleArrowClick: (direction: 'previous' | 'next') => void;
  handleBackgroundColor: (color: string) => void;
  isLoading: boolean;
  selectedColor: string;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export default function View({
  profiles,
  handleArrowClick,
  handleBackgroundColor,
  isLoading,
  selectedColor,
  perPage,
  currentPage,
  totalPages,
}: PropTypes) {
  return (
    <div>
      <div className="color-selector-container">
        <ColorSelector onClick={handleBackgroundColor} />
      </div>
      <div className="container">
        <div className="arrow-container">
          <Arrow direction="left" onClick={() => handleArrowClick('previous')} />
        </div>
        <ProfileCard profiles={profiles} isLoading={isLoading} selectedColor={selectedColor} perPage={perPage} />
        <div className="arrow-container">
          <Arrow direction="right" onClick={() => handleArrowClick('next')} />
        </div>
      </div>
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
