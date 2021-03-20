import React, { useState } from 'react';
import styled from 'styled-components';
import { Generation } from '../../models/generation';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h2`
  font-family: 'OpenSans';
`;

interface BadgeProps {
  something: boolean;
}

const Badge = styled.span`
  font-family: 'Inter';
  background-color: white;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: black;
  text-transform: uppercase;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  font-weight: 800;
  font-size: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
`;

const BadgeSelected = styled(Badge)`
  background-color: black;
  color: white;
`;

const Badges = styled.div`
  display: grid;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  grid-template-columns: repeat(3, 40px [col-start]);
`;

const GENERATIONS: Generation[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

type GenerationsProps = {
  currentGenerations: Generation[];
  emitGeneration: (generation: Generation) => void;
};

const Generations = ({ currentGenerations, emitGeneration }: GenerationsProps) => {
  return (
    <Section>
      <Title>Generation</Title>
      <Badges>
        {GENERATIONS.map((generation) => {
          return currentGenerations.includes(generation) ? (
            <BadgeSelected
              key={`${generation}`}
              onClick={() => emitGeneration(generation)}
            >
              {generation}
            </BadgeSelected>
          ) : (
            <Badge key={`${generation}`} onClick={() => emitGeneration(generation)}>
              {generation}
            </Badge>
          );
        })}
      </Badges>
    </Section>
  );
};

export default Generations;
