import React, { useEffect } from 'react';

import styled from 'styled-components';

import PokeballIconEmpty from '../../../styles/svg/pokeball-empty.svg';
import PokeballIconFilled from '../../../styles/svg/pokeball-filled.svg';

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  justify-items: center;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  grid-template-columns: repeat(6, 35px [col-start]);
  margin: 0 0 1.25rem;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, 35px [col-start]);
    justify-content: center;
  }
`;

type IconProps = {
  slideInTime: string;
};

const Icon = styled.img<IconProps>`
  width: 35px;
  cursor: pointer;
  transition: 0.8s ease-out;

  &:hover {
    transform: rotate(90deg);
  }

  animation: slide-in ${(props) => props.slideInTime};
  @keyframes slide-in {
    0% {
      transform: translateX(9000px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

type PokeballsProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const Pokeballs = ({ quantity, setQuantity }: PokeballsProps) => {
  useEffect(() => {}, [quantity]);

  return (
    <Flex>
      <Grid>
        {[...Array(6)].map((_, index) => {
          return (
            <Icon
              key={`pokeball-${index}`}
              src={index >= quantity ? PokeballIconEmpty : PokeballIconFilled}
              onClick={() => setQuantity(index + 1)}
              slideInTime={`${(index + 1) * 0.1}s`}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};

export default Pokeballs;
