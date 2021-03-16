import React, { Fragment } from 'react';

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

const Types = () => {
  return (
    <Fragment>
      <h2>Types</h2>
      {TYPES.map((type: string) => (
        <p key={`${type}`}>{type}</p>
      ))}
    </Fragment>
  );
};

export default Types;
