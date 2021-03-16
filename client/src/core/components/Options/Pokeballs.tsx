import React, { useEffect, useState } from 'react';

const Pokeballs = () => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {}, [quantity]);

  return (
    <div>
      {[...Array(6)].map((_, index) => {
        return (
          <p onClick={() => setQuantity(index + 1)} key={`pokeball-${index}`}>
            {index >= quantity ? 'O' : 'X'}
          </p>
        );
      })}
    </div>
  );
};

export default Pokeballs;
