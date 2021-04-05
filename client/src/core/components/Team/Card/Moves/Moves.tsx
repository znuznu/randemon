import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import useWindowSize from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../../styles/theme/breakpoints';
import { IoTriangleSharp } from 'react-icons/io5';

import Move from '../../../../models/move';
import MoveDetail from './MoveDetail';

type HiddenProps = {
  hide: boolean;
};

const Container = styled.div<HiddenProps>`
  margin: 1rem auto 0;
  display: ${(props) => (props.hide ? 'none' : 'grid')};
  column-gap: 4rem;
  row-gap: 1rem;
  grid-template-columns: repeat(2, 150px [col-start]);

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    margin: auto 0;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    margin: auto 0;
    grid-template-columns: repeat(2, 150px [col-start]);
    justify-content: center;
  }

  @media only screen and (max-width: 440px) {
    column-gap: 1rem;
    row-gap: 1rem;
    grid-template-columns: repeat(auto-fill, 190px [col-start]);
  }
`;

const Bar = styled.div<HiddenProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => (props.hide ? 0 : '1rem')};

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 14px;
  }
`;

const BarTitle = styled.h3`
  font-family: 'Lato';
  margin: 0;
`;

type MovesProps = {
  moves: Move[];
};

const Moves = ({ moves }: MovesProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const windowSizes = useWindowSize();

  useEffect(() => {
    setIsSmallScreen(windowSizes.size.width <= breakpoints.s);
  }, [windowSizes]);

  const something = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      {isSmallScreen && (
        <Bar hide={isHidden}>
          <BarTitle>Moves</BarTitle>
          <IoTriangleSharp onClick={something} />
        </Bar>
      )}
      <Container hide={isSmallScreen && isHidden}>
        {moves.map((move, index) => {
          // TODO: pass the pokemon id here in key
          return <MoveDetail key={`${move}-${index}`} move={move} />;
        })}
      </Container>
    </>
  );
};

export default Moves;
