import React, { useEffect, useState } from 'react';

type PokeballsProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const Pokeballs = ({ quantity, setQuantity }: PokeballsProps) => {
  useEffect(() => {}, [quantity]);

  return (
    <div>
      {[...Array(6)].map((_, index) => {
        return (
          <p key={`pokeball-${index}`} onClick={() => setQuantity(index + 1)}>
            {index >= quantity ? 'O' : 'X'}
          </p>
        );
      })}
    </div>
  );
};

export default Pokeballs;
