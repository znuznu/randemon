import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import useWindowSize from '../../../../hooks/useWindowSize';
import { breakpoints } from '../../../../../styles/theme/breakpoints';
import Move from '../../../../models/move';
import MoveDetail from './MoveDetail';

type HiddenProps = {
  hide: boolean;
};

type ContainerProps = {
  maxHeight: string;
};

const Container = styled.div<ContainerProps>`
  transition: max-height 0.8s ease-in-out;
  max-height: ${(props) => props.maxHeight};
  margin: 1rem auto 0;
  overflow: hidden;
  display: grid;
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

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 14px;
  }
`;

const BarTitle = styled.h3`
  font-family: 'Lato';
  margin: 0;
`;

type TriangleProps = {
  rotateAngle: number;
};

const Triangle = styled.div<TriangleProps>`
  display: inline-block;
  height: 0;
  width: 0;
  border-right: 8px solid transparent;
  border-bottom: 14px solid ${(props) => props.theme.primary};
  border-left: 8px solid transparent;
  transition: transform 0.8s ease-in-out;
  transform: rotate(${(props) => props.rotateAngle}deg);
`;

type MovesProps = {
  moves: Move[];
};

const Moves = ({ moves }: MovesProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const [triangleAngle, setTriangleAngle] = useState(360);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const windowSizes = useWindowSize();

  useEffect(() => {
    setIsSmallScreen(windowSizes.size.width <= breakpoints.s);
  }, [windowSizes]);

  const toggleMoves = () => {
    setIsHidden(!isHidden);
    setTriangleAngle(triangleAngle - 180);
  };

  return (
    <>
      {isSmallScreen && (
        <Bar hide={isHidden} onClick={toggleMoves}>
          <BarTitle>Moves</BarTitle>
          <Triangle rotateAngle={triangleAngle} />
        </Bar>
      )}
      <Container
        maxHeight={!isSmallScreen || (isSmallScreen && !isHidden) ? '1000px' : '0px'}
      >
        {moves.map((move, index) => {
          // TODO: pass the pokemon id here in key
          return <MoveDetail key={`${move}-${index}`} move={move} />;
        })}
      </Container>
    </>
  );
};

export default Moves;
