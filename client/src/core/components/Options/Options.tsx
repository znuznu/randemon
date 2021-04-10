import React, { useContext, useState } from 'react';

import { Generation } from '../../models/generation';
import { createTeamRandomly, updateTeamRandomly } from '../../services/graphql/service';

import { ReloadCircle } from '@styled-icons/ionicons-solid';

import { Context as TeamContext } from '../../contexts/teamContext';

import Generations from './Generations';
import Pokeballs from './Pokeballs';
import Types from './Types';
import { Team } from '../../models/team';
import { Type } from '../../models/type';
import styled from 'styled-components';
import Panel from '../commons/components/Panel';

const OptionsSection = styled.div`
  margin: 0 auto 2rem;
`;

const FlexOptions = styled.div`
  display: flex;
  flex-direction: column;
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

type ReloadProps = {
  isLoading: boolean;
};

const Reload = styled(ReloadCircle)<ReloadProps>`
  width: 28px;
  margin-left: 0.25rem;
  animation: loading 1s linear ${(props) => (props.isLoading ? 'infinite' : '0')};

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type ButtonProps = {
  isLoading: boolean;
};

const Button = styled.button<ButtonProps>`
  padding: 0.25rem 0.5rem;
  margin: 0 auto;
  font-family: 'Lato';
  font-size: 20px;
  font-weight: 700;
  background-color: white;
  border-radius: 0.25rem;
  color: ${(props) => (props.isLoading ? '#666666' : props.theme.primary)};
  border: 1px solid ${(props) => (props.isLoading ? '#666666' : props.theme.primary)};

  &:hover {
    background-color: ${(props) => (props.isLoading ? 'white' : props.theme.primary)};
    color: ${(props) => (props.isLoading ? '#666666' : 'white')};
    cursor: ${(props) => (props.isLoading ? 'default' : 'pointer')};
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
      createTeamRandomly(quantity, Array.from(generations), type).then(
        (team: Team | null) => {
          team && teamContext.setTeam!(team);
          teamContext.setIsLoading!(false);
        }
      );
    }
  };

  return (
    <OptionsSection>
      <FlexOptions>
        <Panel title={'Generations'}>
          <Generations
            currentGenerations={Array.from(generations)}
            emitGeneration={emitGeneration}
          />
        </Panel>
        <Panel title={'Types'}>
          <Types currentType={type} emitType={emitType} />
        </Panel>
      </FlexOptions>
      <Pokeballs quantity={quantity} setQuantity={setQuantity} />
      <Flex>
        <Button
          onClick={generate}
          isLoading={!teamContext.isLoading && generations.size ? false : true}
          disabled={teamContext.isLoading || !generations.size ? true : false}
        >
          Generate
          <Reload isLoading={teamContext.isLoading} />
        </Button>
      </Flex>
    </OptionsSection>
  );
};

export default Options;
