import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Generation } from '../../models/generation';
import { getRandomTeam } from '../../services/graphql/service';

import { Context as TeamContext } from '../../contexts/teamContext';

import Generations from './Generations';
import Pokeballs from './Pokeballs';
import Types from './Types';
import { Team } from '../../models/team';
import { Type } from '../../models/type';

const Options = () => {
  const [type, setType] = useState<Type | null>(null);
  const [generations, setGenerations] = useState(new Set<Generation>());
  const [quantity, setQuantity] = useState(1);

  const teamContext = useContext(TeamContext);

  const emitGeneration = (generation: Generation) => {
    generations.has(generation)
      ? setGenerations(
          new Set(Array.from(generations).filter((gen) => gen !== generation))
        )
      : setGenerations(new Set([...Array.from(generations), generation]));
  };

  const generate = () => {
    getRandomTeam(quantity, Array.from(generations), type).then((team: Team | null) => {
      team && teamContext.setTeam!(team);
    });
  };

  return (
    <Fragment>
      <Generations
        currentGenerations={Array.from(generations)}
        emitGeneration={emitGeneration}
      />
      <Types currentType={type} setType={setType} />
      <Pokeballs quantity={quantity} setQuantity={setQuantity} />
      <button onClick={generate}>Generate</button>
    </Fragment>
  );
};

export default Options;
