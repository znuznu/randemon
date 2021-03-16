import React, { Fragment } from 'react';

type TypesProps = {
  currentType: string | null;
  setType: (type: string) => void;
};

const TYPES = [
  'bug',
  'dark',
  'dragon',
  'fairy',
  'fire',
  'fighting',
  'flying',
  'electric',
  'grass',
  'ghost',
  'ground',
  'ice',
  'normal',
  'psychic',
  'poison',
  'rock',
  'steel',
  'water'
];

const Types = ({ currentType, setType }: TypesProps) => {
  return (
    <Fragment>
      <h2>Types</h2>
      {TYPES.map((type: string) => (
        <p key={`${type}`} onClick={() => setType(type)}>
          {type}
        </p>
      ))}
    </Fragment>
  );
};

export default Types;
