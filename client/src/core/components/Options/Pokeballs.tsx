import React, { useEffect, useState } from 'react';

import PokeballIconEmpty from '../../../styles/svg/pokeball-empty.svg';
import PokeballIconFilled from '../../../styles/svg/pokeball-filled.svg';

import styled from 'styled-components';

type PokeballsProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin: 2rem auto;
`;

const Icon = styled.img`
  width: 50px;
  cursor: pointer;
  transition: transform 0.8s ease-out;

  &:hover {
    transform: rotate(90deg);
  }
`;

const Pokeballs = ({ quantity, setQuantity }: PokeballsProps) => {
  useEffect(() => {}, [quantity]);

  return (
    <Flex>
      {[...Array(6)].map((_, index) => {
        return (
          <Icon
            key={`pokeball-${index}`}
            src={index >= quantity ? PokeballIconEmpty : PokeballIconFilled}
            onClick={() => setQuantity(index + 1)}
          />
        );
      })}
    </Flex>
  );
};

export default Pokeballs;
