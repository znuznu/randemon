import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TYPES_COLORS } from '../../../../../styles/theme/typesColors';

import Move from '../../../../models/move';
import { Type } from '../../../../models/type';
import TypeBadge from '../../../commons/styles/TypeBadge';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const Name = styled.h3`
  margin: 0;
  font-family: 'OpenSans';
  text-transform: capitalize;
  font-weight: 800;
  text-align: center;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: span-space-between;
`;

const Stat = styled.p`
  font-family: 'OpenSans';
  font-weight: 800;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const StatTitle = styled.span`
  font-family: 'OpenSans';
  font-weight: 400;
`;

const StatDetail = styled.span`
  font-family: 'OpenSans';
  font-weight: 200;
`;

const Badge = styled(TypeBadge)`
  margin: 0.4rem auto;
`;

type MoveDetailProps = {
  move: Move;
};

const MoveDetail = ({ move }: MoveDetailProps) => {
  return (
    <Container>
      <Name>{move.name}</Name>
      <Badge color={TYPES_COLORS[move.type]}>{move.type}</Badge>
      <Stats>
        <Stat>
          <StatTitle>Power</StatTitle>
          <StatDetail>{move.power ? move.power : '-'}</StatDetail>
        </Stat>
        <Stat>
          <StatTitle>Accuracy</StatTitle>
          <StatDetail>{move.accuracy ? move.accuracy : '-'}</StatDetail>
        </Stat>
        <Stat>
          <StatTitle>PP</StatTitle>
          <StatDetail>{move.pp}</StatDetail>
        </Stat>
      </Stats>
    </Container>
  );
};

export default MoveDetail;
