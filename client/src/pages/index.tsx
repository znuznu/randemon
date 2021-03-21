import React, { useState } from 'react';

import { Context as TeamContext } from '../core/contexts/teamContext';

import MainHeading from '../core/components/MainHeading/MainHeading';
import Options from '../core/components/Options/Options';
import { Team } from '../core/models/team';
import TeamSection from '../core/components/Team/TeamSection';
import GlobalStyle from '../styles/theme/GlobalStyle';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
`;

const IndexPage = () => {
  const [team, setTeam] = useState<Team | null>(null);

  return (
    <Container>
      <main>
        <GlobalStyle />
        <TeamContext.Provider value={{ team, setTeam }}>
          <MainHeading />
          <Options />
          {team && <TeamSection team={team} />}
        </TeamContext.Provider>
      </main>
    </Container>
  );
};

export default IndexPage;
