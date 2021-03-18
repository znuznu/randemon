import React, { Fragment, useEffect, useState } from 'react';
import { Generation } from '../../models/generation';
import { getRandomTeam } from '../../services/graphql/service';

import Generations from './Generations';
import Pokeballs from './Pokeballs';
import Types from './Types';

const Options = () => {
  const [type, setType] = useState<string | null>(null);
  const [generations, setGenerations] = useState(new Set<string>());
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getRandomTeam(10);
  }, []);

  const emitGeneration = (generation: string) => {
    generations.has(generation)
      ? setGenerations(
          new Set(Array.from(generations).filter((gen) => gen !== generation))
        )
      : setGenerations(new Set([...Array.from(generations), generation]));
    console.log(generations);
  };

  const generate = () => {
    console.log(type);
    console.log(generations);
    console.log(quantity);
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
