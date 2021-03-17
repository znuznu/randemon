import React, { useState } from 'react';

const GENERATIONS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

type GenerationsProps = {
  currentGenerations: string[];
  emitGeneration: (generation: string) => void;
};

const Generations = ({ currentGenerations, emitGeneration }: GenerationsProps) => {
  return (
    <div>
      <h2>Generation</h2>
      {GENERATIONS.map((generation) => {
        return (
          <p key={`${generation}`} onClick={() => emitGeneration(generation)}>
            {generation}
          </p>
        );
      })}
    </div>
  );
};

export default Generations;
