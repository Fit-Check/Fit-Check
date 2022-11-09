import React from 'react';

const Clothes = ({ clothing }) => {
  const { name, type } = clothing; //<p><strong>Style:</strong> {style}</p>
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
