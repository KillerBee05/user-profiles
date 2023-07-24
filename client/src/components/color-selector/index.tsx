import React from 'react';
import './styles.css'

interface PropTypes {
  onClick: (color: string) => void;
}

export default function ColorSelector({ onClick }: PropTypes) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    onClick(selectedColor);
  };

  return (
    <div>
      <label htmlFor="color" className="">Card background color: </label>
      <input type="color" id="color" onChange={handleColorChange} />
    </div>
  );
}
