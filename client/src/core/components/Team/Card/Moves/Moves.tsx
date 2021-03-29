import React from 'react';

import styled from 'styled-components';

import Move from '../../../../models/move';
import MoveDetail from './MoveDetail';

const Container = styled.div`
  margin: 1rem auto 0;
  display: grid;
  column-gap: 4rem;
  row-gap: 1rem;
  grid-template-columns: repeat(2, 150px [col-start]);

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}) {
    /* padding: 0 1rem 0 0;
    margin: 0 1rem 0; */
    margin: auto 0;
  }
`;

type MovesProps = {
  moves: Move[];
};

const Moves = ({ moves }: MovesProps) => {
  return (
    <Container>
      {moves.map((move, index) => {
        // TODO: pass the pokemon id here in key
        return <MoveDetail key={`${move}-${index}`} move={move} />;
      })}
    </Container>
  );
};

export default Moves;
