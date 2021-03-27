import React, { useContext, useState } from 'react';

import { Generation } from '../../models/generation';
import { getRandomTeam, updateTeamRandomly } from '../../services/graphql/service';

import { Context as TeamContext } from '../../contexts/teamContext';

import Generations from './Generations';
import Pokeballs from './Pokeballs';
import Types from './Types';
import { Team } from '../../models/team';
import { Type } from '../../models/type';
import styled from 'styled-components';

const OptionsSection = styled.div`
  width: 900px;
  margin: 0 auto 2rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.25rem 25px;
  font-family: 'Lato';
  font-size: 24px;
  font-weight: 700;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

const ButtonDisabled = styled(Button)`
  background-color: white;
  color: #666666;
  border: 1px solid #666666;

  &:hover {
    background-color: white;
    color: #666666;
    cursor: default;
  }
`;

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

  const emitType = (emittedType: Type) => {
    type === emittedType ? setType(null) : setType(emittedType);
  };

  const generate = () => {
    teamContext.setIsLoading!(true);

    if (teamContext.team) {
      console.log(teamContext.team);
      updateTeamRandomly(quantity, Array.from(generations), type, teamContext.team).then(
        (team: Team | null) => {
          team && teamContext.setTeam!(team);
          teamContext.setIsLoading!(false);
        }
      );
    } else {
      getRandomTeam(quantity, Array.from(generations), type).then((team: Team | null) => {
        team && teamContext.setTeam!(team);
        teamContext.setIsLoading!(false);
      });
    }
  };

  return (
    <OptionsSection>
      <Flex>
        <Generations
          currentGenerations={Array.from(generations)}
          emitGeneration={emitGeneration}
        />
        <Types currentType={type} emitType={emitType} />
      </Flex>
      <Pokeballs quantity={quantity} setQuantity={setQuantity} />
      <Flex>
        {!teamContext.isLoading && generations.size ? (
          <Button onClick={generate}>Generate</Button>
        ) : (
          <ButtonDisabled disabled onClick={generate}>
            Generate
          </ButtonDisabled>
        )}
      </Flex>
    </OptionsSection>
  );
};

export default Options;
