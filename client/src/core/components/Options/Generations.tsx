import React from 'react';

const GENERATIONS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

type GenerationsProps = {
  setGenerations?: (generation: string) => void;
};

const Generations = ({ setGenerations }: GenerationsProps) => {
  return (
    <div>
      <h2>Generation</h2>
      {GENERATIONS.map((generation) => {
        return <p key={`${generation}`}>{generation}</p>;
      })}
    </div>
  );
};

export default Generations;
