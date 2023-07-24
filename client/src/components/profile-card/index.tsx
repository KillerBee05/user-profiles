import React from 'react';
import { Profile } from '../../types';
import { IoMail, IoCall, IoLocationSharp } from 'react-icons/io5';
import './styles.css';

interface PropTypes {
  profiles: Profile[];
  isLoading: boolean;
  selectedColor: string;
  perPage: number;
}

export default function ProfileCard({ profiles, isLoading, selectedColor, perPage }: PropTypes) {
  const isMobile = window.innerWidth < 600;
  const isSingleProfile = perPage === 1;
  const cardStyles = {
    backgroundColor: selectedColor,
    width: isMobile || isSingleProfile ? '80%' : '300px',
  };

  return (
    <div className="card-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        profiles.map((profile, i) => (
          <div className="card" key={i} data-testid={`profile-${i}`} style={cardStyles}>
            <div className="card-top" /> {/* Add card-top class here */}
            <img src={profile.picture} alt="ProfileImage" className="profile-picture" />
            <div className="card-body">
              <h2 className="card-title">{profile.name}</h2>
              <p className="card-text">
                <IoMail /> {profile.email}
              </p>
              <p className="card-text">
                <IoCall /> {profile.phone}
              </p>
              <p className="card-text">
                <IoLocationSharp /> {profile.location}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
