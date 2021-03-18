import React, { useState } from 'react';

import { Context as TeamContext } from '../../core/contexts/teamContext';

import MainHeading from '../../core/components/MainHeading/MainHeading';
import Options from '../../core/components/Options/Options';
import { Team } from '../../core/models/team';
import TeamSection from '../../core/components/Team/TeamSection';

const IndexPage = () => {
  const [team, setTeam] = useState<Team | null>(null);

  return (
    <main>
      <TeamContext.Provider value={{ team, setTeam }}>
        <MainHeading />
        <Options />
        {team && <TeamSection team={team} />}
      </TeamContext.Provider>
    </main>
  );
};

export default IndexPage;
