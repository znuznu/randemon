const types = [
  'NORMAL',
  'FIRE',
  'FIGHTING',
  'WATER',
  'FLYING',
  'GRASS',
  'POISON',
  'ELECTRIC',
  'GROUND',
  'PSYCHIC',
  'ROCK',
  'ICE',
  'BUG',
  'DRAGON',
  'GHOST',
  'DARK',
  'STEEL',
  'FAIRY'
] as const;

export type Type = typeof types[number];

export { types };
