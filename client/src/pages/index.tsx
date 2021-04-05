import React, { useState } from 'react';

import styled from 'styled-components';

import { Context as TeamContext } from '../core/contexts/teamContext';
import MainHeading from '../core/components/MainHeading/MainHeading';
import Options from '../core/components/Options/Options';
import { Team } from '../core/models/team';
import TeamSection from '../core/components/Team/TeamSection';

const Container = styled.div`
  margin: 0 2rem;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    margin: 0 1rem;
  }
`;

const IndexPage = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLock = (index: number) => {
    if (team) {
      const newTeam = { pokemon: [...team.pokemon] };
      newTeam.pokemon[index].isLocked = !newTeam.pokemon[index].isLocked;
      setTeam(newTeam);
    }
  };

  return (
    <Container>
      <TeamContext.Provider
        value={{ team, setTeam, toggleLock, isLoading, setIsLoading }}
      >
        <MainHeading />
        <Options />
        {team && <TeamSection team={team} />}
      </TeamContext.Provider>
    </Container>
  );
};

export default IndexPage;
