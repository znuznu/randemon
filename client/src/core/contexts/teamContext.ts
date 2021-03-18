import { createContext } from 'react';

import { Team } from '../models/team';

type TeamContext = {
  team: Team | null;
  setTeam: ((team: Team) => void) | null;
};

const Context = createContext<TeamContext>({
  team: null,
  setTeam: null
});

export { Context };
