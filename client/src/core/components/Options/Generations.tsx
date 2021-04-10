import React from 'react';

import styled from 'styled-components';

import { Generation } from '../../models/generation';
import { Region } from '../../models/region';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 1rem;
`;

const Badge = styled.span`
  font-family: 'Lato';
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  text-transform: capitalize;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  font-weight: 800;
  font-size: 16px;
  background-color: white;
  color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.primary};
    color: white;
  }
`;

const BadgeSelected = styled(Badge)`
  background-color: ${(props) => props.theme.primary};
  color: white;
`;

const Badges = styled.div`
  margin: 0 auto;
  display: grid;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  grid-template-columns: repeat(3, 65px [col-start]);

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    width: auto;
    grid-template-columns: repeat(2, 65px [col-start]);
  }

  @media only screen and (max-width: 210px) {
    width: auto;
    grid-template-columns: repeat(auto-fill, 65px [col-start]);
  }
`;

const regionsToGeneration: Record<Region, Generation> = {
  Kanto: 'I',
  Johto: 'II',
  Hoenn: 'III',
  Sinnoh: 'IV',
  Unova: 'V',
  Kalos: 'VI',
  Alola: 'VII',
  Galar: 'VIII'
};

const REGIONS: Region[] = [
  'Kanto',
  'Johto',
  'Hoenn',
  'Sinnoh',
  'Unova',
  'Kalos',
  'Alola',
  'Galar'
];

type GenerationsProps = {
  currentGenerations: Generation[];
  emitGeneration: (generation: Generation) => void;
};

const Generations = ({ currentGenerations, emitGeneration }: GenerationsProps) => {
  return (
    <Section>
      <Badges>
        {REGIONS.map((region) => {
          return currentGenerations.includes(regionsToGeneration[region]) ? (
            <BadgeSelected
              key={`${region}`}
              onClick={() => emitGeneration(regionsToGeneration[region])}
            >
              {region}
            </BadgeSelected>
          ) : (
            <Badge
              key={`${region}`}
              onClick={() => emitGeneration(regionsToGeneration[region])}
            >
              {region}
            </Badge>
          );
        })}
      </Badges>
    </Section>
  );
};

export default Generations;
