import React, { useEffect, useState } from 'react';

import { Team } from '../../models/team';
import PokemonCard from './PokemonCard';

type TeamProps = {
  team: Team;
};

const TeamSection = ({ team }: TeamProps) => {
  return (
    <div>
      {team.pokemon.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
};

export default TeamSection;
