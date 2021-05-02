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
import useWindowSize from '../../hooks/useWindowSize';
import { theme } from '../../../styles/theme/theme';

const OptionsSection = styled.div`
  margin: 0 auto 2rem;
`;

const OptionsHeading = styled.h2`
  font-family: 'Lato';
  text-align: center;
  margin-top: 0;
`;

const FlexColOptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    flex-direction: column;
    width: auto;
  }
`;

const FlexRowOptions = styled.div`
  display: flex;
  width: 500px;
  margin: 0 auto;
  justify-content: space-between;

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
  const [types, setTypes] = useState(new Set<Type>());
  const [generations, setGenerations] = useState(new Set<Generation>());
  const [quantity, setQuantity] = useState(1);

  const windowSizes = useWindowSize();

  const teamContext = useContext(TeamContext);

  const emitGeneration = (emittedGeneration: Generation) => {
    generations.has(emittedGeneration)
      ? setGenerations(
          new Set(
            Array.from(generations).filter(
              (generation) => generation !== emittedGeneration
            )
          )
        )
      : setGenerations(new Set([...Array.from(generations), emittedGeneration]));
  };

  const emitType = (emittedType: Type) => {
    types.has(emittedType)
      ? setTypes(new Set(Array.from(types).filter((type) => type !== emittedType)))
      : setTypes(new Set([...Array.from(types), emittedType]));
  };

  const generate = () => {
    teamContext.setIsLoading!(true);

    if (teamContext.team) {
      updateTeamRandomly(
        quantity,
        Array.from(generations),
        Array.from(types),
        teamContext.team
      ).then((team: Team | null) => {
        team && teamContext.setTeam!(team);
        teamContext.setIsLoading!(false);
      });
    } else {
      createTeamRandomly(quantity, Array.from(generations), Array.from(types)).then(
        (team: Team | null) => {
          team && teamContext.setTeam!(team);
          teamContext.setIsLoading!(false);
        }
      );
    }
  };

  return (
    <OptionsSection>
      {windowSizes.size.width < theme.breakpoints.m ? (
        <FlexColOptions>
          <Panel
            title={'Generations'}
            contentHeight={
              windowSizes.size.width < theme.breakpoints.xxs ? 125 + 16 : 95 + 16
            }
          >
            <Generations
              currentGenerations={Array.from(generations)}
              emitGeneration={emitGeneration}
            />
          </Panel>
          <Panel
            title={'Types'}
            contentHeight={windowSizes.size.width < theme.breakpoints.xxs ? 250 : 170}
          >
            <Types currentTypes={Array.from(types)} emitType={emitType} />
          </Panel>
        </FlexColOptions>
      ) : (
        <FlexRowOptions>
          <div>
            <OptionsHeading>Generations</OptionsHeading>
            <Generations
              currentGenerations={Array.from(generations)}
              emitGeneration={emitGeneration}
            />
          </div>
          <div>
            <OptionsHeading>Types</OptionsHeading>
            <Types currentTypes={Array.from(types)} emitType={emitType} />
          </div>
        </FlexRowOptions>
      )}
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
