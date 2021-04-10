import React from 'react';

import styled from 'styled-components';

import { TYPES_COLORS } from '../../../styles/theme/typesColors';
import { Type, types } from '../../models/type';
import TypeBadge from '../commons/styles/TypeBadge';

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Badges = styled.div`
  margin: 0 auto 1rem;
  display: grid;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  grid-template-columns: repeat(3, 75px [col-start]);

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    width: auto;
    grid-template-columns: repeat(2, auto [col-start]);
  }

  @media only screen and (max-width: 210px) {
    width: auto;
    grid-template-columns: repeat(1, auto [col-start]);
  }
`;

const Badge = styled(TypeBadge)`
  opacity: 0.4;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const BadgeSelected = styled(Badge)`
  opacity: 1;
`;

type TypesProps = {
  currentType: string | null;
  emitType: (type: Type) => void;
};

const Types = ({ currentType, emitType }: TypesProps) => {
  return (
    <Section>
      <Badges>
        {types.map((type) =>
          currentType === type ? (
            <BadgeSelected
              key={`${type}`}
              color={TYPES_COLORS[type]}
              onClick={() => emitType(type)}
            >
              {type}
            </BadgeSelected>
          ) : (
            <Badge
              key={`${type}`}
              color={TYPES_COLORS[type]}
              onClick={() => emitType(type)}
            >
              {type}
            </Badge>
          )
        )}
      </Badges>
    </Section>
  );
};

export default Types;
