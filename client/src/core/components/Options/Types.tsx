import React, { Fragment } from 'react';
import styled from 'styled-components';
import { TYPES_COLORS } from '../../../styles/theme/typesColors';
import { Type, types } from '../../models/type';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h2`
  font-family: 'OpenSans';
  text-align: center;
`;

const Badges = styled.div`
  margin: 0 auto;
  display: grid;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  grid-template-columns: repeat(3, auto [col-start]);
`;

const Badge = styled.span`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: white;
  background-color: ${(props) => props.color};
  text-transform: uppercase;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  font-family: 'OpenSans';
  font-weight: 800;
  font-size: 16px;
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
  setType: (type: Type) => void;
};

const Types = ({ currentType, setType }: TypesProps) => {
  return (
    <Section>
      <Title>Types</Title>
      <Badges>
        {types.map((type) =>
          currentType === type ? (
            <BadgeSelected
              key={`${type}`}
              color={TYPES_COLORS[type]}
              onClick={() => setType(type)}
            >
              {type}
            </BadgeSelected>
          ) : (
            <Badge
              key={`${type}`}
              color={TYPES_COLORS[type]}
              onClick={() => setType(type)}
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
