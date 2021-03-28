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

type IconProps = {
  slideInTime: string;
};

const Icon = styled.img<IconProps>`
  width: 50px;
  cursor: pointer;
  transition: 0.8s ease-out;
  &:hover {
    transform: rotate(90deg);
  }

  animation: slide-in ${(props) => props.slideInTime};
  @keyframes slide-in {
    0% {
      transform: translateX(1300px);
    }
    100% {
      transform: translateX(0);
    }
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
            slideInTime={`${index * 0.1}s`}
          />
        );
      })}
    </Flex>
  );
};

export default Pokeballs;
