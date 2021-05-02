import { useContext } from 'react';

import styled from 'styled-components';

import { Context as CurrentPokemonModalContext } from '../../contexts/currentPokemonModalContext';
import { TYPES_COLORS } from '../../../styles/theme/typesColors';
import { Type, types } from '../../models/type';
import TypeBadge from '../commons/styles/TypeBadge';

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Badges = styled.div`
  margin: 0 auto;
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

// Useful in order to avoid Types buttons being hovered when the modal is open
type BadgeProps = {
  hasFullOpacity: boolean;
};

const Badge = styled(TypeBadge)<BadgeProps>`
  opacity: ${(props) => (props.hasFullOpacity ? 1 : 0.4)};

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const BadgeSelected = styled(Badge)`
  opacity: 1;
`;

type TypesProps = {
  currentTypes: Type[];
  emitType: (type: Type) => void;
};

const Types = ({ currentTypes, emitType }: TypesProps) => {
  const currentPokemonModalContext = useContext(CurrentPokemonModalContext);

  return (
    <Section>
      <Badges>
        {types.map((type) =>
          currentTypes.includes(type) ? (
            <BadgeSelected
              key={`${type}`}
              color={TYPES_COLORS[type]}
              onClick={() => emitType(type)}
              hasFullOpacity={currentPokemonModalContext.pokemon ? true : false}
            >
              {type}
            </BadgeSelected>
          ) : (
            <Badge
              key={`${type}`}
              color={TYPES_COLORS[type]}
              onClick={() => emitType(type)}
              hasFullOpacity={currentPokemonModalContext.pokemon ? true : false}
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
