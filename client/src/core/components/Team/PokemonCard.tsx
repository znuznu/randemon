import React, { useEffect, useState } from 'react';

import Pokemon from '../../models/pokemon';

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return <div>{pokemon.name}</div>;
};

export default PokemonCard;
