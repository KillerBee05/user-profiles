import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/header';

test('Header component renders correctly', () => {
  const { getByText } = render(<Header />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const headerElement = getByText('My Clerks');

  expect(headerElement).toBeInTheDocument();
});
