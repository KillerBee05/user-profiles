/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorSelector from '../components/color-selector';

test('ColorSelector component invokes onClick with selected color', () => {
  const handleClick = jest.fn();
  const { getByLabelText } = render(<ColorSelector onClick={handleClick} />);
  const colorInput = getByLabelText('Card background color:');

  // Simulate a color change event
  fireEvent.change(colorInput, { target: { value: '#ff0000' } });

  expect(handleClick).toHaveBeenCalledWith('#ff0000');
});
