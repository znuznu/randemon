import React, { Fragment, useState } from 'react';

import Generation from './Generations';
import Pokeballs from './Pokeballs';
import Types from './Types';

const Options = () => {
  const [type, setType] = useState<string | null>(null);
  const [generations, setGenerations] = useState<string[] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const generate = () => {
    console.log(type);
    console.log(generations);
    console.log(quantity);
  };

  return (
    <Fragment>
      <Generation />
      <Types />
      <Pokeballs />
      <button onClick={generate}>Generate</button>
    </Fragment>
  );
};

export default Options;
