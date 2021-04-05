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
  margin: 0 auto 2rem;
`;

const FlexOptions = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  margin: 0 auto;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    flex-direction: column;
    width: auto;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.25rem 25px;
  margin: 0 auto;
  font-family: 'Lato';
  font-size: 20px;
  font-weight: 700;
  background-color: white;
  color: ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.primary};

  &:hover {
    background-color: ${(props) => props.theme.primary};
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
      <FlexOptions>
        <Generations
          currentGenerations={Array.from(generations)}
          emitGeneration={emitGeneration}
        />
        <Types currentType={type} emitType={emitType} />
      </FlexOptions>
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
