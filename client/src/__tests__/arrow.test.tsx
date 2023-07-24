import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Arrow from '../components/arrow';

test('Arrow component renders correctly', () => {
  const handleClick = jest.fn();
  const direction = 'left';

  const { getByTestId } = render(<Arrow direction={direction} onClick={handleClick} />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const arrow = getByTestId('arrow-component');

  expect(arrow).toBeInTheDocument();

  fireEvent.click(arrow);

  expect(handleClick).toHaveBeenCalled();
});
