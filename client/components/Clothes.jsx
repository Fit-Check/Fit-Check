import React from 'react';

const Clothes = ({ clothing }) => {
  const { name, type } = clothing;
  return (
    <div id='clothingCard'>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
    </div>
  );
};

export default Clothes;
