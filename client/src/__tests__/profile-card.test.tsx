import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileCard from '../components/profile-card';

const mockProfiles = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123456789',
    picture: 'profile.jpg',
    location: 'New York, USA',
  },
  {
    name: 'Mary Jane',
    email: 'maryjane@example.com',
    phone: '123456789',
    picture: 'profile.jpg',
    location: 'New York, USA',
  },
  {
    name: 'Seth Rogan',
    email: 'sethrogan@example.com',
    phone: '123456789',
    picture: 'profile.jpg',
    location: 'New York, USA',
  }
];

test('ProfileCard component renders correctly', () => {
  render(
    <ProfileCard
      profiles={mockProfiles}
      isLoading={false}
      selectedColor="#FF0000"
      perPage={3}
    />
  );

  const profileElements = screen.getAllByTestId(/profile-\d+/);
  expect(profileElements.length).toBe(mockProfiles.length);
});
