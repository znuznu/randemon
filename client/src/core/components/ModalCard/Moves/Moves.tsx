import { useEffect, useState } from 'react';

import styled from 'styled-components';

import useWindowSize from '../../../hooks/useWindowSize';
import { breakpoints } from '../../../../styles/theme/breakpoints';
import Move from '../../../models/move';
import MoveDetail from './MoveDetail';
import Triangle from '../../commons/styles/Triangle';
import Warning from '../../commons/styles/Warning';

type HiddenProps = {
  hide: boolean;
};

const Grid = styled.div`
  margin: 1rem auto 0;
  display: grid;
  column-gap: 4rem;
  row-gap: 1rem;
  grid-template-columns: repeat(2, 150px [col-start]);

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    margin: 1rem auto 0;
    grid-template-columns: repeat(2, 150px [col-start]);
    justify-content: center;
  }

  @media only screen and (max-width: 440px) {
    margin: 1rem auto 0;
    column-gap: 1rem;
    row-gap: 1rem;
    grid-template-columns: repeat(2, 150px [col-start]);
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    margin: 1rem auto 0;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    grid-template-columns: repeat(2, 120px [col-start]);
  }
`;

type ContainerProps = {
  contentHeight: number;
};

const Container = styled.div<ContainerProps>`
  transition: max-height 0.8s ease-in-out;
  max-height: ${(props) => props.contentHeight}px;
  overflow: hidden;
  display: flex;
`;

const SmallCard = styled.div<HiddenProps>`
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

type MovesProps = {
  moves: Move[];
  pokemonId: number;
};

const Moves = ({ moves, pokemonId }: MovesProps) => {
  const [isHidden, setIsHidden] = useState(false);
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
        <SmallCard hide={isHidden} onClick={toggleMoves}>
          <BarTitle>Moves</BarTitle>
          <Triangle rotateAngle={triangleAngle} />
        </SmallCard>
      )}
      <Container contentHeight={!isSmallScreen || (isSmallScreen && !isHidden) ? 269 : 0}>
        {moves.length ? (
          <Grid>
            {moves.map((move, index) => {
              return <MoveDetail key={`${move}-${index}-${pokemonId}`} move={move} />;
            })}
          </Grid>
        ) : (
          <Warning>No moves found.</Warning>
        )}
      </Container>
    </>
  );
};

export default Moves;
