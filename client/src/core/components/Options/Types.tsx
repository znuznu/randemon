import React, { Fragment } from 'react';
import { Type, types } from '../../models/type';

type TypesProps = {
  currentType: string | null;
  setType: (type: Type) => void;
};

const Types = ({ currentType, setType }: TypesProps) => {
  return (
    <Fragment>
      <h2>Types</h2>
      {types.map((type) => (
        <p key={`${type}`} onClick={() => setType(type)}>
          {type}
        </p>
      ))}
    </Fragment>
  );
};

export default Types;
